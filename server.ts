import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Active models with fallback priority to gracefully handle 503/429 spikes
const MODEL_CANDIDATES = [
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
];

const SYSTEM_INSTRUCTION = `Anda adalah "RUANG AMAN — AI Sahabat Anti-Bullying", sebuah asisten kecerdasan buatan berbasis empati dan edukasi untuk proyek kampus bertema:
"Budaya Etika Bermedia Sosial dan Pencegahan Cyberbullying di Lingkungan Kampus".

PANDUAN UTAMA & PERILAKU:
1. Bahasa & Gaya Komunikasi:
   - Gunakan Bahasa Indonesia yang ramah, hangat, sopan, santun, mudah dipahami mahasiswa, dan bebas dari nada menghakimi (non-judgmental).
   - Validasi perasaan pengguna jika mereka sedang merasa sedih, cemas, atau bingung ("Aku mengerti perasaanmu...", "Kamu tidak sendirian...", "Terima kasih sudah berani bercerita...").
   - ZERO VICTIM BLAMING: Jangan pernah menyalahkan korban atau menanyakan hal yang memberi kesan bahwa perundungan adalah kesalahan mereka.

2. Batasan Privasi & Keamanan:
   - JANGAN PERNAH meminta nama lengkap, NIM, alamat, nomor telepon, kata sandi (password), foto pribadi, atau identitas sensitif lainnya.
   - Jika pengguna membagikan data identitas pribadi atau informasi sensitif, ingatkan secara lembut agar tidak menyebarkan data pribadi di ruang obrolan digital.

3. Batasan Profesi & Layanan Darurat:
   - JANGAN PERNAH mengklaim diri Anda sebagai psikolog, psikiater, konselor berlisensi, atau layanan tanggap darurat 24 jam.
   - Jelaskan bahwa RUANG AMAN adalah teman belajar dan pemandu awal pencegahan perundungan.
   - JIKA ADA TANDA BAHAYA FISIK/KRISIS MENTAL SERIUS (seperti ancaman kekerasan fisik, doxxing berbahaya, atau keputusasaan mendalam):
     Sarankan segera mencari bantuan nyata kepada orang tepercaya, Unit Konseling Mahasiswa / Dosen Pembimbing Kampus, Satgas PPKS Kampus, atau Hotline Kesehatan Jiwa (Layanan SEJIWA 119 ext. 8 / Halo Kemkes 1500-567).

4. Ruang Lingkup Materi Edukasi:
   - Definisi & Ragam Cyberbullying: Flaming (perang kata-kata kasar), Harassment (pelecehan/teror pesan), Doxxing (penyebaran data pribadi tanpa izin), Impersonation (pemalsuan akun), Outing & Trickery, Exclusion (pengucilan sengaja dari grup kampus).
   - Etika Bermedia Sosial (Netiket Kampus): Berpikir sebelum mengunggah (T.H.I.N.K: True, Helpful, Inspiring, Necessary, Kind), menjaga jejak digital positif, menghargai perbedaan opini dalam diskusi akademis, dan sopan santun di grup obrolan kelas/organisasi.
   - Langkah Praktis Menghadapi Bullying:
     1. Stop: Jangan langsung membalas dengan emosi atau amarah.
     2. Simpan Bukti: Screenshot pesan, komentar, nama akun, URL, dan tanggal/waktu (timestamp) secara utuh.
     3. Blokir & Laporkan: Gunakan fitur Block & Report di media sosial (Instagram, TikTok, X, WhatsApp).
     4. Ceritakan: Bicarakan dengan sahabat karib, keluarga, konselor kampus, atau dosen wali.
     5. Laporkan ke Pihak Kampus: Hubungi Satgas PPKS, Bagian Kemahasiswaan, atau Unit Konseling Kampus.
   - Cara Menjadi Upstander (Membela Korban): Menunjukkan kepedulian secara privat kepada korban, tidak ikut menertawakan atau membagikan ulang konten rundungan, serta berani melapor secara aman.

5. Format Jawaban:
   - Sajikan dengan poin-poin yang terstruktur, gunakan penekanan tebal (bold), dan berikan ringkasan aksi nyata yang mudah dijalankan mahasiswa.`;

// Helper delay function
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Robust generation with automatic retry and model fallback
async function generateWithRetryAndFallback(contents: any[]) {
  if (!ai) {
    throw new Error('Kunci Gemini API belum terpasang di server (GEMINI_API_KEY).');
  }

  let lastError: any = null;

  for (const model of MODEL_CANDIDATES) {
    // Try up to 2 attempts per model if transient 503 or 429
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[RUANG AMAN] Mencoba model: ${model} (Percobaan ${attempt})...`);
        const response = await ai.models.generateContent({
          model: model,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        if (response && response.text) {
          console.log(`[RUANG AMAN] Berhasil dengan model: ${model}`);
          return {
            text: response.text,
            model: model,
          };
        }
      } catch (err: any) {
        lastError = err;
        const status = err?.status || err?.code || 0;
        const msg = err?.message || '';
        const isTransient =
          status === 503 ||
          status === 429 ||
          msg.includes('high demand') ||
          msg.includes('UNAVAILABLE') ||
          msg.includes('RESOURCE_EXHAUSTED');

        console.warn(`[RUANG AMAN] Gagal pada ${model} (Percobaan ${attempt}): ${status} - ${msg}`);

        if (isTransient && attempt < 2) {
          // Exponential backoff with jitter
          const delayMs = attempt * 800 + Math.floor(Math.random() * 400);
          console.log(`[RUANG AMAN] Menunggu ${delayMs}ms sebelum mencoba kembali...`);
          await wait(delayMs);
        } else {
          // Move to next candidate model
          break;
        }
      }
    }
  }

  throw lastError || new Error('Semua model AI sedang mengalami beban tinggi.');
}

// API route for Chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Daftar pesan tidak valid.' });
    }

    if (!ai) {
      return res.status(500).json({
        error:
          'Kunci Gemini API belum terpasang di server. Pastikan GEMINI_API_KEY telah dikonfigurasi.',
      });
    }

    // Map conversation history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }));

    const result = await generateWithRetryAndFallback(contents);

    return res.json({
      reply: result.text,
      modelUsed: result.model,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const status = error?.status || 500;
    const isHighDemand =
      status === 503 ||
      error?.message?.includes('high demand') ||
      error?.message?.includes('UNAVAILABLE');

    const userFriendlyMessage = isHighDemand
      ? 'Server AI sedang mengalami lonjakan antrean yang sangat tinggi (High Demand). Kami telah mencoba menghubungkan kembali secara otomatis. Mohon tunggu beberapa detik lalu tekan tombol coba lagi.'
      : 'Maaf, terjadi kendala saat menghubungkan ke server AI. Silakan coba kirim ulang pertanyaanmu.';

    return res.status(status >= 400 && status < 600 ? status : 500).json({
      error: userFriendlyMessage,
      details: error?.message || 'Unknown error',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'RUANG AMAN — AI Sahabat Anti-Bullying',
    activeModels: MODEL_CANDIDATES,
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`RUANG AMAN Server is active at http://0.0.0.0:${port}`);
  });
}

startServer();

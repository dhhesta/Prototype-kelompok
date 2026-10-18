import React from 'react';
import { X, BookOpen, ShieldCheck, CheckCircle2, AlertTriangle, EyeOff, MessageSquareLock } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 via-violet-700 to-indigo-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Panduan Etika Medsos & Netiket Kampus</h3>
              <p className="text-xs text-purple-200">Budaya Komunikasi Sehat & Pencegahan Perundungan Siber</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          {/* Prinsip T.H.I.N.K */}
          <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200">
            <h4 className="font-bold text-purple-950 text-base flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-purple-700" />
              Prinsip T.H.I.N.K Sebelum Mengunggah / Mengirim Pesan
            </h4>
            <p className="text-xs text-purple-900 mb-3 leading-relaxed">
              Sebelum mengetik komentar di media sosial, grup WhatsApp angkatan, atau forum kampus, tanyakan 5 hal ini pada diri sendiri:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-2xs">
                <span className="font-extrabold text-purple-700 block text-lg">T</span>
                <span className="font-semibold text-slate-800">True?</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Apakah ini fakta, bukan hoaks atau gosip?</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-2xs">
                <span className="font-extrabold text-purple-700 block text-lg">H</span>
                <span className="font-semibold text-slate-800">Helpful?</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Apakah postingan ini membawa manfaat?</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-2xs">
                <span className="font-extrabold text-purple-700 block text-lg">I</span>
                <span className="font-semibold text-slate-800">Inspiring?</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Membangun semangat positif?</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-2xs">
                <span className="font-extrabold text-purple-700 block text-lg">N</span>
                <span className="font-semibold text-slate-800">Necessary?</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Apakah benar-benar perlu dikatakan?</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-2xs">
                <span className="font-extrabold text-purple-700 block text-lg">K</span>
                <span className="font-semibold text-slate-800">Kind?</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Apakah disampaikan dengan sopan & baik?</p>
              </div>
            </div>
          </div>

          {/* Ragam Cyberbullying */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Bentuk Cyberbullying yang Sering Terjadi di Kampus
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-bold text-purple-900">1. Flaming & Harassment</p>
                <p className="text-slate-600 mt-1">
                  Menyerang secara agresif, menghujat di kolom komentar, atau mengirim pesan teror bertubi-tubi di DM / chat pribadi.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-bold text-purple-900">2. Doxxing & Outing</p>
                <p className="text-slate-600 mt-1">
                  Menyebarkan data pribadi (NIM, nomor telepon, alamat, rahasia, atau tangkapan layar privat) tanpa izin ke ranah publik.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-bold text-purple-900">3. Exclusion (Pengucilan Digital)</p>
                <p className="text-slate-600 mt-1">
                  Sengaja mengeluarkan atau memblokir teman dari grup tugas kuliah/angkatan untuk memojokkan atau mempermalukan.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-bold text-purple-900">4. Impersonation (Akun Palsu / Menfess)</p>
                <p className="text-slate-600 mt-1">
                  Membuat akun tiruan atau memanfaatkan akun menfess (auto-base) anonim kampus untuk memfitnah dan merusak reputasi mahasiswa/dosen.
                </p>
              </div>
            </div>
          </div>

          {/* Menjadi Upstander */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Jadilah Upstander (Pembela), Bukan Bystander (Penonton Pasif)
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-900 list-disc list-inside">
              <li>Jangan berikan likes, shares, atau tertawa pada lelucon yang merendahkan seseorang di medsos.</li>
              <li>Kirimkan pesan privat kepada korban untuk memberikan dukungan moril dan menanyakan kondisinya.</li>
              <li>Bantu ingatkan pelaku di ruang terpisah secara beradab tanpa memperkeruh situasi.</li>
              <li>Bantu simpan bukti tangkapan layar jika korban membutuhkan saksi untuk pelaporan ke kampus.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

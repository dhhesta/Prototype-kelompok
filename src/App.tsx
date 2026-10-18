/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Heart,
  AlertTriangle,
  Lock,
  Sparkles,
  BookOpen,
  FileCheck2,
  RefreshCw,
  PhoneCall,
  Info,
} from 'lucide-react';
import { Message } from './types';
import { Navbar } from './components/Navbar';
import { ChatMessage } from './components/ChatMessage';
import { QuickPrompts } from './components/QuickPrompts';
import { ChatInput } from './components/ChatInput';
import { EmergencyModal } from './components/EmergencyModal';
import { GuideModal } from './components/GuideModal';
import { ReportingModal } from './components/ReportingModal';
import { ClearChatModal } from './components/ClearChatModal';

const INITIAL_WELCOME_MESSAGE: Message = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `Halo dan selamat datang di **RUANG AMAN**! 💜

Saya adalah **AI Sahabat Anti-Bullying**, ruang belajar dan berbagi yang ramah, aman, dan tanpa penghakiman untuk seluruh civitas akademika kampus.

Saya siap mendampingimu dalam:
* **Memahami Cyberbullying & Etika Digital:** Belajar netiket bermedia sosial di lingkungan mahasiswa.
* **Langkah Mengatasi Perundungan:** Cara menghadapi pelaku, menenangkan diri, dan memutus rantai gangguan.
* **Mendukung Korban (Upstander):** Bagaimana cara hadir dan menguatkan teman yang sedang terpuruk.
* **Panduan Pengamanan Bukti & Pelaporan:** Langkah aman menyimpan bukti digital dan berkonsultasi ke pihak kampus (Satgas PPKS / Dosen Wali).

> 🔒 **Jaminan Privasi:** Kamu tidak perlu menyebutkan nama lengkap, nomor telepon, NIM, atau informasi pribadi sensitif lainnya di sini.

Jika kamu sedang merasa bingung atau butuh panduan, kamu bisa memilih contoh pertanyaan di bawah atau ceritakan langsung apa yang sedang kamu rasakan.`,
  timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const [lastUserPrompt, setLastUserPrompt] = useState<string>('');

  const handleSendMessage = async (text: string, isAutoRetry = false) => {
    if (!text.trim() || isLoading) return;

    setErrorMessage(null);
    setLastUserPrompt(text);

    let currentMessages = messages;

    // Only append user message if not an internal retry
    if (!isAutoRetry) {
      // Remove any previous error message before resending
      const cleanedMessages = messages.filter((m) => !m.isError);
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      currentMessages = [...cleanedMessages, userMessage];
      setMessages(currentMessages);
    } else {
      // Filter out error message for retry
      currentMessages = messages.filter((m) => !m.isError);
      setMessages(currentMessages);
    }

    setIsLoading(true);

    try {
      // Helper function to call API
      const callChatApi = async () => {
        return await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: currentMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
      };

      let response = await callChatApi();

      // If transient 503 or 429, wait 1.2s and try one more time automatically
      if ((response.status === 503 || response.status === 429) && !isAutoRetry) {
        console.log('503/429 detected, retrying after 1.2s...');
        await new Promise((r) => setTimeout(r, 1200));
        response = await callChatApi();
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Gagal menghubungi server AI (${response.status})`);
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Terima kasih telah berbagi. Bagaimana perasaanmu sekarang?',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev.filter((m) => !m.isError), botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const friendlyError =
        err?.message || 'Maaf, terjadi gangguan koneksi ke server AI. Silakan coba kirim kembali pesanmu.';
      setErrorMessage(friendlyError);

      const errorBotMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Mohon maaf, server AI sedang mengalami antrean tinggi (High Demand).**\n\n${friendlyError}\n\n*Silakan tekan tombol di bawah untuk mencoba kembali tanpa mengetik ulang.*`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };

      setMessages((prev) => [...prev.filter((m) => !m.isError), errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setIsClearModalOpen(false);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-slate-800">
      {/* Top Navbar */}
      <Navbar
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenReporting={() => setIsReportingOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onConfirmClear={() => setIsClearModalOpen(true)}
        hasMessages={messages.length > 1}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 flex flex-col">
        {/* Safe Space Banner & Disclaimer */}
        <div className="mb-4 bg-gradient-to-r from-purple-100/90 via-violet-100/80 to-purple-50 p-4 rounded-3xl border border-purple-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-purple-950 flex items-center gap-1.5">
                Ruang Aman Mahasiswa
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-800">
                  Konfidensial & Bebas Menghakimi
                </span>
              </h2>
              <p className="text-xs text-purple-900/80 mt-0.5 leading-snug">
                Diskusikan pencegahan cyberbullying, etika digital, dan perlindungan diri di lingkungan kampus secara aman.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-white px-3 py-1.5 rounded-xl border border-purple-200 hover:border-purple-300 transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Panduan Kampus</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 bg-white/80 backdrop-blur-xs rounded-3xl border border-purple-100 p-4 sm:p-6 shadow-xs flex flex-col justify-between mb-4 min-h-[420px]">
          <div className="space-y-5 overflow-y-auto pr-1">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRetry={
                  message.isError && lastUserPrompt
                    ? () => handleSendMessage(lastUserPrompt, true)
                    : undefined
                }
              />
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-3 sm:gap-4 items-start animate-in fade-in duration-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-purple-800 via-violet-700 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-purple-200">
                  <Shield className="w-5 h-5 stroke-[2.2] animate-pulse" />
                </div>
                <div className="bg-purple-50/90 border border-purple-200/80 rounded-3xl rounded-tl-xs px-5 py-3.5 text-xs text-purple-900 flex items-center gap-3 shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="font-semibold text-purple-950">
                    RUANG AMAN sedang menyusun jawaban yang empatik...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips (Shown prominently when few messages, or accessible anytime) */}
          <div className="mt-6 pt-4 border-t border-purple-100">
            <QuickPrompts onSelectPrompt={handleSendMessage} disabled={isLoading} />
          </div>
        </div>

        {/* Input Bar */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onReset={() => setIsClearModalOpen(true)}
          hasMessages={messages.length > 1}
        />

        {/* Critical Disclaimer Notice */}
        <div className="mt-3 px-3 py-2 bg-purple-50/60 rounded-2xl border border-purple-100/80 flex items-center justify-between text-[11px] text-purple-800/90">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              <strong>Pemberitahuan Etis:</strong> RUANG AMAN adalah asisten edukasi AI dan bukan pengganti psikolog klinis profesional atau otoritas hukum formal.
            </span>
          </div>
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="text-purple-700 hover:text-purple-950 font-bold underline shrink-0 ml-2 cursor-pointer"
          >
            Kontak Krisis
          </button>
        </div>
      </main>

      {/* Mandatory Required Footer */}
      <footer className="mt-auto bg-white border-t border-purple-100 py-4 px-4 text-center">
        <p className="text-xs sm:text-sm font-semibold text-purple-900/90 tracking-wide">
          RUANG AMAN — Edukasi dan Pencegahan Cyberbullying di Lingkungan Kampus
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Proyek Kampus: Budaya Etika Bermedia Sosial dan Pencegahan Cyberbullying di Lingkungan Perguruan Tinggi
        </p>
      </footer>

      {/* Interactive Modals */}
      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <ReportingModal isOpen={isReportingOpen} onClose={() => setIsReportingOpen(false)} />
      <ClearChatModal
        isOpen={isClearModalOpen}
        onConfirm={handleClearChat}
        onCancel={() => setIsClearModalOpen(false)}
      />
    </div>
  );
}

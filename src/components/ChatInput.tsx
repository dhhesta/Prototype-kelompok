import React, { useState, useRef, useEffect } from 'react';
import { Send, Lock, Sparkles, RefreshCw } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onReset?: () => void;
  hasMessages?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  onReset,
  hasMessages,
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border-t border-purple-100 p-3 sm:p-4 rounded-t-3xl shadow-lg shadow-purple-900/5">
      <div className="max-w-4xl mx-auto space-y-2.5">
        {/* Privacy Note */}
        <div className="flex items-center justify-between text-[11px] text-purple-700/80 px-2">
          <div className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-purple-600" />
            <span>Privasi Terjaga: Jangan bagikan nama lengkap, NIM, no HP, atau kata sandi di sini.</span>
          </div>
          {hasMessages && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-slate-500 hover:text-rose-600 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Bersihkan Chat</span>
            </button>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-purple-50/60 p-2 rounded-2xl border border-purple-200/90 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading
                ? 'RUANG AMAN sedang menyusun respon yang empatik...'
                : 'Ceritakan apa yang kamu alami, atau tanyakan cara mengatasi cyberbullying...'
            }
            disabled={isLoading}
            className="w-full resize-none bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden max-h-36 disabled:opacity-50 leading-relaxed font-normal"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0 p-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white shadow-md shadow-purple-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer flex items-center justify-center"
            title="Kirim Pertanyaan"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5 stroke-[2.2]" />
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-400">
          Tekan <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200 font-mono">Enter</kbd> untuk mengirim, <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200 font-mono">Shift + Enter</kbd> untuk baris baru.
        </p>
      </div>
    </div>
  );
};

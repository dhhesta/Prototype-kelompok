import React, { useState } from 'react';
import { Shield, User, Copy, Check, AlertCircle } from 'lucide-react';
import { Message } from '../types';
import { renderFormattedContent } from '../utils/markdown';

interface ChatMessageProps {
  message: Message;
  onRetry?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-3 sm:gap-4 items-start ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      } group transition-all duration-200`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
          isUser
            ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white ring-2 ring-purple-200'
            : message.isError
            ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-200'
            : 'bg-gradient-to-br from-purple-800 via-violet-700 to-indigo-600 text-white shadow-purple-500/15 ring-2 ring-purple-200'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : message.isError ? (
          <AlertCircle className="w-5 h-5" />
        ) : (
          <Shield className="w-5 h-5 stroke-[2.2]" />
        )}
      </div>

      {/* Bubble Content */}
      <div className={`max-w-[88%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Name / Role label */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900/70">
            {isUser ? 'Kamu' : 'RUANG AMAN (AI Sahabat)'}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {message.timestamp}
          </span>
        </div>

        {/* Message Box */}
        <div
          className={`relative rounded-3xl p-4 sm:p-5 text-sm transition-all shadow-xs ${
            isUser
              ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-tr-xs shadow-purple-600/10'
              : message.isError
              ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-xs'
              : 'bg-white border border-purple-100/90 text-slate-800 rounded-tl-xs shadow-purple-500/5'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed text-white font-medium text-[14px]">
              {message.content}
            </p>
          ) : (
            <div>
              {renderFormattedContent(message.content)}

              {/* Retry button for Error Message */}
              {message.isError && onRetry && (
                <div className="mt-3 pt-2.5 border-t border-rose-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-rose-700/80 font-medium">
                    Koneksi ke AI dapat dicoba kembali
                  </span>
                  <button
                    onClick={onRetry}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>Coba Kirim Ulang</span>
                  </button>
                </div>
              )}

              {/* Copy button for Assistant */}
              {!message.isError && (
                <div className="mt-3 pt-2.5 border-t border-purple-50 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-purple-600/70 italic">
                    AI Sahabat Anti-Bullying Kampus
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] font-medium text-purple-700 hover:text-purple-900 bg-purple-50/70 hover:bg-purple-100 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                    title="Salin jawaban ini"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

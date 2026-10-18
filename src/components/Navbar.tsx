import React from 'react';
import { Shield, BookOpen, AlertCircle, Trash2, FileCheck2, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  onOpenGuide: () => void;
  onOpenReporting: () => void;
  onOpenEmergency: () => void;
  onConfirmClear: () => void;
  hasMessages: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuide,
  onOpenReporting,
  onOpenEmergency,
  onConfirmClear,
  hasMessages,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-700 via-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 ring-4 ring-purple-100">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 bg-clip-text text-transparent">
                RUANG AMAN
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                <HeartHandshake className="w-3 h-3 text-purple-600" />
                Sahabat Kampus
              </span>
            </div>
            <p className="text-xs text-purple-600/90 font-medium hidden sm:block">
              AI Sahabat Anti-Bullying & Budaya Etika Digital
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100/80 rounded-xl transition-all border border-purple-200/80 cursor-pointer"
            title="Panduan Etika Medsos & Netiket"
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="hidden md:inline">Etika Medsos</span>
          </button>

          <button
            onClick={onOpenReporting}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100/80 rounded-xl transition-all border border-purple-200/80 cursor-pointer"
            title="Alur Pelaporan Perundungan di Kampus"
          >
            <FileCheck2 className="w-4 h-4 text-purple-600" />
            <span className="hidden md:inline">Alur Lapor</span>
          </button>

          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100/90 rounded-xl transition-all border border-rose-200 cursor-pointer shadow-xs"
            title="Kontak Krisis & Bantuan Darurat"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>Bantuan Krisis</span>
          </button>

          {hasMessages && (
            <button
              onClick={onConfirmClear}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-slate-200 hover:border-rose-200 cursor-pointer ml-1"
              title="Hapus Percakapan"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

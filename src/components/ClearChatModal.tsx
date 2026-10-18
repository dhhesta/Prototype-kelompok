import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

interface ClearChatModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ClearChatModal: React.FC<ClearChatModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-purple-100 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Hapus Riwayat Percakapan?</h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Semua pesan dalam sesi ini akan dibersihkan. Anda dapat memulai obrolan baru kapan saja tanpa meninggalkan jejak.
          </p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-600/20 transition-all cursor-pointer"
          >
            Ya, Hapus Chat
          </button>
        </div>
      </div>
    </div>
  );
};

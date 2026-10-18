import React from 'react';
import { X, PhoneCall, ShieldAlert, Heart, Building2, ExternalLink } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Kontak Bantuan Krisis & Darurat</h3>
              <p className="text-xs text-rose-100">Bukan Pengganti Layanan Medis/Psikolog Berlisensi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
          <div className="p-4 bg-rose-50 border border-rose-200/80 rounded-2xl text-rose-900">
            <div className="flex items-start gap-2.5">
              <Heart className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-950">Kamu Sangat Berharga & Tidak Sendirian</p>
                <p className="text-xs mt-1 text-rose-800 leading-relaxed">
                  Jika kamu sedang menghadapi ancaman fisik, teror berat, atau merasa sangat putus asa, mohon segera hubungi orang tepercaya, layanan krisis resmi, atau pihak keamanan kampus.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-purple-600" />
              Saluran Darurat Bebas Pulsa / Hotline Nasional:
            </h4>

            {/* SEJIWA */}
            <div className="p-3.5 bg-purple-50/70 border border-purple-100 rounded-xl flex items-center justify-between hover:bg-purple-100/50 transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-purple-950">Hotline SEJIWA (Kemenkes RI)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-800">
                    24 Jam
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Layanan pertolongan pertama krisis psikologis & kesehatan jiwa
                </p>
              </div>
              <a
                href="tel:119"
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-all shrink-0 ml-3"
              >
                Call 119 (ext 8)
              </a>
            </div>

            {/* SAPA 129 */}
            <div className="p-3.5 bg-purple-50/70 border border-purple-100 rounded-xl flex items-center justify-between hover:bg-purple-100/50 transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-purple-950">SAPA 129 (KemenPPPA)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">
                    Kekerasan & Pelecehan
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Pengaduan kekerasan berbasis gender daring (KBGO) dan perundungan
                </p>
              </div>
              <a
                href="tel:129"
                className="px-3 py-1.5 bg-pink-700 hover:bg-pink-800 text-white rounded-lg text-xs font-bold transition-all shrink-0 ml-3"
              >
                Call 129
              </a>
            </div>

            {/* Halo Kemenkes */}
            <div className="p-3.5 bg-purple-50/70 border border-purple-100 rounded-xl flex items-center justify-between hover:bg-purple-100/50 transition-all">
              <div>
                <span className="font-bold text-purple-950">Halo Kemenkes</span>
                <p className="text-xs text-slate-600 mt-0.5">Pusat kontak informasi kesehatan & konseling</p>
              </div>
              <a
                href="tel:1500567"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all shrink-0 ml-3"
              >
                1500-567
              </a>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              Layanan Internal Kampus:
            </h4>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-800">1. Unit Bimbingan & Konseling Mahasiswa (PKM)</span>
                <span className="text-purple-700 font-medium">Konseling Gratis</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-800">2. Satgas PPKS Kampus</span>
                <span className="text-purple-700 font-medium">Perlindungan & Investigasi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">3. Dosen Wali / Pembimbing Akademik</span>
                <span className="text-purple-700 font-medium">Bantuan Pendampingan</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Catatan Penting:</strong> Layanan chat RUANG AMAN ini bersifat pendampingan edukatif awal dan tidak memiliki rekam medis atau otoritas hukum formal. Semua percakapan Anda tidak menyimpan identitas pribadi.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, FileCheck2, Camera, UserCheck, Shield, Award, HelpCircle } from 'lucide-react';

interface ReportingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportingModal: React.FC<ReportingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-800 via-purple-700 to-violet-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Alur Pelaporan Perundungan di Kampus</h3>
              <p className="text-xs text-purple-200">Langkah Resmi & Aman untuk Mahasiswa Korban atau Saksi</p>
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
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
          <p className="text-xs text-slate-600 leading-relaxed bg-purple-50 p-3.5 rounded-xl border border-purple-100">
            Setiap perguruan tinggi memiliki komitmen menciptakan lingkungan belajar yang aman dan bebas dari kekerasan seksual serta perundungan (bullying/cyberbullying). Kamu berhak mendapatkan perlindungan dan rasa aman.
          </p>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="flex gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl items-start">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-purple-600" />
                  Amankan Barang Bukti Digital (Screenshot Utuh)
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Lakukan tangkapan layar (screenshot) atau rekam layar secara menyeluruh. Pastikan memuat: nama akun/username pelaku, link profil, tautan unggahan, tanggal & jam (timestamp), serta isi pesan tanpa terpotong. Simpan di folder drive yang aman.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl items-start">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-purple-600" />
                  Putus Akses Gangguan & Lindungi Privasi
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Setelah bukti tersimpan, gunakan fitur <strong>Block</strong> dan <strong>Report</strong> akun pelaku pada platform bersangkutan. Kunci sementara akun sosial mediamu (private account) agar tidak diserang lebih lanjut.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl items-start">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  Konsultasikan ke Dosen Wali / Pusat Konseling
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Bicaralah dengan Dosen Pembimbing Akademik (DPA), konselor di Pusat Konseling Mahasiswa (PKM), atau Badan Eksekutif Mahasiswa (BEM) bidang advokasi. Mereka dapat mendampingimu secara rahasia tanpa menghakimi.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl items-start">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-600" />
                  Ajukan Laporan ke Satgas PPKS / Komisi Disiplin
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Sampaikan laporan tertulis didampingi bukti digital kepada Satuan Tugas Pencegahan & Penanganan Kekerasan (Satgas PPKS) atau Komite Disiplin / Kemahasiswaan Fakultas. Kampus wajib menjamin kerahasiaan identitasmu.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Hak Kerahasiaan:</strong> Peraturan Kemendikbudristek/Kemendiktisaintek mewajibkan kampus melindungi identitas pelapor dan korban dari tindakan balas dendam akademis maupun sosial.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

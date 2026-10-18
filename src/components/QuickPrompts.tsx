import React from 'react';
import { HelpCircle, Sparkles, ShieldAlert, HeartHandshake, BookOpen, Camera, Award } from 'lucide-react';
import { QuickPrompt } from '../types';

interface QuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}

export const SAMPLE_PROMPTS: QuickPrompt[] = [
  {
    id: '1',
    title: 'Apa itu cyberbullying?',
    query: 'Apa itu cyberbullying, apa saja bentuk-bentuknya di lingkungan mahasiswa, dan mengapa dampaknya berbahaya?',
    category: 'definisi',
  },
  {
    id: '2',
    title: 'Bagaimana cara menghadapi pelaku bullying?',
    query: 'Bagaimana cara menghadapi pelaku bullying atau cyberbullying dengan aman tanpa membalas dengan kebencian?',
    category: 'tindakan',
  },
  {
    id: '3',
    title: 'Bagaimana cara membantu korban?',
    query: 'Bagaimana cara membantu dan mendukung teman korban bullying agar dia tidak merasa sendirian?',
    category: 'bantuan',
  },
  {
    id: '4',
    title: 'Etika bermedia sosial di grup kampus',
    query: 'Apa saja etika bermedia sosial dan aturan netiket yang baik di grup WhatsApp kelas atau organisasi mahasiswa?',
    category: 'etika',
  },
  {
    id: '5',
    title: 'Cara menyimpan bukti screenshot cyberbullying',
    query: 'Bagaimana cara yang benar untuk mendokumentasikan bukti screenshot perundungan digital agar valid untuk pelaporan?',
    category: 'tindakan',
  },
  {
    id: '6',
    title: 'Cara lapor ke Satgas PPKS kampus',
    query: 'Bagaimana alur melapor ke Satgas PPKS atau pimpinan kampus jika terjadi perundungan, dan bagaimana perlindungan kerahasiaannya?',
    category: 'kampus',
  },
];

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onSelectPrompt, disabled }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'definisi':
        return <HelpCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />;
      case 'tindakan':
        return <ShieldAlert className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      case 'bantuan':
        return <HeartHandshake className="w-3.5 h-3.5 text-pink-600 shrink-0" />;
      case 'etika':
        return <BookOpen className="w-3.5 h-3.5 text-violet-600 shrink-0" />;
      case 'kampus':
        return <Award className="w-3.5 h-3.5 text-purple-700 shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />;
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900/80 px-1">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <span>Pertanyaan Contoh Populer:</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {SAMPLE_PROMPTS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPrompt(item.query)}
            disabled={disabled}
            className="flex items-center gap-2.5 p-3 text-left rounded-2xl bg-white/90 hover:bg-purple-50/90 border border-purple-100/80 hover:border-purple-300 text-xs text-slate-800 font-semibold shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="w-7 h-7 rounded-xl bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center shrink-0 transition-colors">
              {getIcon(item.category)}
            </div>
            <span className="line-clamp-2 leading-snug group-hover:text-purple-950">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

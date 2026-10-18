export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

export interface QuickPrompt {
  id: string;
  title: string;
  query: string;
  category: 'definisi' | 'tindakan' | 'bantuan' | 'etika' | 'kampus';
}

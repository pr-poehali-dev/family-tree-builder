export interface ArchiveCategory {
  id: string;
  name: string;
  count: number;
}

export interface ArchiveDocument {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  format: 'PDF' | 'JPEG' | 'DOC';
  accessLevel: 'Публичный' | 'Премиум';
}

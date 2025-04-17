export interface Person {
  id: string;
  name: string;
  birthDate?: string;
  birthPlace?: string;
  photo?: string;
  biography?: string;
  documents?: string[];
  parentIds?: string[];
  childrenIds?: string[];
  partnerId?: string;
  x?: number;
  y?: number;
  isSelected?: boolean;
}

export type RelationType = 'parent' | 'child' | 'partner';
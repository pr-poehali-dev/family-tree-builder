export interface Person {
  id: string;
  name: string;
  surname?: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  gender?: 'male' | 'female';
  photo?: string;
  biography?: string;
  documents?: string[];
  parentIds?: string[];
  childrenIds?: string[];
  partnerId?: string;
  x?: number;
  y?: number;
  isSelected?: boolean;
  isPlaceholder?: boolean;
  isMainPerson?: boolean;
}

export type RelationType = 'parent' | 'child' | 'partner';
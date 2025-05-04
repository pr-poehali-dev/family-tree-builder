
// Тип для представления человека в семейном древе
export interface Person {
  id: string;
  name?: string;
  birthYear?: number;
  deathYear?: number;
  gender?: 'male' | 'female' | 'other';
  photoUrl?: string;
  birthplace?: string;
  location?: string;
  occupation?: string;
  bio?: string;
  
  // Связи в семейном древе
  parentIds?: string[];
  childrenIds?: string[];
  spouseIds?: string[];
  
  // Положение на канве (для визуализации)
  x?: number;
  y?: number;
  
  // Поколение (для отображения уровней)
  generation?: number;
}

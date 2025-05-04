
// Типы отношений между людьми
export enum RelationType {
  PARENT = 'parent',     // Родитель
  CHILD = 'child',       // Ребёнок
  SPOUSE = 'spouse',     // Супруг(а)
  SIBLING = 'sibling'    // Брат/сестра
}

// Типы пола
export enum Gender {
  MALE = 'male',         // Мужской
  FEMALE = 'female',     // Женский
  OTHER = 'other'        // Другой
}

// Интерфейс для описания персоны в семейном древе
export interface Person {
  id: string;                        // Уникальный ID
  name?: string;                     // Имя
  maidenName?: string;               // Девичья фамилия
  birthDate?: string | Date;         // Дата рождения
  birthYear?: number;                // Год рождения (для упрощённого отображения)
  birthPlace?: string;               // Место рождения
  deathDate?: string | Date;         // Дата смерти
  deathPlace?: string;               // Место смерти
  gender?: Gender;                   // Пол
  occupation?: string;               // Профессия/занятие
  bio?: string;                      // Краткая биография
  photoUrl?: string;                 // URL фотографии
  documents?: string[];              // Список документов (ссылки)
  
  // Местоположение на канве (для визуализации)
  x?: number;
  y?: number;
  
  // Связи
  parentIds?: string[];              // ID родителей
  childrenIds?: string[];            // ID детей
  spouseIds?: string[];              // ID супругов
  siblingIds?: string[];             // ID братьев/сестёр
  
  // Дополнительные поля
  notes?: string;                    // Заметки
  isMainPerson?: boolean;            // Является ли главной персоной в древе
  generation?: number;               // Номер поколения (для расчёта позиционирования)
}

// Вспомогательный интерфейс для создания связей
export interface Relationship {
  fromId: string;       // ID первой персоны
  toId: string;         // ID второй персоны
  type: RelationType;   // Тип отношения
}

import { useState } from 'react';
import { Person, RelationType } from '@/types/person';
import { usePersonSelection } from '@/hooks/usePersonSelection';
import { usePersonModification } from '@/hooks/usePersonModification';
import { useRelativeAddition } from '@/hooks/useRelativeAddition';

// Новые данные для примера древа с основным пользователем, родителями и бабушками/дедушками
const initialPeople: Person[] = [
  // Главный человек
  { 
    id: '1', 
    name: 'Вы', 
    surname: 'Лебедева',
    gender: 'female',
    initials: 'Л',
    x: 400, 
    y: 600,
    isMainPerson: true
  },
  // Родители
  { 
    id: '2', 
    name: 'Майя', 
    surname: 'Лебедева',
    gender: 'female',
    initials: 'МЛ',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    x: 300, 
    y: 400,
    childrenIds: ['1']
  },
  { 
    id: '3', 
    name: 'Иван', 
    surname: 'Лебедев',
    gender: 'male',
    initials: 'ИЛ',
    x: 500, 
    y: 400,
    childrenIds: ['1']
  },
  // Бабушки и дедушки по материнской линии
  { 
    id: '4', 
    name: 'Мария', 
    surname: 'Лебедева',
    gender: 'female',
    initials: 'МЛ',
    photo: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    x: 300, 
    y: 200,
    childrenIds: ['2']
  },
  { 
    id: '5', 
    name: 'Павел', 
    surname: 'Лебедев',
    gender: 'male',
    initials: 'ПЛ',
    x: 500, 
    y: 200,
    childrenIds: ['2']
  },
  // Бабушки и дедушки по отцовской линии
  { 
    id: '6', 
    name: 'Александра', 
    surname: 'Каленова',
    gender: 'female',
    initials: 'АК',
    x: 700, 
    y: 200,
    childrenIds: ['3']
  },
  { 
    id: '7', 
    name: 'Петр', 
    surname: 'Каленов',
    gender: 'male',
    initials: 'ПК',
    x: 900, 
    y: 200,
    childrenIds: ['3']
  }
];

export const usePersonsData = () => {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  
  // Используем вспомогательные хуки для различных аспектов работы с данными
  const { selectedPerson, handleSelectPerson } = usePersonSelection(people, setPeople);
  const { handleSavePerson } = usePersonModification(people, setPeople, selectedPerson);
  const { handleAddRelative } = useRelativeAddition(people, setPeople, selectedPerson);

  return {
    people,
    selectedPerson,
    handleSelectPerson,
    handleSavePerson,
    handleAddRelative
  };
};

export default usePersonsData;
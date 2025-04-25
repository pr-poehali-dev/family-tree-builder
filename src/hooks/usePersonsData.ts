import { useState } from 'react';
import { Person, RelationType } from '@/types/person';
import { usePersonSelection } from '@/hooks/usePersonSelection';
import { usePersonModification } from '@/hooks/usePersonModification';
import { useRelativeAddition } from '@/hooks/useRelativeAddition';

// Данные для древа с кругами, как на картинке
const initialPeople: Person[] = [
  // Главный человек (Вы)
  { 
    id: '1', 
    name: 'Вы', 
    gender: 'female',
    x: 500, 
    y: 500,
    isMainPerson: true
  },
  // Родители
  { 
    id: '2', 
    name: 'Мама', 
    gender: 'female',
    x: 350, 
    y: 300,
    childrenIds: ['1']
  },
  { 
    id: '3', 
    name: 'Папа', 
    gender: 'male',
    x: 650, 
    y: 300,
    childrenIds: ['1']
  },
  // Бабушки и дедушки по материнской линии
  { 
    id: '4', 
    name: 'Бабушка', 
    gender: 'female',
    x: 250, 
    y: 150,
    childrenIds: ['2']
  },
  { 
    id: '5', 
    name: 'Дедушка', 
    gender: 'male',
    x: 450, 
    y: 150,
    childrenIds: ['2']
  },
  // Бабушки и дедушки по отцовской линии
  { 
    id: '6', 
    name: 'Бабушка', 
    gender: 'female',
    x: 550, 
    y: 150,
    childrenIds: ['3']
  },
  { 
    id: '7', 
    name: 'Дедушка', 
    gender: 'male',
    x: 750, 
    y: 150,
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
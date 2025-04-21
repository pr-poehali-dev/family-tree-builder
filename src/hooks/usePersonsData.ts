import { useState } from 'react';
import { Person, RelationType } from '@/types/person';
import { calculateNodePosition } from '@/utils/personUtils';
import { usePersonSelection } from '@/hooks/usePersonSelection';
import { usePersonModification } from '@/hooks/usePersonModification';
import { useRelativeAddition } from '@/hooks/useRelativeAddition';

// Начальные данные для примера древа с основным пользователем и пустыми узлами
const initialPeople: Person[] = [
  { 
    id: '1', 
    name: 'Мать', 
    surname: '',
    gender: 'female',
    x: 250, 
    y: 100,
    isPlaceholder: true
  },
  { 
    id: '2', 
    name: 'Отец', 
    surname: '',
    gender: 'male',
    x: 450, 
    y: 100,
    isPlaceholder: true
  },
  { 
    id: '3', 
    name: 'Иванов', 
    surname: 'Иван',
    gender: 'male',
    birthDate: '15.06.1985', 
    birthPlace: 'Москва',
    parentIds: ['1', '2'],
    x: 350, 
    y: 300,
    isMainPerson: true
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
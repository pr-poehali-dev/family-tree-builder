import { useState } from 'react';
import { Person } from '@/types/person';

export const usePersonSelection = (
  people: Person[], 
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Выбор человека в древе
  const handleSelectPerson = (person: Person) => {
    // Сбрасываем выделение для всех
    const updatedPeople = people.map(p => ({ ...p, isSelected: false }));
    
    // Выделяем выбранного человека
    const selectedIndex = updatedPeople.findIndex(p => p.id === person.id);
    if (selectedIndex >= 0) {
      updatedPeople[selectedIndex].isSelected = true;
      setSelectedPerson(updatedPeople[selectedIndex]);
      setPeople(updatedPeople);
    }
  };

  return {
    selectedPerson,
    handleSelectPerson
  };
};

export default usePersonSelection;
import { Person } from '@/types/person';

export const usePersonModification = (
  people: Person[], 
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  selectedPerson: Person | null
) => {
  
  // Сохранение изменений в данных человека
  const handleSavePerson = (data: Partial<Person>) => {
    if (!selectedPerson) return;
    
    const updatedPeople = people.map(person => 
      person.id === selectedPerson.id ? { ...person, ...data, isPlaceholder: false } : person
    );
    
    setPeople(updatedPeople);
  };

  return {
    handleSavePerson
  };
};

export default usePersonModification;
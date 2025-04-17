import { useState } from 'react';
import { Person, RelationType } from '@/types/person';

// Начальные данные для примера древа
const initialPeople: Person[] = [
  { 
    id: '1', 
    name: 'Иван Петров', 
    birthDate: '1980-05-15', 
    birthPlace: 'Москва',
    x: 500, 
    y: 300 
  },
  { 
    id: '2', 
    name: 'Мария Петрова', 
    birthDate: '1982-08-21', 
    birthPlace: 'Санкт-Петербург',
    x: 700, 
    y: 300 
  },
  { 
    id: '3', 
    name: 'Алексей Петров', 
    birthDate: '2010-03-10', 
    x: 600, 
    y: 450 
  },
];

export const usePersonsData = () => {
  const [people, setPeople] = useState<Person[]>(initialPeople);
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
  
  // Сохранение изменений в данных человека
  const handleSavePerson = (data: Partial<Person>) => {
    if (!selectedPerson) return;
    
    const updatedPeople = people.map(person => 
      person.id === selectedPerson.id ? { ...person, ...data } : person
    );
    
    setPeople(updatedPeople);
    setSelectedPerson(prev => prev ? { ...prev, ...data } : null);
  };
  
  // Вычисление позиции для нового узла в зависимости от типа связи
  const calculateNodePosition = (
    sourcePerson: Person, 
    relationType: RelationType
  ): { x: number, y: number } => {
    switch (relationType) {
      case 'parent':
        return { 
          x: sourcePerson.x || 0, 
          y: (sourcePerson.y || 0) - 150 
        };
      case 'child':
        return { 
          x: sourcePerson.x || 0, 
          y: (sourcePerson.y || 0) + 150 
        };
      case 'partner':
        return { 
          x: (sourcePerson.x || 0) + 200, 
          y: sourcePerson.y || 0 
        };
    }
  };
  
  // Добавление нового родственника
  const handleAddRelative = (personId: string, relationType: RelationType) => {
    const sourcePerson = people.find(p => p.id === personId);
    if (!sourcePerson) return;
    
    const newPersonId = `new-${Date.now()}`;
    const position = calculateNodePosition(sourcePerson, relationType);
    
    let newPerson: Person = {
      id: newPersonId,
      name: 'Новый человек',
      ...position
    };
    
    // Устанавливаем соответствующие связи
    if (relationType === 'parent') {
      newPerson.childrenIds = [personId];
    } else if (relationType === 'child') {
      newPerson.parentIds = [personId];
    }
    
    // Обновляем связи существующего человека
    const updatedPeople = people.map(person => {
      if (person.id === personId) {
        if (relationType === 'parent') {
          return { 
            ...person, 
            parentIds: [...(person.parentIds || []), newPersonId] 
          };
        } else if (relationType === 'child') {
          return { 
            ...person, 
            childrenIds: [...(person.childrenIds || []), newPersonId] 
          };
        } else if (relationType === 'partner') {
          return { ...person, partnerId: newPersonId };
        }
      }
      return person;
    });
    
    setPeople([...updatedPeople, newPerson]);
    setSelectedPerson(newPerson);
  };

  return {
    people,
    selectedPerson,
    handleSelectPerson,
    handleSavePerson,
    handleAddRelative
  };
};

export default usePersonsData;
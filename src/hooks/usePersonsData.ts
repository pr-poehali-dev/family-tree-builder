import { useState } from 'react';
import { Person, RelationType } from '@/types/person';

// Начальные данные для примера древа с тремя карточками
const initialPeople: Person[] = [
  { 
    id: '1', 
    name: 'Иван', 
    surname: 'Иванов',
    gender: 'male',
    birthDate: '15.06.1985', 
    birthPlace: 'Москва',
    x: 200, 
    y: 150,
    partnerId: '2'
  },
  { 
    id: '2', 
    name: 'Мария', 
    surname: 'Иванова',
    gender: 'female',
    birthDate: '23.10.1987', 
    birthPlace: 'Санкт-Петербург',
    x: 450, 
    y: 150,
    partnerId: '1'
  },
  { 
    id: '3', 
    name: 'Кирилл', 
    surname: 'Иванов',
    gender: 'male',
    birthDate: '08.03.2010', 
    birthPlace: 'Москва',
    parentIds: ['1', '2'],
    x: 325, 
    y: 450 
  }
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
    const NODE_WIDTH = 180;
    const NODE_HEIGHT = 160;
    const VERTICAL_GAP = 150;
    
    switch (relationType) {
      case 'parent':
        return { 
          x: sourcePerson.x || 0, 
          y: (sourcePerson.y || 0) - NODE_HEIGHT - VERTICAL_GAP
        };
      case 'child':
        // Если есть партнер, ребенок должен быть посередине между родителями
        if (sourcePerson.partnerId) {
          const partner = people.find(p => p.id === sourcePerson.partnerId);
          if (partner && partner.x !== undefined) {
            const isSourceLeft = (sourcePerson.x || 0) < (partner.x || 0);
            
            // Проверяем, сколько уже есть детей
            const existingChildren = people.filter(p => 
              p.parentIds?.includes(sourcePerson.id) || 
              (partner && p.parentIds?.includes(partner.id))
            );
            
            const childIndex = existingChildren.length;
            const middleX = ((sourcePerson.x || 0) + (partner.x || 0)) / 2;
            
            // Распределяем детей горизонтально
            let offsetX = 0;
            if (childIndex === 0) {
              offsetX = 0; // По центру для первого ребенка
            } else if (childIndex === 1) {
              offsetX = -NODE_WIDTH * 1.2; // Левее от центра для второго
            } else if (childIndex >= 2) {
              offsetX = NODE_WIDTH * 1.2; // Правее от центра для третьего
            }
            
            return { 
              x: middleX - NODE_WIDTH/2 + offsetX, 
              y: (sourcePerson.y || 0) + NODE_HEIGHT + VERTICAL_GAP * 1.5
            };
          }
        }
        
        return { 
          x: sourcePerson.x || 0, 
          y: (sourcePerson.y || 0) + NODE_HEIGHT + VERTICAL_GAP
        };
      case 'partner':
        return { 
          x: (sourcePerson.x || 0) + NODE_WIDTH * 1.4, 
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
    
    // Определяем пол по умолчанию в зависимости от типа связи
    const defaultGender = relationType === 'partner' 
      ? (sourcePerson.gender === 'male' ? 'female' : 'male') 
      : 'male';
    
    let newPerson: Person = {
      id: newPersonId,
      name: 'Имя',
      surname: sourcePerson.surname || 'Фамилия',
      gender: defaultGender,
      ...position
    };
    
    // Устанавливаем соответствующие связи
    if (relationType === 'parent') {
      newPerson.childrenIds = [personId];
    } else if (relationType === 'child') {
      newPerson.parentIds = [personId];
      
      // Если у источника есть партнер, добавляем и его в качестве родителя
      if (sourcePerson.partnerId) {
        newPerson.parentIds.push(sourcePerson.partnerId);
      }
    } else if (relationType === 'partner') {
      newPerson.partnerId = personId;
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
      
      // Если добавляем партнера человеку с детьми, добавляем нового партнера также в качестве родителя этим детям
      if (relationType === 'partner' && person.parentIds?.includes(personId)) {
        return {
          ...person,
          parentIds: [...person.parentIds, newPersonId]
        };
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
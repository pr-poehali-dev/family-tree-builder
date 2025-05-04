
import { useState, useEffect } from 'react';
import { Person } from '@/types/person';

// Демо-данные для древа
const demoPersons: Person[] = [
  {
    id: 'person_1',
    name: 'Иван Петров',
    birthYear: 1950,
    gender: 'male',
    generation: 0,
    childrenIds: ['person_3', 'person_4'],
    spouseIds: ['person_2'],
    x: 300,
    y: 100,
  },
  {
    id: 'person_2',
    name: 'Мария Петрова',
    birthYear: 1953,
    gender: 'female',
    generation: 0,
    childrenIds: ['person_3', 'person_4'],
    spouseIds: ['person_1'],
    x: 500,
    y: 100,
  },
  {
    id: 'person_3',
    name: 'Александр Петров',
    birthYear: 1975,
    gender: 'male',
    generation: 1,
    childrenIds: ['person_5'],
    spouseIds: [],
    x: 200,
    y: 250,
  },
  {
    id: 'person_4',
    name: 'Екатерина Смирнова',
    birthYear: 1978,
    gender: 'female',
    generation: 1,
    childrenIds: ['person_6', 'person_7'],
    spouseIds: [],
    x: 400,
    y: 250,
  },
  {
    id: 'person_5',
    name: 'Дмитрий Петров',
    birthYear: 2000,
    gender: 'male',
    generation: 2,
    childrenIds: [],
    spouseIds: [],
    x: 200,
    y: 400,
  },
  {
    id: 'person_6',
    name: 'Анна Смирнова',
    birthYear: 2005,
    gender: 'female',
    generation: 2,
    childrenIds: [],
    spouseIds: [],
    x: 350,
    y: 400,
  },
  {
    id: 'person_7',
    name: 'Михаил Смирнов',
    birthYear: 2007,
    gender: 'male',
    generation: 2,
    childrenIds: [],
    spouseIds: [],
    x: 450,
    y: 400,
  },
];

// Хук для управления данными о персонах в древе
export const usePersonsData = () => {
  // Загружаем данные из localStorage при инициализации
  const loadInitialData = (): Person[] => {
    const savedData = localStorage.getItem('familyTreePersons');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Ошибка при загрузке данных из localStorage:', e);
      }
    }
    return demoPersons; // Возвращаем демо-данные, если нет сохраненных
  };

  const [persons, setPersons] = useState<Person[]>(loadInitialData);

  // Сохраняем данные в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('familyTreePersons', JSON.stringify(persons));
  }, [persons]);

  // Добавление новой персоны
  const addPerson = (person: Person) => {
    setPersons(prevPersons => [...prevPersons, person]);
  };

  // Обновление существующей персоны
  const updatePerson = (updatedPerson: Person) => {
    setPersons(prevPersons =>
      prevPersons.map(person =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
  };

  // Удаление персоны
  const removePerson = (personId: string) => {
    // Сначала нужно удалить все ссылки на эту персону из других персон
    setPersons(prevPersons => {
      const updatedPersons = prevPersons.map(person => {
        // Удаляем удаляемую персону из списков детей и супругов
        const updatedChildrenIds = person.childrenIds?.filter(id => id !== personId) || [];
        const updatedSpouseIds = person.spouseIds?.filter(id => id !== personId) || [];
        
        return {
          ...person,
          childrenIds: updatedChildrenIds,
          spouseIds: updatedSpouseIds,
        };
      });
      
      // Затем удаляем саму персону
      return updatedPersons.filter(person => person.id !== personId);
    });
  };

  return {
    persons,
    addPerson,
    updatePerson,
    removePerson,
  };
};

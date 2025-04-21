import { Person, RelationType } from '@/types/person';
import { calculateNodePosition } from '@/utils/personUtils';

export const useRelativeAddition = (
  people: Person[], 
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  selectedPerson: Person | null
) => {
  
  // Добавление нового родственника
  const handleAddRelative = (personId: string, relationType: RelationType) => {
    const sourcePerson = people.find(p => p.id === personId);
    if (!sourcePerson) return;
    
    const newPersonId = `new-${Date.now()}`;
    const position = calculateNodePosition(sourcePerson, relationType, people);
    
    // Определяем пол по умолчанию в зависимости от типа связи
    const defaultGender = relationType === 'partner' 
      ? (sourcePerson.gender === 'male' ? 'female' : 'male') 
      : 'male';
    
    let newPerson: Person = {
      id: newPersonId,
      name: relationType === 'partner' ? 'Партнер' : 
            relationType === 'parent' ? (defaultGender === 'male' ? 'Отец' : 'Мать') : 
            'Ребенок',
      surname: '',
      gender: defaultGender,
      isPlaceholder: true,
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
  };

  return {
    handleAddRelative
  };
};

export default useRelativeAddition;
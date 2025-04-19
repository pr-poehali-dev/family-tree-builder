import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pencil, Plus } from 'lucide-react';
import { Person, RelationType } from '@/types/person';

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
  onAddRelative: (personId: string, relationType: RelationType) => void;
}

const TreeNode = ({ person, onSelect, onAddRelative }: TreeNodeProps) => {
  // Определяем цвет карточки в зависимости от пола
  const cardColor = person.gender === 'female' 
    ? 'bg-gradient-to-r from-pink-100 to-pink-50 border-pink-300' 
    : person.gender === 'male' 
      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300' 
      : 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300';
  
  // Определяем цвет тега пола
  const genderTagColor = person.gender === 'female' 
    ? 'bg-pink-400 text-white' 
    : 'bg-blue-400 text-white';
  
  // Текст для тега
  const genderText = person.gender === 'female' ? 'жен' : 'муж';
  
  return (
    <div className="tree-node w-[180px]">
      <div 
        className={`relative rounded-xl ${cardColor} border-2 p-3 shadow-sm transition-shadow hover:shadow-md`}
        onClick={() => onSelect(person)}
      >
        {/* Тег пола */}
        <div className={`absolute top-3 left-3 rounded-md ${genderTagColor} px-2 py-0.5 text-xs font-medium`}>
          {genderText}
        </div>
        
        {/* Кнопка редактирования */}
        <button 
          className="absolute top-3 right-3 rounded-md bg-gray-100 p-1 text-gray-500 hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(person);
          }}
        >
          <Pencil size={14} />
        </button>
        
        {/* Основное содержимое карточки */}
        <div className="mt-6 flex flex-col items-center">
          <Avatar className="h-16 w-16 mb-3 bg-gray-200">
            <AvatarImage src={person.photo || '/placeholder.svg'} alt={person.name} />
            <AvatarFallback className="bg-gray-200 text-gray-500">
              {person.name.split(' ').map(part => part[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <p className="font-medium text-gray-800">{person.surname}</p>
            <p className="text-sm text-gray-700">{person.name}</p>
            {person.middleName && (
              <p className="text-sm text-gray-700">{person.middleName}</p>
            )}
            
            <p className="mt-2 text-sm text-gray-600">
              {person.birthDate 
                ? (person.birthDate.includes('.') 
                  ? person.birthDate 
                  : person.birthDate.includes('-') 
                    ? person.birthDate.split('-')[0] 
                    : person.birthDate)
                : ''}
            </p>
          </div>
        </div>
        
        {/* Кнопка добавления */}
        <button
          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full ${
            person.gender === 'female' ? 'bg-pink-400' : 'bg-blue-400'
          } text-white shadow-md hover:opacity-90`}
          onClick={(e) => {
            e.stopPropagation();
            onAddRelative(person.id, 'child');
          }}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default TreeNode;
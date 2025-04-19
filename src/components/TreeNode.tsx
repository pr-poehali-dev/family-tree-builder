import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pencil, Plus } from 'lucide-react';
import { Person, RelationType } from '@/types/person';

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
  onAddRelative: (personId: string, relationType: RelationType) => void;
}

const TreeNode = ({ person, onSelect, onAddRelative }: TreeNodeProps) => {
  // Проверяем тип узла
  const isPlaceholder = person.isPlaceholder;
  const isMainPerson = person.isMainPerson;

  // Определяем стиль узла в зависимости от его типа
  let nodeStyles = '';
  
  if (isPlaceholder) {
    // Стиль для пустых узлов (плейсхолдеры)
    nodeStyles = 'bg-gray-100 rounded-full w-[120px] h-[120px] flex flex-col items-center justify-center p-2 shadow-sm';
  } else if (isMainPerson) {
    // Стиль для главного узла (синий с фотографией)
    nodeStyles = 'bg-blue-100 border-4 border-blue-400 rounded-full w-[140px] h-[140px] flex flex-col items-center justify-center p-2 shadow-md';
  } else {
    // Стиль для обычных заполненных узлов
    const cardColor = person.gender === 'female' 
      ? 'bg-gradient-to-r from-pink-100 to-pink-50 border-pink-300' 
      : person.gender === 'male' 
        ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300' 
        : 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300';
    
    nodeStyles = `rounded-xl ${cardColor} border-2 p-3 shadow-sm transition-shadow hover:shadow-md`;
  }
  
  return (
    <div className="tree-node">
      <div 
        className={`relative ${nodeStyles}`}
        onClick={() => onSelect(person)}
      >
        {isPlaceholder ? (
          <>
            {/* Содержимое для пустого узла */}
            <Plus size={24} className="text-gray-400 mb-1" />
            <p className="text-sm text-gray-500 text-center">{person.name}</p>
          </>
        ) : isMainPerson ? (
          <>
            {/* Содержимое для главного узла */}
            <div className="relative w-full h-full flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-2 border-2 border-white bg-blue-200">
                <AvatarImage src={person.photo || '/placeholder.svg'} alt={person.name} />
                <AvatarFallback className="bg-blue-200 text-blue-700">
                  {person.name[0]}{person.surname?.[0] || ''}
                </AvatarFallback>
              </Avatar>
              
              <div className="tag absolute -bottom-3 bg-blue-500 px-3 py-1 rounded-full text-white text-xs flex items-center">
                <span className="mr-1">👑 Это я</span>
              </div>
            </div>
            
            <div className="absolute -bottom-8 text-center w-full">
              <p className="font-medium">{person.surname} {person.name}</p>
            </div>
          </>
        ) : (
          <>
            {/* Содержимое для обычного узла */}
            {person.gender && (
              <div className={`absolute top-3 left-3 rounded-md ${person.gender === 'female' ? 'bg-pink-400' : 'bg-blue-400'} px-2 py-0.5 text-xs font-medium text-white`}>
                {person.gender === 'female' ? 'жен' : 'муж'}
              </div>
            )}
            
            <button 
              className="absolute top-3 right-3 rounded-md bg-gray-100 p-1 text-gray-500 hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(person);
              }}
            >
              <Pencil size={14} />
            </button>
            
            <div className="mt-6 flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-3 bg-gray-200">
                <AvatarImage src={person.photo || '/placeholder.svg'} alt={person.name} />
                <AvatarFallback className="bg-gray-200 text-gray-500">
                  {person.name[0]}{person.surname?.[0] || ''}
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
          </>
        )}
        
        {/* Кнопка добавления показывается только для заполненных узлов */}
        {!isPlaceholder && (
          <button
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full ${
              isMainPerson ? 'bg-blue-500' : person.gender === 'female' ? 'bg-pink-400' : 'bg-blue-400'
            } text-white shadow-md hover:opacity-90`}
            onClick={(e) => {
              e.stopPropagation();
              onAddRelative(person.id, 'child');
            }}
          >
            <Plus size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TreeNode;
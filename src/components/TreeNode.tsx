import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
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
    nodeStyles = 'bg-white rounded-lg w-24 h-24 flex flex-col items-center justify-center shadow-sm border-2 border-dashed border-gray-200';
  } else if (isMainPerson) {
    // Стиль для главного узла (синий с фотографией)
    nodeStyles = 'bg-blue-50 border-2 border-blue-300 rounded-lg w-[120px] h-[120px] flex flex-col items-center justify-center shadow-sm';
  } else {
    // Стиль для обычных заполненных узлов
    const cardColor = person.gender === 'female' 
      ? 'bg-pink-50 border-pink-200' 
      : person.gender === 'male' 
        ? 'bg-blue-50 border-blue-200' 
        : 'bg-amber-50 border-amber-200';
    
    nodeStyles = `rounded-lg ${cardColor} border-2 p-3 shadow-sm`;
  }
  
  return (
    <div className="tree-node">
      {isMainPerson ? (
        <div className="relative flex flex-col items-center">
          {/* Верхний блок с аватаром */}
          <div className="w-16 h-16 mb-0 bg-blue-50 border-2 border-blue-300 rounded-xl flex items-center justify-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src={person.photo || '/placeholder.svg'} alt="Вы" />
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {person.name[0]}{person.surname?.[0] || ''}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Нижний блок с текстом */}
          <div 
            className="bg-blue-50 border-2 border-blue-300 rounded-lg w-[120px] h-[80px] flex items-center justify-center mt-0"
            onClick={() => onSelect(person)}
          >
            <p className="text-blue-700 text-center">Вы</p>
          </div>
        </div>
      ) : (
        <div 
          className={`relative ${nodeStyles}`}
          onClick={() => onSelect(person)}
        >
          {isPlaceholder ? (
            <>
              {/* Содержимое для пустого узла */}
              <div className={`flex items-center justify-center rounded-full h-6 w-6 mb-2 ${person.gender === 'female' ? 'bg-pink-200 text-pink-500' : 'bg-blue-200 text-blue-500'}`}>
                <Plus size={16} />
              </div>
              <p className="text-sm text-center font-medium">{person.name}</p>
            </>
          ) : (
            <>
              {/* Содержимое для обычного узла */}
              <div className="flex flex-col items-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={person.photo || '/placeholder.svg'} alt={person.name} />
                  <AvatarFallback className="bg-gray-100">
                    {person.name[0]}{person.surname?.[0] || ''}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <p className="font-medium">{person.name}</p>
                  {person.birthDate && (
                    <p className="text-sm text-gray-500">{person.birthDate}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
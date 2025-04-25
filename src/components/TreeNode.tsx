import { Person } from '@/types/person';

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
}

const TreeNode = ({ person, onSelect }: TreeNodeProps) => {
  // Определяем цвет узла в зависимости от пола
  const nodeColor = person.gender === 'female' 
    ? 'bg-pink-400' 
    : 'bg-blue-400';
  
  // Определяем размер и стиль карточки
  const nodeStyles = 'rounded-lg shadow-md flex flex-col items-center';
  
  // Получаем инициалы из имени и фамилии, если они не заданы явно
  const initials = person.initials || 
    `${person.name?.[0] || ''}${person.surname?.[0] || ''}`;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${nodeStyles} cursor-pointer transition-shadow hover:shadow-lg`}
        onClick={() => onSelect(person)}
      >
        {/* Верхний блок с инициалами или фото */}
        <div className="relative">
          {person.photo ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <img 
                src={person.photo} 
                alt={person.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 w-5 h-5 bg-black rotate-45 origin-bottom-left" />
            </div>
          ) : (
            <div className={`${nodeColor} relative w-16 h-16 rounded-lg flex items-center justify-center text-white font-semibold`}>
              {initials}
              <div className="absolute top-0 right-0 w-5 h-5 bg-black rotate-45 origin-bottom-left" />
            </div>
          )}
        </div>
        
        {/* Нижний блок с именем */}
        <div className="text-center mt-2 text-sm font-medium text-gray-800 max-w-[120px]">
          <p className="truncate">{person.name} {person.surname}</p>
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
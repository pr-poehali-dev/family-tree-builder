
import { Person } from '@/types/person';
import { useState } from 'react';

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
}

const TreeNode = ({ person, onSelect }: TreeNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Защитная проверка на наличие данных
  if (!person) return null;
  
  // Получаем инициалы, если нет имени
  const getInitials = () => {
    if (!person.name) return '?';
    const nameParts = person.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return person.name.substring(0, 2);
  };
  
  return (
    <div 
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        onClick={() => onSelect(person)}
        role="button"
        tabIndex={0}
        aria-label={`Выбрать ${person.name || 'персону'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onSelect(person);
          }
        }}
      >
        {/* Круглая карточка с именем */}
        <div 
          className={`w-24 h-24 rounded-full bg-white border-2 ${isHovered ? 'border-primary shadow-lg' : 'border-[#D9A799] shadow-md'} 
          flex items-center justify-center overflow-hidden`}
        >
          {person.photoUrl ? (
            <img 
              src={person.photoUrl} 
              alt={person.name || 'Фото персоны'} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="text-center p-1">
              <p className="text-[#2F5542] font-medium break-words">
                {person.name || getInitials()}
              </p>
              {person.birthYear && (
                <p className="text-xs text-muted-foreground mt-1">
                  {person.birthYear}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;

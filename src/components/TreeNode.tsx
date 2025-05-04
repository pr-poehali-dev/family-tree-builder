
import { Person } from '@/types/person';
import { useState } from 'react';

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
  isSelected?: boolean;
}

const TreeNode = ({ person, onSelect, isSelected }: TreeNodeProps) => {
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
          className={`w-24 h-24 rounded-full bg-white border-2 
            ${isSelected 
              ? 'border-primary shadow-lg ring-2 ring-primary/30' 
              : isHovered 
                ? 'border-primary/70 shadow-lg' 
                : 'border-[#D9A799] shadow-md'} 
            flex items-center justify-center overflow-hidden z-10`}
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
        
        {/* Имя под кружком для длинных имен */}
        {person.name && person.name.length > 15 && (
          <div className="mt-2 text-center max-w-[120px]">
            <p className="text-sm font-medium truncate" title={person.name}>
              {person.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeNode;

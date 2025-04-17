import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  birthDate?: string;
  birthPlace?: string;
  photo?: string;
  isSelected?: boolean;
}

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
  onAddRelative: (personId: string, relationType: 'parent' | 'child' | 'partner') => void;
}

const TreeNode = ({ person, onSelect, onAddRelative }: TreeNodeProps) => {
  const [showActions, setShowActions] = useState(false);
  
  const handleClick = () => {
    onSelect(person);
    setShowActions(false);
  };
  
  return (
    <div 
      className={`tree-node group relative ${person.isSelected ? 'border-primary ring-2 ring-primary/50' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex flex-col items-center" onClick={handleClick}>
        <Avatar className="w-16 h-16 mb-2">
          <AvatarImage src={person.photo || '/placeholder.svg'} alt={person.name} />
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {person.name.split(' ').map(part => part[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-medium text-sm">{person.name}</p>
          {person.birthDate && (
            <p className="text-xs text-muted-foreground">{person.birthDate}</p>
          )}
        </div>
      </div>
      
      {/* Кнопки действий */}
      {showActions && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-1 bg-background p-1 rounded-md shadow-md border border-border z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8" 
            onClick={(e) => {
              e.stopPropagation();
              onAddRelative(person.id, 'parent');
            }}
            title="Добавить родителя"
          >
            <Plus size={16} className="rotate-180" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8" 
            onClick={(e) => {
              e.stopPropagation();
              onAddRelative(person.id, 'partner');
            }}
            title="Добавить партнера"
          >
            <Plus size={16} className="rotate-90" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8" 
            onClick={(e) => {
              e.stopPropagation();
              onAddRelative(person.id, 'child');
            }}
            title="Добавить ребенка"
          >
            <Plus size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
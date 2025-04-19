import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, User, Users } from 'lucide-react';
import { Person, RelationType } from '@/types/person';

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
  onAddRelative: (personId: string, relationType: RelationType) => void;
}

const TreeNode = ({ person, onSelect, onAddRelative }: TreeNodeProps) => {
  const [showActions, setShowActions] = useState(false);
  
  const handleClick = () => {
    onSelect(person);
    setShowActions(false);
  };
  
  return (
    <div 
      className={`tree-node group relative w-full h-full ${person.isSelected ? 'border-primary ring-2 ring-primary/50' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div 
        className="flex flex-col items-center p-2 cursor-pointer bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
        onClick={handleClick}
      >
        <Avatar className="w-16 h-16 mb-2">
          <AvatarImage src={person.photo || '/placeholder.svg'} alt={person.name} />
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {person.name.split(' ').map(part => part[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-medium text-sm">{person.name}</p>
          {person.birthDate && (
            <p className="text-xs text-muted-foreground">{person.birthDate.split('-')[0]}</p>
          )}
          {person.birthPlace && (
            <p className="text-xs text-muted-foreground truncate max-w-[70px]">{person.birthPlace}</p>
          )}
        </div>
      </div>
      
      {/* Кнопки действий */}
      {showActions && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex gap-1 bg-background p-1 rounded-md shadow-md border border-border z-10">
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
            <User size={14} className="mb-1 mr-1" />
            <Plus size={14} className="absolute top-1 right-1" />
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
            <Users size={16} />
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
            <User size={14} className="mt-1 mr-1" />
            <Plus size={14} className="absolute bottom-1 right-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
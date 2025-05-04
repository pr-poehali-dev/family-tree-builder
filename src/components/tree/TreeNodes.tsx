
import { Person } from '@/types/person';
import TreeNode from '@/components/TreeNode';

interface TreeNodesProps {
  people: Person[];
  onSelectPerson: (person: Person) => void;
}

const TreeNodes = ({ people, onSelectPerson }: TreeNodesProps) => {
  if (!people || !people.length) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-lg text-muted-foreground">Добавьте персону, чтобы начать создание дерева</p>
      </div>
    );
  }
  
  return (
    <>
      {people.map(person => {
        if (person.x === undefined || person.y === undefined) return null;
        
        return (
          <div 
            key={person.id}
            style={{ 
              position: 'absolute', 
              left: person.x || 0, 
              top: person.y || 0,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <TreeNode 
              person={person} 
              onSelect={onSelectPerson}
            />
          </div>
        );
      })}
    </>
  );
};

export default TreeNodes;

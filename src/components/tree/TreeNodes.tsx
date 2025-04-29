import { Person } from '@/types/person';
import TreeNode from '@/components/TreeNode';

interface TreeNodesProps {
  people: Person[];
  onSelectPerson: (person: Person) => void;
}

const TreeNodes = ({ people, onSelectPerson }: TreeNodesProps) => {
  return (
    <>
      {people.map(person => (
        <div 
          key={person.id}
          style={{ 
            position: 'absolute', 
            left: person.x || 0, 
            top: person.y || 0,
          }}
        >
          <TreeNode 
            person={person} 
            onSelect={onSelectPerson}
          />
        </div>
      ))}
    </>
  );
};

export default TreeNodes;

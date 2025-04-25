import { Person } from '@/types/person';

interface TreeNodeProps {
  person: Person;
  onSelect: (person: Person) => void;
}

const TreeNode = ({ person, onSelect }: TreeNodeProps) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative cursor-pointer transition-transform hover:scale-105"
        onClick={() => onSelect(person)}
      >
        {/* Круглая карточка с именем */}
        <div className="w-24 h-24 rounded-full bg-white border border-[#D9A799] shadow-md flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#2F5542] font-medium">{person.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
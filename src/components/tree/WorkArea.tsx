import { Person, RelationType } from '@/types/person';
import TreeCanvas from '@/components/TreeCanvas';
import LeftSidebar from '@/components/tree/LeftSidebar';
import RightSidebar from '@/components/tree/RightSidebar';

interface WorkAreaProps {
  people: Person[];
  selectedPerson: Person | null;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onSelectPerson: (person: Person) => void;
  onSavePerson: (data: Partial<Person>) => void;
  onAddRelative: (personId: string, relationType: RelationType) => void;
}

const WorkArea = ({
  people,
  selectedPerson,
  sidebarOpen,
  setSidebarOpen,
  onSelectPerson,
  onSavePerson,
  onAddRelative
}: WorkAreaProps) => {
  return (
    <div className="flex-grow flex">
      {/* Левая панель инструментов */}
      <LeftSidebar />
      
      {/* Основная область с деревом */}
      <div className="flex-grow relative">
        <TreeCanvas 
          people={people} 
          onSelectPerson={onSelectPerson}
          onAddRelative={onAddRelative}
        />
      </div>
      
      {/* Правая панель с информацией */}
      <RightSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        selectedPerson={selectedPerson}
        onSavePerson={onSavePerson}
      />
    </div>
  );
};

export default WorkArea;
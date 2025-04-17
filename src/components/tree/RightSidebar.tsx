import { Person } from '@/types/person';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonDetailsForm from '@/components/PersonDetailsForm';
import MediaPanel from '@/components/tree/MediaPanel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedPerson: Person | null;
  onSavePerson: (data: Partial<Person>) => void;
}

const RightSidebar = ({
  isOpen,
  setIsOpen,
  selectedPerson,
  onSavePerson
}: RightSidebarProps) => {
  return (
    <div 
      className={`border-l border-border bg-background transition-all duration-300 ${
        isOpen ? 'w-80' : 'w-0'
      }`}
    >
      <div 
        className="absolute w-6 h-12 bg-background border border-border -ml-3 top-1/2 transform -translate-y-1/2 rounded-l-md flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </div>
      
      {isOpen && (
        <Tabs defaultValue="details" className="h-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="details">Детали</TabsTrigger>
            <TabsTrigger value="media">Медиа</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="h-[calc(100%-40px)] overflow-y-auto">
            <PersonDetailsForm 
              person={selectedPerson} 
              onSave={onSavePerson} 
            />
          </TabsContent>
          <TabsContent value="media" className="h-[calc(100%-40px)] overflow-y-auto">
            <MediaPanel person={selectedPerson} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default RightSidebar;
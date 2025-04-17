import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TreeCanvas from '@/components/TreeCanvas';
import PersonDetailsForm from '@/components/PersonDetailsForm';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, Save, Download, Share2, 
  Layers, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Person {
  id: string;
  name: string;
  birthDate?: string;
  birthPlace?: string;
  photo?: string;
  biography?: string;
  documents?: string[];
  parentIds?: string[];
  childrenIds?: string[];
  partnerId?: string;
  x?: number;
  y?: number;
  isSelected?: boolean;
}

const CreateTree = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  
  // Пример данных для дерева
  const [people, setPeople] = useState<Person[]>([
    { 
      id: '1', 
      name: 'Иван Петров', 
      birthDate: '1980-05-15', 
      birthPlace: 'Москва',
      x: 500, 
      y: 300 
    },
    { 
      id: '2', 
      name: 'Мария Петрова', 
      birthDate: '1982-08-21', 
      birthPlace: 'Санкт-Петербург',
      x: 700, 
      y: 300 
    },
    { 
      id: '3', 
      name: 'Алексей Петров', 
      birthDate: '2010-03-10', 
      x: 600, 
      y: 450 
    },
  ]);
  
  const handleSelectPerson = (person: Person) => {
    // Сбрасываем выделение для всех
    const updatedPeople = people.map(p => ({ ...p, isSelected: false }));
    
    // Выделяем выбранного человека
    const selectedIndex = updatedPeople.findIndex(p => p.id === person.id);
    if (selectedIndex >= 0) {
      updatedPeople[selectedIndex].isSelected = true;
      setSelectedPerson(updatedPeople[selectedIndex]);
      setPeople(updatedPeople);
    }
  };
  
  const handleSavePerson = (data: Partial<Person>) => {
    if (!selectedPerson) return;
    
    const updatedPeople = people.map(person => 
      person.id === selectedPerson.id ? { ...person, ...data } : person
    );
    
    setPeople(updatedPeople);
    setSelectedPerson(prev => prev ? { ...prev, ...data } : null);
  };
  
  const handleAddRelative = (personId: string, relationType: 'parent' | 'child' | 'partner') => {
    const sourcePerson = people.find(p => p.id === personId);
    if (!sourcePerson) return;
    
    const newPersonId = `new-${Date.now()}`;
    let newPerson: Person = {
      id: newPersonId,
      name: 'Новый человек',
    };
    
    // Вычисляем позиции для нового человека
    if (relationType === 'parent') {
      newPerson.x = sourcePerson.x;
      newPerson.y = sourcePerson.y! - 150;
      newPerson.childrenIds = [personId];
    } else if (relationType === 'child') {
      newPerson.x = sourcePerson.x;
      newPerson.y = sourcePerson.y! + 150;
      newPerson.parentIds = [personId];
    } else if (relationType === 'partner') {
      newPerson.x = sourcePerson.x! + 200;
      newPerson.y = sourcePerson.y;
    }
    
    // Обновляем связи существующего человека
    const updatedPeople = people.map(person => {
      if (person.id === personId) {
        if (relationType === 'parent') {
          return { 
            ...person, 
            parentIds: [...(person.parentIds || []), newPersonId] 
          };
        } else if (relationType === 'child') {
          return { 
            ...person, 
            childrenIds: [...(person.childrenIds || []), newPersonId] 
          };
        } else if (relationType === 'partner') {
          return { ...person, partnerId: newPersonId };
        }
      }
      return person;
    });
    
    setPeople([...updatedPeople, newPerson]);
    setSelectedPerson(newPerson);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        {/* Панель инструментов */}
        <div className="bg-background border-b border-border p-4 flex justify-between items-center">
          <div className="font-heading text-xl">Семейное древо</div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-1">
              <Save size={16} />
              <span className="hidden md:inline">Сохранить</span>
            </Button>
            <Button variant="outline" className="flex gap-1">
              <Download size={16} />
              <span className="hidden md:inline">Экспорт</span>
            </Button>
            <Button variant="outline" className="flex gap-1">
              <Share2 size={16} />
              <span className="hidden md:inline">Поделиться</span>
            </Button>
          </div>
        </div>
        
        {/* Рабочая область */}
        <div className="flex-grow flex">
          {/* Левая панель инструментов */}
          <div className="border-r border-border bg-muted/20 w-16 flex flex-col items-center py-4">
            <Button variant="ghost" className="w-10 h-10 p-0 mb-2" title="Добавить человека">
              <UserPlus size={20} />
            </Button>
            <Button variant="ghost" className="w-10 h-10 p-0 mb-2" title="Стили отображения дерева">
              <Layers size={20} />
            </Button>
          </div>
          
          {/* Основная область с деревом */}
          <div className="flex-grow relative">
            <TreeCanvas 
              people={people} 
              onSelectPerson={handleSelectPerson}
              onAddRelative={handleAddRelative}
            />
          </div>
          
          {/* Правая панель с информацией */}
          <div 
            className={`border-l border-border bg-background transition-all duration-300 ${
              sidebarOpen ? 'w-80' : 'w-0'
            }`}
          >
            <div className="absolute w-6 h-12 bg-background border border-border -ml-3 top-1/2 transform -translate-y-1/2 rounded-l-md flex items-center justify-center cursor-pointer"
                 onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </div>
            
            {sidebarOpen && (
              <Tabs defaultValue="details" className="h-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="details">Детали</TabsTrigger>
                  <TabsTrigger value="media">Медиа</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="h-[calc(100%-40px)] overflow-y-auto">
                  <PersonDetailsForm 
                    person={selectedPerson} 
                    onSave={handleSavePerson} 
                  />
                </TabsContent>
                <TabsContent value="media" className="p-4">
                  <h3 className="font-heading text-xl mb-4">Медиа материалы</h3>
                  <div className="text-center py-8 text-muted-foreground">
                    {selectedPerson ? (
                      <>
                        <p className="mb-4">Нет загруженных медиа материалов для {selectedPerson.name}</p>
                        <Button>Загрузить фото или документ</Button>
                      </>
                    ) : (
                      <p>Выберите человека, чтобы управлять медиа материалами</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTree;
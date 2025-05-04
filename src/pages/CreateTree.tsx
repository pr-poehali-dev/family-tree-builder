
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TreeCanvas from '@/components/TreeCanvas';
import { usePersonsData } from '@/hooks/usePersonsData';
import { Person } from '@/types/person';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PersonDetailsForm from '@/components/PersonDetailsForm';
import Icon from '@/components/ui/icon';

const CreateTree = () => {
  const { toast } = useToast();
  const { persons, addPerson, updatePerson, removePerson } = usePersonsData();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [activeTab, setActiveTab] = useState('canvas');
  
  // Обработчик выбора персоны в древе
  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
    setActiveTab('details');
    
    toast({
      title: "Персона выбрана",
      description: `${person.name || 'Без имени'} теперь активна для редактирования`,
    });
  };
  
  // Обработчик добавления новой персоны
  const handleAddPerson = () => {
    const newPerson: Person = {
      id: `person_${Date.now()}`,
      name: 'Новая персона',
      generation: 0,
    };
    
    addPerson(newPerson);
    setSelectedPerson(newPerson);
    setActiveTab('details');
    
    toast({
      title: "Персона добавлена",
      description: "Новая персона успешно добавлена в ваше древо",
    });
  };
  
  // Обработчик обновления данных персоны
  const handleUpdatePerson = (updatedPerson: Person) => {
    updatePerson(updatedPerson);
    setSelectedPerson(updatedPerson);
    
    toast({
      title: "Данные обновлены",
      description: "Информация о персоне успешно обновлена",
    });
  };
  
  // Обработчик удаления персоны
  const handleRemovePerson = (personId: string) => {
    removePerson(personId);
    setSelectedPerson(null);
    
    toast({
      title: "Персона удалена",
      description: "Персона успешно удалена из вашего древа",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Создание семейного древа</h1>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab('canvas')}>
              <Icon name="Eye" className="mr-2 h-4 w-4" />
              Просмотр
            </Button>
            <Button onClick={handleAddPerson}>
              <Icon name="UserPlus" className="mr-2 h-4 w-4" />
              Добавить персону
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="canvas">Древо</TabsTrigger>
            <TabsTrigger 
              value="details" 
              disabled={!selectedPerson}
            >
              Детали персоны
            </TabsTrigger>
            <TabsTrigger value="settings">Настройки древа</TabsTrigger>
          </TabsList>
          
          <TabsContent value="canvas" className="border rounded-lg">
            <div className="h-[calc(100vh-300px)] min-h-[500px]">
              {persons.length > 0 ? (
                <TreeCanvas 
                  persons={persons} 
                  onSelectPerson={handleSelectPerson} 
                  selectedPersonId={selectedPerson?.id}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <Icon name="UsersRound" size={60} className="text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Ваше древо пока пусто</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Добавьте первую персону, чтобы начать построение семейного древа
                  </p>
                  <Button onClick={handleAddPerson}>
                    <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                    Добавить первую персону
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            {selectedPerson ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <PersonDetailsForm 
                    person={selectedPerson} 
                    onUpdate={handleUpdatePerson}
                    onRemove={() => handleRemovePerson(selectedPerson.id)}
                    persons={persons}
                  />
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Предпросмотр</CardTitle>
                      <CardDescription>Информация о персоне</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-24 h-24 rounded-full bg-secondary/20 mb-2 flex items-center justify-center overflow-hidden">
                          {selectedPerson.photoUrl ? (
                            <img 
                              src={selectedPerson.photoUrl} 
                              alt={selectedPerson.name || 'Фото'} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Icon name="User" size={40} className="text-muted-foreground/50" />
                          )}
                        </div>
                        <h3 className="font-medium">{selectedPerson.name || 'Без имени'}</h3>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        {selectedPerson.birthYear && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Год рождения:</span>
                            <span>{selectedPerson.birthYear}</span>
                          </div>
                        )}
                        {selectedPerson.deathYear && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Год смерти:</span>
                            <span>{selectedPerson.deathYear}</span>
                          </div>
                        )}
                        {selectedPerson.location && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Место:</span>
                            <span>{selectedPerson.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p>Выберите персону в древе для редактирования</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки древа</CardTitle>
                <CardDescription>Настройте параметры отображения вашего семейного древа</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="treeName">Название древа</Label>
                    <Input id="treeName" placeholder="Моё семейное древо" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline">Экспорт данных</Button>
                    <Button variant="destructive">Очистить древо</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateTree;

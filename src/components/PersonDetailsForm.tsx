
import { useState } from 'react';
import { Person } from '@/types/person';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';

interface PersonDetailsFormProps {
  person: Person;
  onUpdate: (person: Person) => void;
  onRemove: () => void;
  persons: Person[];
}

const PersonDetailsForm = ({ person, onUpdate, onRemove, persons }: PersonDetailsFormProps) => {
  const [formData, setFormData] = useState<Person>({ ...person });
  
  // Обработчик изменения полей формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Обработчик изменения числовых полей
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value ? parseInt(value, 10) : undefined 
    }));
  };
  
  // Обработчик изменения выпадающих списков
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };
  
  // Фильтрация персон для выбора родителей (не показываем детей и самого себя)
  const possibleParents = persons.filter(p => 
    p.id !== person.id && 
    !person.childrenIds?.includes(p.id)
  );
  
  // Фильтрация персон для выбора детей (не показываем родителей и самого себя)
  const possibleChildren = persons.filter(p => 
    p.id !== person.id && 
    !person.parentIds?.includes(p.id)
  );
  
  // Фильтрация персон для выбора супругов (не показываем самого себя)
  const possibleSpouses = persons.filter(p => 
    p.id !== person.id
  );
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Имя и Фамилия</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Введите имя и фамилию"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthYear">Год рождения</Label>
              <Input
                id="birthYear"
                name="birthYear"
                type="number"
                value={formData.birthYear || ''}
                onChange={handleNumberChange}
                placeholder="Например, 1980"
              />
            </div>
            
            <div>
              <Label htmlFor="deathYear">Год смерти</Label>
              <Input
                id="deathYear"
                name="deathYear"
                type="number"
                value={formData.deathYear || ''}
                onChange={handleNumberChange}
                placeholder="Оставьте пустым, если жив"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="gender">Пол</Label>
            <RadioGroup
              value={formData.gender || ''}
              onValueChange={(value) => handleSelectChange('gender', value as 'male' | 'female' | 'other')}
              className="flex gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Мужской</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Женский</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Другой</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="photoUrl">Ссылка на фото</Label>
            <Input
              id="photoUrl"
              name="photoUrl"
              value={formData.photoUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="birthplace">Место рождения</Label>
            <Input
              id="birthplace"
              name="birthplace"
              value={formData.birthplace || ''}
              onChange={handleChange}
              placeholder="Город, страна"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Место проживания</Label>
            <Input
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="Текущее место жительства"
            />
          </div>
          
          <div>
            <Label htmlFor="occupation">Профессия</Label>
            <Input
              id="occupation"
              name="occupation"
              value={formData.occupation || ''}
              onChange={handleChange}
              placeholder="Род деятельности"
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Биография</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
              placeholder="Краткая биография или заметки"
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Семейные связи</h3>
        
        <div>
          <Label>Поколение</Label>
          <Select 
            value={formData.generation?.toString() || '0'} 
            onValueChange={(value) => handleSelectChange('generation', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите поколение" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Первое поколение</SelectItem>
              <SelectItem value="1">Второе поколение</SelectItem>
              <SelectItem value="2">Третье поколение</SelectItem>
              <SelectItem value="3">Четвертое поколение</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Поколение определяет вертикальное положение персоны в древе
          </p>
        </div>
        
        {/* Пока не реализуем выбор родителей/детей/супругов для упрощения */}
        
      </div>
      
      <div className="flex justify-between pt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" type="button">
              <Icon name="Trash2" className="mr-2 h-4 w-4" />
              Удалить персону
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие нельзя отменить. Персона будет полностью удалена из вашего семейного древа.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction onClick={onRemove}>Удалить</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Button type="submit">Сохранить изменения</Button>
      </div>
    </form>
  );
};

export default PersonDetailsForm;

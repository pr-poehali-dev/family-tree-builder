import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Person } from '@/types/person';

interface PersonDetailsFormProps {
  person: Person | null;
  onSave: (data: Partial<Person>) => void;
}

const PersonDetailsForm = ({ person, onSave }: PersonDetailsFormProps) => {
  const [formData, setFormData] = useState<Partial<Person>>(person || {});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value as 'male' | 'female' }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  if (!person) {
    return <div className="p-6 text-center text-muted-foreground">Выберите человека для просмотра или редактирования</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="surname">Фамилия</Label>
        <Input 
          id="surname" 
          name="surname"
          value={formData.surname || ''} 
          onChange={handleChange}
          placeholder="Фамилия"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Имя</Label>
        <Input 
          id="name" 
          name="name"
          value={formData.name || ''} 
          onChange={handleChange}
          placeholder="Имя"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="middleName">Отчество</Label>
        <Input 
          id="middleName" 
          name="middleName"
          value={formData.middleName || ''} 
          onChange={handleChange}
          placeholder="Отчество"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Пол</Label>
        <RadioGroup 
          value={formData.gender || 'male'} 
          onValueChange={handleGenderChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Мужской</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Женский</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birthDate">Дата рождения</Label>
        <Input 
          id="birthDate" 
          name="birthDate"
          value={formData.birthDate || ''} 
          onChange={handleChange}
          placeholder="Например: 01.01.2000"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birthPlace">Место рождения</Label>
        <Input 
          id="birthPlace" 
          name="birthPlace"
          value={formData.birthPlace || ''} 
          onChange={handleChange}
          placeholder="Город, страна"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="biography">Биография</Label>
        <Textarea 
          id="biography" 
          name="biography"
          value={formData.biography || ''} 
          onChange={handleChange}
          placeholder="Краткая биография"
          rows={4}
        />
      </div>
      
      <Button type="submit" className="w-full">Сохранить</Button>
    </form>
  );
};

export default PersonDetailsForm;
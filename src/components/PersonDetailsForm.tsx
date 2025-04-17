import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Person {
  id: string;
  name: string;
  birthDate?: string;
  birthPlace?: string;
  photo?: string;
  biography?: string;
  documents?: string[];
}

interface PersonDetailsFormProps {
  person: Person | null;
  onSave: (data: Partial<Person>) => void;
}

const PersonDetailsForm = ({ person, onSave }: PersonDetailsFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<Partial<Person>>({
    defaultValues: person || {}
  });
  
  const birthDate = watch('birthDate');
  
  if (!person) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Выберите человека, чтобы увидеть и редактировать его данные</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading text-xl">Информация о человеке</h3>
        <Button type="submit">Сохранить</Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Имя</Label>
        <Input id="name" {...register('name')} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birthDate">Дата рождения</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {birthDate ? format(new Date(birthDate), 'PPP', { locale: ru }) : <span>Выберите дату</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={birthDate ? new Date(birthDate) : undefined}
              onSelect={(date) => setValue('birthDate', date ? format(date, 'yyyy-MM-dd') : undefined)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birthPlace">Место рождения</Label>
        <Input id="birthPlace" {...register('birthPlace')} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="biography">Биография</Label>
        <Textarea id="biography" rows={5} {...register('biography')} />
      </div>
      
      <div className="space-y-2">
        <Label>Фотография</Label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-muted rounded-md overflow-hidden">
            {person.photo ? (
              <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Нет фото
              </div>
            )}
          </div>
          <Button type="button" variant="outline" className="flex gap-2">
            <Upload size={16} />
            Загрузить фото
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Документы</Label>
        <Button type="button" variant="outline" className="w-full flex gap-2 justify-center">
          <Upload size={16} />
          Добавить документы
        </Button>
      </div>
    </form>
  );
};

export default PersonDetailsForm;
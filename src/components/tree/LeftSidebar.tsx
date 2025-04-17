import { Button } from '@/components/ui/button';
import { UserPlus, Layers } from 'lucide-react';

const LeftSidebar = () => {
  return (
    <div className="border-r border-border bg-muted/20 w-16 flex flex-col items-center py-4">
      <Button 
        variant="ghost" 
        className="w-10 h-10 p-0 mb-2" 
        title="Добавить человека"
        onClick={() => console.log('Добавление нового человека')}
      >
        <UserPlus size={20} />
      </Button>
      <Button 
        variant="ghost" 
        className="w-10 h-10 p-0 mb-2" 
        title="Стили отображения дерева"
        onClick={() => console.log('Настройки отображения')}
      >
        <Layers size={20} />
      </Button>
    </div>
  );
};

export default LeftSidebar;
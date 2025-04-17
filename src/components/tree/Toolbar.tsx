import { Button } from '@/components/ui/button';
import { Save, Download, Share2 } from 'lucide-react';

const Toolbar = () => {
  return (
    <div className="bg-background border-b border-border p-4 flex justify-between items-center">
      <div className="font-heading text-xl">Семейные корни</div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex gap-1" 
          onClick={() => console.log('Сохранение')}
        >
          <Save size={16} />
          <span className="hidden md:inline">Сохранить</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex gap-1"
          onClick={() => console.log('Экспорт')}
        >
          <Download size={16} />
          <span className="hidden md:inline">Экспорт</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex gap-1"
          onClick={() => console.log('Поделиться')}
        >
          <Share2 size={16} />
          <span className="hidden md:inline">Поделиться</span>
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
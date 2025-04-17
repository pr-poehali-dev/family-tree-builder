import { Button } from '@/components/ui/button';
import { Person } from '@/types/person';

interface MediaPanelProps {
  person: Person | null;
}

const MediaPanel = ({ person }: MediaPanelProps) => {
  return (
    <div className="p-4">
      <h3 className="font-heading text-xl mb-4">Медиа материалы</h3>
      <div className="text-center py-8 text-muted-foreground">
        {person ? (
          <>
            <p className="mb-4">Нет загруженных медиа материалов для {person.name}</p>
            <Button onClick={() => console.log('Загрузка медиа')}>
              Загрузить фото или документ
            </Button>
          </>
        ) : (
          <p>Выберите человека, чтобы управлять медиа материалами</p>
        )}
      </div>
    </div>
  );
};

export default MediaPanel;
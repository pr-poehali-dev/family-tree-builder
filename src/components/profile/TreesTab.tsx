import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Eye, EyeOff, GitBranch } from 'lucide-react';

type Tree = {
  id: number;
  name: string;
  members: number;
  lastEdit: string;
  privacy: 'private' | 'family' | 'public';
  thumbnail: string;
};

type TreesTabProps = {
  userTrees: Tree[];
};

const TreesTab = ({ userTrees }: TreesTabProps) => {
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Мои семейные деревья</h2>
        <Button>
          <GitBranch className="mr-2 h-4 w-4" />
          Создать новое древо
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTrees.map(tree => (
          <Card key={tree.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tree.name}</CardTitle>
                {tree.privacy === 'private' && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                {tree.privacy === 'family' && <Eye className="h-4 w-4 text-muted-foreground" />}
                {tree.privacy === 'public' && <Eye className="h-4 w-4 text-muted-foreground" />}
              </div>
              <CardDescription>Последнее изменение: {tree.lastEdit}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="aspect-[16/9] overflow-hidden rounded-md mb-4">
                <img 
                  src={tree.thumbnail} 
                  alt={tree.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>Количество персон: {tree.members}</span>
                <span className="flex items-center">
                  {tree.privacy === 'private' && 'Приватное'}
                  {tree.privacy === 'family' && 'Для семьи'}
                  {tree.privacy === 'public' && 'Публичное'}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Просмотр
              </Button>
              <Button variant="default" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Редактировать
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TreesTab;
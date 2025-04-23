import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImagePlus, Lock, LogOut } from 'lucide-react';

type ProfileSidebarProps = {
  name: string;
  email: string;
  userTrees: {
    id: number;
    name: string;
    members: number;
  }[];
};

const ProfileSidebar = ({ name, email, userTrees }: ProfileSidebarProps) => {
  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt={name} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{email}</CardDescription>
          <div className="mt-2">
            <Badge variant="secondary">Премиум аккаунт</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full" size="sm">
            <ImagePlus className="mr-2 h-4 w-4" />
            Изменить фото
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <Lock className="mr-2 h-4 w-4" />
            Изменить пароль
          </Button>
          <Button variant="outline" className="w-full" size="sm" variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </CardContent>
      </Card>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Всего деревьев</p>
              <p className="text-2xl font-bold">{userTrees.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего персон</p>
              <p className="text-2xl font-bold">{userTrees.reduce((acc, tree) => acc + tree.members, 0)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Дата регистрации</p>
              <p className="text-md">15 марта 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileSidebar;
import { useState } from 'react';
import { User, Lock, Settings, GitBranch, ImagePlus, Save, LogOut, Eye, EyeOff, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Profile = () => {
  const [name, setName] = useState('Анна Иванова');
  const [email, setEmail] = useState('anna@example.com');
  const [privacy, setPrivacy] = useState('family');
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const userTrees = [
    {
      id: 1,
      name: 'Семья Ивановых',
      members: 32,
      lastEdit: '2 дня назад',
      privacy: 'family',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Родословная по маминой линии',
      members: 18,
      lastEdit: '3 недели назад',
      privacy: 'private',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Исследование фамилии Петровых',
      members: 45,
      lastEdit: '1 месяц назад',
      privacy: 'public',
      thumbnail: '/placeholder.svg'
    }
  ];
  
  const handleSaveProfile = () => {
    alert('Профиль успешно сохранен!');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" alt={name} />
                      <AvatarFallback>АИ</AvatarFallback>
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
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue="trees">
                <TabsList className="mb-8 grid w-full grid-cols-3">
                  <TabsTrigger value="trees">
                    <GitBranch className="mr-2 h-4 w-4" />
                    Мои деревья
                  </TabsTrigger>
                  <TabsTrigger value="account">
                    <User className="mr-2 h-4 w-4" />
                    Личные данные
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Настройки
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="trees">
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
                </TabsContent>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Личные данные</CardTitle>
                      <CardDescription>
                        Управляйте своими личными данными и информацией для контакта
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Электронная почта</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Приватность по умолчанию</Label>
                        <RadioGroup 
                          value={privacy} 
                          onValueChange={setPrivacy}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="private" />
                            <Label htmlFor="private" className="font-normal">
                              Только я
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="family" id="family" />
                            <Label htmlFor="family" className="font-normal">
                              Моя семья
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" />
                            <Label htmlFor="public" className="font-normal">
                              Публично
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить изменения
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Настройки</CardTitle>
                      <CardDescription>
                        Настройте параметры уведомлений и отображения
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Уведомления</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Уведомления по электронной почте</Label>
                            <p className="text-sm text-muted-foreground">
                              Получать уведомления о действиях с вашими деревьями
                            </p>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="digest">Еженедельный дайджест</Label>
                            <p className="text-sm text-muted-foreground">
                              Получать сводку новостей и советов каждую неделю
                            </p>
                          </div>
                          <Switch id="digest" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Внешний вид</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-md p-4 flex items-center space-x-4">
                            <div className="w-4 h-4 rounded-full bg-primary"></div>
                            <div>
                              <p className="font-medium">Классическая тема</p>
                              <p className="text-sm text-muted-foreground">Стандартное оформление сервиса</p>
                            </div>
                          </div>
                          <div className="border rounded-md p-4 flex items-center space-x-4">
                            <div className="w-4 h-4 rounded-full border"></div>
                            <div>
                              <p className="font-medium">Темная тема</p>
                              <p className="text-sm text-muted-foreground">Темное оформление для комфортной работы</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => alert('Настройки сохранены!')}>
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить настройки
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
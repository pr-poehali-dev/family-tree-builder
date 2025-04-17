import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { ChevronRight, UserPlus, Users, GitBranch } from 'lucide-react';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('basic');
  
  const demoFeatures = [
    {
      title: 'Создание простого дерева',
      description: 'Добавьте несколько родственников и создайте свое первое семейное древо',
      icon: <GitBranch className="w-12 h-12 text-primary" />,
    },
    {
      title: 'Управление профилями',
      description: 'Добавление подробной информации о каждом члене семьи',
      icon: <UserPlus className="w-12 h-12 text-primary" />,
    },
    {
      title: 'Совместный доступ',
      description: 'Пригласите родственников к совместному редактированию древа',
      icon: <Users className="w-12 h-12 text-primary" />,
    },
  ];
  
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Демо-режим</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Испытайте возможности нашего сервиса без регистрации. Создайте пробное семейное древо, изучите функционал и убедитесь в удобстве платформы.
        </p>
      </div>
      
      <Tabs defaultValue="basic" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="basic">Базовый режим</TabsTrigger>
          <TabsTrigger value="extended">Расширенный режим</TabsTrigger>
          <TabsTrigger value="premium">Премиум функции</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Базовый демо-режим</CardTitle>
              <CardDescription>
                Создайте простое семейное древо с ограниченным набором функций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {demoFeatures.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                    {feature.icon}
                    <h3 className="mt-4 font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild size="lg">
                <Link to="/create?mode=demo">
                  Начать базовое демо
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="extended">
          <Card>
            <CardHeader>
              <CardTitle>Расширенный демо-режим</CardTitle>
              <CardDescription>
                Испробуйте дополнительные возможности для создания подробного семейного древа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">Доступно больше функций</h3>
                <p className="text-muted-foreground mb-4">
                  В расширенном демо-режиме вы можете:
                </p>
                <ul className="text-left space-y-2 max-w-md mx-auto mb-6">
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Добавлять до 20 человек в семейное древо</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Добавлять даты и места событий жизни</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Загружать фотографии для членов семьи</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild size="lg">
                <Link to="/create?mode=extended">
                  Начать расширенное демо
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="premium">
          <Card>
            <CardHeader>
              <CardTitle>Премиум функции</CardTitle>
              <CardDescription>
                Ознакомьтесь с полным набором возможностей премиум-аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-4">Премиум возможности</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="bg-background p-4 rounded-md">
                    <h4 className="font-medium mb-2">Расширенная визуализация</h4>
                    <p className="text-sm text-muted-foreground">
                      Различные типы отображения древа, включая круговую и вертикальную диаграммы
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-md">
                    <h4 className="font-medium mb-2">Экспорт данных</h4>
                    <p className="text-sm text-muted-foreground">
                      Сохранение древа в PDF, GEDCOM и других форматах
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-md">
                    <h4 className="font-medium mb-2">Генеалогические исследования</h4>
                    <p className="text-sm text-muted-foreground">
                      Интеграция с архивными базами данных для поиска предков
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-md">
                    <h4 className="font-medium mb-2">Неограниченное хранилище</h4>
                    <p className="text-sm text-muted-foreground">
                      Добавляйте неограниченное количество фото, документов и записей
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/pricing">
                  Тарифы и цены
                </Link>
              </Button>
              <Button asChild>
                <Link to="/create?mode=premium">
                  Попробовать премиум-демо
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Хотите сохранить ваше древо?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Чтобы сохранить результаты работы в демо-режиме и получить доступ ко всем функциям сервиса, зарегистрируйтесь в системе.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" asChild>
            <Link to="/signup">
              Создать аккаунт
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/pricing">
              Узнать о тарифах
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
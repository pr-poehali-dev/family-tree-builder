import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const TutorialsSection = () => {
  return (
    <>
      <h2 className="text-2xl font-medium mb-6">Обучающие материалы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VideoTutorialsCard />
        <TextGuidesCard />
      </div>
      
      <InteractiveTourSection />
    </>
  );
};

const VideoTutorialsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Видеоуроки</CardTitle>
        <CardDescription>
          Пошаговые видеоинструкции по работе с сервисом
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="mr-2 bg-primary/10 text-primary p-1 rounded">▶</span>
            <div>
              <h4 className="font-medium">Начало работы с сервисом</h4>
              <p className="text-sm text-muted-foreground">Основные функции и навигация (5:12)</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 bg-primary/10 text-primary p-1 rounded">▶</span>
            <div>
              <h4 className="font-medium">Создание первого древа</h4>
              <p className="text-sm text-muted-foreground">Базовые принципы построения (7:34)</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 bg-primary/10 text-primary p-1 rounded">▶</span>
            <div>
              <h4 className="font-medium">Работа с архивными документами</h4>
              <p className="text-sm text-muted-foreground">Поиск и интеграция в древо (8:16)</p>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          Смотреть все видеоуроки
        </Button>
      </CardFooter>
    </Card>
  );
};

const TextGuidesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Текстовые руководства</CardTitle>
        <CardDescription>
          Подробные инструкции с иллюстрациями
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="mr-2 bg-primary/10 text-primary p-1 rounded">📄</span>
            <div>
              <h4 className="font-medium">Руководство пользователя</h4>
              <p className="text-sm text-muted-foreground">Полная документация по функциям сервиса</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 bg-primary/10 text-primary p-1 rounded">📄</span>
            <div>
              <h4 className="font-medium">Советы по исследованию родословной</h4>
              <p className="text-sm text-muted-foreground">Практические приемы поиска информации</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 bg-primary/10 text-primary p-1 rounded">📄</span>
            <div>
              <h4 className="font-medium">Совместная работа над древом</h4>
              <p className="text-sm text-muted-foreground">Как привлечь родственников к исследованию</p>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          Читать все руководства
        </Button>
      </CardFooter>
    </Card>
  );
};

const InteractiveTourSection = () => {
  return (
    <div className="mt-10 p-6 border rounded-lg bg-muted/40">
      <h3 className="font-medium text-lg mb-3">Интерактивные обучающие туры</h3>
      <p className="text-muted-foreground mb-4">
        Изучите все возможности сервиса с помощью интерактивных подсказок. 
        Мы проведем вас по основным разделам и функциям шаг за шагом.
      </p>
      <div className="flex space-x-4">
        <Button>Начать обучение</Button>
        <Button variant="outline">Краткий тур (3 мин)</Button>
      </div>
    </div>
  );
};

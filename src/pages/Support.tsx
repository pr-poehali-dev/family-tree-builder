import { useState } from 'react';
import { MessageSquare, HelpCircle, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const faqItems = [
    {
      question: 'Как начать создание семейного древа?',
      answer: 'Для начала создания древа необходимо зарегистрироваться на сайте и перейти в раздел "Создать древо". Система предложит вам начать с себя или другого члена семьи. Заполните основные данные, затем вы сможете добавлять родственников, используя инструменты на панели слева.'
    },
    {
      question: 'Сколько человек можно добавить в семейное древо?',
      answer: 'В бесплатной версии вы можете добавить до 25 человек в одно древо. Для премиум-подписки это ограничение снимается, и вы можете создать древо с неограниченным количеством родственников.'
    },
    {
      question: 'Как отправить приглашение родственнику для совместного редактирования?',
      answer: 'В разделе настроек древа выберите "Управление доступом", затем нажмите "Пригласить" и введите электронную почту вашего родственника. Вы можете установить права доступа: полное редактирование или только просмотр.'
    },
    {
      question: 'Как я могу экспортировать свое семейное древо?',
      answer: 'В верхнем меню конструктора древа выберите "Экспорт". Вы можете выбрать формат (PDF, GEDCOM, PNG) и настроить параметры экспорта, включая размер изображения и уровень детализации.'
    },
    {
      question: 'Как добавить исторические документы к профилям родственников?',
      answer: 'Откройте профиль родственника, перейдите во вкладку "Документы" и нажмите "Добавить". Вы можете загрузить фотографии документов с компьютера или смартфона, а также указать источник и добавить описание.'
    },
    {
      question: 'Могу ли я использовать архивные материалы с вашего сайта в своем исследовании?',
      answer: 'Да, вы можете использовать доступные вам архивные материалы для личного исследования. Обратите внимание, что некоторые документы доступны только с премиум-подпиской. При цитировании в публикациях, пожалуйста, указывайте источник.'
    },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки сообщения
    alert('Сообщение отправлено! Мы ответим вам в ближайшее время.');
    setName('');
    setEmail('');
    setMessage('');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Поддержка пользователей</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Получите помощь по работе с сервисом «Семейные корни». Мы стремимся сделать ваше исследование 
            семейной истории максимально комфортным и информативным.
          </p>
        </div>
        
        <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              Частые вопросы
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="mr-2 h-4 w-4" />
              Контактная форма
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              <ArrowRight className="mr-2 h-4 w-4" />
              Обучающие материалы
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <h2 className="text-2xl font-medium mb-6">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-12 text-center">
              <h3 className="text-lg font-medium mb-4">Не нашли ответ на свой вопрос?</h3>
              <Button variant="default">
                Задать вопрос специалисту
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Обратная связь</CardTitle>
                <CardDescription>
                  Отправьте нам сообщение, и мы ответим вам в течение 24 часов.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Ваше имя
                        </label>
                        <Input
                          id="name"
                          placeholder="Иван Петров"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Электронная почта
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@mail.ru"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Ваше сообщение
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Опишите вашу проблему или вопрос подробно..."
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="mt-6 w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Электронная почта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Для вопросов общего характера:
                  </p>
                  <p className="font-medium mt-1">support@semeynyekorni.ru</p>
                  
                  <p className="text-muted-foreground mt-4">
                    Для технической поддержки:
                  </p>
                  <p className="font-medium mt-1">help@semeynyekorni.ru</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Телефон поддержки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Горячая линия (пн-пт, 10:00-19:00 МСК):
                  </p>
                  <p className="font-medium mt-1">+7 (800) 123-45-67</p>
                  
                  <p className="text-muted-foreground mt-4">
                    WhatsApp для быстрой связи:
                  </p>
                  <p className="font-medium mt-1">+7 (900) 123-45-67</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials">
            <h2 className="text-2xl font-medium mb-6">Обучающие материалы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            
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
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
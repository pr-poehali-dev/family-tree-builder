import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EducationCard from '@/components/EducationCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Education = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const educationItems = [
    {
      icon: '📚',
      title: 'Видеокурс: Генеалогия для начинающих',
      description: 'Базовые принципы построения родословных древ и работы с архивными источниками',
      duration: '5 уроков, 2 часа',
      badge: 'Бесплатно',
      category: 'course'
    },
    {
      icon: '🔍',
      title: 'Как работать с архивами: инструкция',
      description: 'Подробное руководство по поиску информации в государственных и региональных архивах',
      duration: '25 минут чтения',
      category: 'guide'
    },
    {
      icon: '🎙️',
      title: 'Шаблоны интервью для родственников',
      description: 'Готовые вопросы для проведения интервью с родственниками и сохранения семейных историй',
      duration: '10 шаблонов',
      category: 'template'
    },
    {
      icon: '🧬',
      title: 'ДНК-генеалогия: основы и возможности',
      description: 'Как ДНК-тесты могут помочь в построении родословной и поиске родственников',
      duration: '4 урока, 1.5 часа',
      badge: 'Популярное',
      category: 'course'
    },
    {
      icon: '📄',
      title: 'Типы генеалогических документов',
      description: 'Обзор основных типов документов, которые помогут в исследовании родословной',
      duration: '15 минут чтения',
      category: 'guide'
    },
    {
      icon: '🏛️',
      title: 'Метрические книги: как читать и понимать',
      description: 'Руководство по работе с церковными метрическими книгами XIX - начала XX веков',
      duration: '3 урока, 1 час',
      category: 'course'
    },
  ];

  const filteredItems = educationItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-muted/10">
        <div className="container mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold mb-4">Обучение</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Курсы, статьи и инструкции для эффективного исследования родословной и работы с архивными материалами
            </p>
          </div>
          
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="search"
              placeholder="Поиск по курсам и материалам..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Все материалы</TabsTrigger>
              <TabsTrigger value="course">Курсы</TabsTrigger>
              <TabsTrigger value="guide">Инструкции</TabsTrigger>
              <TabsTrigger value="template">Шаблоны</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <EducationCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    duration={item.duration}
                    badge={item.badge}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="course">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.category === 'course')
                  .map((item, index) => (
                    <EducationCard
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      duration={item.duration}
                      badge={item.badge}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="guide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.category === 'guide')
                  .map((item, index) => (
                    <EducationCard
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      duration={item.duration}
                      badge={item.badge}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="template">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.category === 'template')
                  .map((item, index) => (
                    <EducationCard
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      duration={item.duration}
                      badge={item.badge}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Материалы не найдены. Попробуйте изменить запрос.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Education;
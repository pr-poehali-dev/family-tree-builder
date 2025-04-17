import { useState } from 'react';
import { Search, Filter, FileText, Book, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Archives = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const archiveCategories = [
    { id: 'census', name: 'Переписи населения', count: 1245 },
    { id: 'church', name: 'Метрические книги', count: 3872 },
    { id: 'military', name: 'Военные архивы', count: 2140 },
    { id: 'civil', name: 'Гражданские акты', count: 1932 },
    { id: 'nobility', name: 'Дворянские родословные', count: 643 },
    { id: 'photos', name: 'Исторические фотографии', count: 5213 },
  ];
  
  const archiveDocuments = [
    {
      id: 1,
      title: 'Перепись населения Центральной России 1897 г.',
      category: 'Переписи населения',
      date: '1897',
      description: 'Полная перепись населения центральных регионов Российской Империи, содержащая сведения о сословиях, профессиях и семейном положении.',
      format: 'PDF',
      accessLevel: 'Публичный'
    },
    {
      id: 2,
      title: 'Метрическая книга Вознесенской церкви',
      category: 'Метрические книги',
      date: '1856-1860',
      description: 'Записи о рождениях, браках и смертях прихожан Вознесенской церкви. Содержит имена, даты и родственные связи.',
      format: 'JPEG',
      accessLevel: 'Премиум'
    },
    {
      id: 3,
      title: 'Списки потерь в Великой Отечественной войне',
      category: 'Военные архивы',
      date: '1941-1945',
      description: 'Списки личного состава и сведения о потерях войсковых подразделений в период ВОВ.',
      format: 'PDF',
      accessLevel: 'Публичный'
    },
    {
      id: 4,
      title: 'Ревизская сказка Московской губернии',
      category: 'Переписи населения',
      date: '1782',
      description: 'Перепись податного населения Московской губернии, включающая крестьянские и мещанские семьи.',
      format: 'PDF',
      accessLevel: 'Премиум'
    },
    {
      id: 5,
      title: 'Дворянская родословная книга Орловской губернии',
      category: 'Дворянские родословные',
      date: '1820-1917',
      description: 'Систематический свод родословных дворянских родов Орловской губернии с указанием чинов, наград и владений.',
      format: 'PDF',
      accessLevel: 'Премиум'
    },
    {
      id: 6,
      title: 'Фотоальбом «Русская деревня начала XX века»',
      category: 'Исторические фотографии',
      date: '1901-1910',
      description: 'Коллекция фотографий повседневной жизни крестьян в различных губерниях России.',
      format: 'JPEG',
      accessLevel: 'Публичный'
    },
  ];
  
  const filteredDocuments = archiveDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Цифровой архив</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Исследуйте исторические документы для поиска информации о ваших предках. 
            Доступ к оцифрованным архивам поможет прояснить родственные связи и узнать больше о своих корнях.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по архивам (например, 'метрические книги', 'фамилия'...)"
              className="pl-10 pr-4 py-6 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 flex justify-start overflow-x-auto">
            <TabsTrigger value="all">Все документы</TabsTrigger>
            {archiveCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name} <span className="ml-2 opacity-60">({category.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Результаты поиска</h2>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Фильтры
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDocuments.map(doc => (
                <Card key={doc.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{doc.title}</CardTitle>
                        <CardDescription className="mt-1">{doc.category} • {doc.date}</CardDescription>
                      </div>
                      {doc.format === 'PDF' ? (
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      ) : doc.format === 'JPEG' ? (
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <Book className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${
                      doc.accessLevel === 'Публичный' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.accessLevel}
                    </span>
                    <Button variant="secondary" size="sm">Просмотр</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Документы не найдены</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска или выбрать другую категорию.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Остальные вкладки по категориям */}
          {archiveCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {archiveDocuments
                  .filter(doc => doc.category === category.name)
                  .map(doc => (
                    <Card key={doc.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{doc.title}</CardTitle>
                            <CardDescription className="mt-1">{doc.category} • {doc.date}</CardDescription>
                          </div>
                          {doc.format === 'PDF' ? (
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          ) : doc.format === 'JPEG' ? (
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <Book className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <span className={`text-xs px-2 py-1 rounded ${
                          doc.accessLevel === 'Публичный' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {doc.accessLevel}
                        </span>
                        <Button variant="secondary" size="sm">Просмотр</Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Archives;
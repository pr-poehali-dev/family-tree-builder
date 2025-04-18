import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArchiveIcon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Откройте историю <span className="text-primary">своей семьи</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              Сервис «Семейные корни» поможет вам создать подробное семейное древо, 
              сохранить важные воспоминания и открыть новые страницы истории вашего рода.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/create-tree">
                  Построить древо
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/archives">
                  <ArchiveIcon className="mr-2 h-5 w-5" />
                  Найти предка
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full aspect-square md:aspect-[4/5] relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-lg"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="family-tree-visual w-[90%] h-[90%] relative">
                  <div className="interactive-node absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                w-20 h-20 bg-background border-2 border-primary rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:scale-110 transition-transform duration-300
                                shadow-lg z-30">
                    <span className="font-medium text-center">Вы</span>
                  </div>
                  
                  {/* Родители */}
                  <div className="interactive-node absolute top-[15%] left-[35%] transform -translate-x-1/2 -translate-y-1/2
                                w-16 h-16 bg-background border-2 border-primary/80 rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:scale-110 transition-transform duration-300
                                shadow-md z-20">
                    <span className="font-medium text-sm">Мама</span>
                  </div>
                  
                  <div className="interactive-node absolute top-[15%] left-[65%] transform -translate-x-1/2 -translate-y-1/2
                                w-16 h-16 bg-background border-2 border-primary/80 rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:scale-110 transition-transform duration-300
                                shadow-md z-20">
                    <span className="font-medium text-sm">Папа</span>
                  </div>
                  
                  {/* Прародители */}
                  <div className="interactive-node absolute top-[5%] left-[25%] transform -translate-x-1/2 -translate-y-1/2
                                w-12 h-12 bg-background border border-primary/60 rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:scale-110 transition-transform duration-300
                                shadow-sm z-10">
                    <span className="font-medium text-xs">Бабушка</span>
                  </div>
                  
                  <div className="interactive-node absolute top-[5%] left-[45%] transform -translate-x-1/2 -translate-y-1/2
                                w-12 h-12 bg-background border border-primary/60 rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:scale-110 transition-transform duration-300
                                shadow-sm z-10">
                    <span className="font-medium text-xs">Дедушка</span>
                  </div>
                  
                  <div className="interactive-node absolute top-[5%] left-[55%] transform -translate-x-1/2 -translate-y-1/2
                                w-12 h-12 bg-background border border-primary/60 rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:scale-110 transition-transform duration-300
                                shadow-sm z-10">
                    <span className="font-medium text-xs">Бабушка</span>
                  </div>
                  
                  <div className="interactive-node absolute top-[5%] left-[75%] transform -translate-x-1/2 -translate-y-1/2
                                w-12 h-12 bg-background border border-primary/60 rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:scale-110 transition-transform duration-300
                                shadow-sm z-10">
                    <span className="font-medium text-xs">Дедушка</span>
                  </div>
                  
                  {/* Линии связей */}
                  <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Линии к родителям */}
                    <path d="M50,50 L35,15" stroke="currentColor" className="text-primary/60" strokeWidth="1" fill="none" />
                    <path d="M50,50 L65,15" stroke="currentColor" className="text-primary/60" strokeWidth="1" fill="none" />
                    
                    {/* Линии к прародителям */}
                    <path d="M35,15 L25,5" stroke="currentColor" className="text-primary/40" strokeWidth="0.75" fill="none" />
                    <path d="M35,15 L45,5" stroke="currentColor" className="text-primary/40" strokeWidth="0.75" fill="none" />
                    <path d="M65,15 L55,5" stroke="currentColor" className="text-primary/40" strokeWidth="0.75" fill="none" />
                    <path d="M65,15 L75,5" stroke="currentColor" className="text-primary/40" strokeWidth="0.75" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Декоративные элементы */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;
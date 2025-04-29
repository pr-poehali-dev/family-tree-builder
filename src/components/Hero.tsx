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
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-lg"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="family-tree-visual w-[90%] h-[90%] relative bg-[#F5F1EC] rounded-lg p-4">
                  {/* Визуализация древа с кругами */}
                  
                  {/* Главная персона (Вы) */}
                  <div className="absolute left-1/2 bottom-[20%] transform -translate-x-1/2">
                    <div className="w-20 h-20 rounded-full bg-white border border-[#D9A799] shadow-sm flex items-center justify-center">
                      <div className="text-[#2F5542] font-medium">Вы</div>
                    </div>
                  </div>
                  
                  {/* Родители */}
                  <div className="absolute left-[30%] bottom-[50%] transform -translate-x-1/2">
                    <div className="w-20 h-20 rounded-full bg-white border border-[#D9A799] shadow-sm flex items-center justify-center">
                      <div className="text-[#2F5542] font-medium">Мама</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[70%] bottom-[50%] transform -translate-x-1/2">
                    <div className="w-20 h-20 rounded-full bg-white border border-[#D9A799] shadow-sm flex items-center justify-center">
                      <div className="text-[#2F5542] font-medium">Папа</div>
                    </div>
                  </div>
                  
                  {/* Бабушки и дедушки */}
                  <div className="absolute left-[15%] top-[15%] transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-white border border-[#D9A799] shadow-sm flex items-center justify-center">
                      <div className="text-[#2F5542] font-medium text-xs">Бабушка</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[38%] top-[15%] transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-white border border-[#D9A799] shadow-sm flex items-center justify-center">
                      <div className="text-[#2F5542] font-medium text-xs">Дедушка</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[62%] top-[15%] transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-white border border-[#D9A799] shadow-sm flex items-center justify-center">
                      <div className="text-[#2F5542] font-medium text-xs">Бабушка</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[85%] top-[15%] transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-white border border-[#D9A799] shadow-sm flex items-center justify-center">
                      <div className="text-[#2F5542] font-medium text-xs">Дедушка</div>
                    </div>
                  </div>
                  
                  {/* Линии связей - согласно изображению */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Линии от бабушек и дедушек к родителям */}
                    <line x1="15%" y1="15%" x2="30%" y2="50%" stroke="#D9A799" strokeWidth="2" />
                    <line x1="38%" y1="15%" x2="30%" y2="50%" stroke="#D9A799" strokeWidth="2" />
                    <line x1="62%" y1="15%" x2="70%" y2="50%" stroke="#D9A799" strokeWidth="2" />
                    <line x1="85%" y1="15%" x2="70%" y2="50%" stroke="#D9A799" strokeWidth="2" />
                    
                    {/* Линии от родителей к главной персоне */}
                    <line x1="30%" y1="50%" x2="50%" y2="80%" stroke="#D9A799" strokeWidth="2" />
                    <line x1="70%" y1="50%" x2="50%" y2="80%" stroke="#D9A799" strokeWidth="2" />
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
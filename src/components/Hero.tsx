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
                  {/* Основная персона (Вы) */}
                  <div className="absolute left-1/2 bottom-[10%] transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 bg-[#FDA4AF] rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 w-5 h-5 bg-white transform rotate-45 translate-x-2.5 -translate-y-2.5"></div>
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-xl">
                          Л
                        </div>
                      </div>
                      <div className="mt-2 text-center text-sm font-medium">Вы</div>
                    </div>
                  </div>
                  
                  {/* Родители */}
                  <div className="absolute left-[35%] bottom-[40%] transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-16 bg-[#FDA4AF] rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 w-4 h-4 bg-white transform rotate-45 translate-x-2 -translate-y-2"></div>
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                          МЛ
                        </div>
                      </div>
                      <div className="mt-2 text-center text-xs font-medium">Мама</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[65%] bottom-[40%] transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-16 bg-[#7DD3FC] rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 w-4 h-4 bg-white transform rotate-45 translate-x-2 -translate-y-2"></div>
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                          ИЛ
                        </div>
                      </div>
                      <div className="mt-2 text-center text-xs font-medium">Папа</div>
                    </div>
                  </div>
                  
                  {/* Бабушки и дедушки */}
                  <div className="absolute left-[25%] bottom-[70%] transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="relative w-12 h-12 bg-[#FDA4AF] rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 w-3 h-3 bg-white transform rotate-45 translate-x-1.5 -translate-y-1.5"></div>
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                          ТЛ
                        </div>
                      </div>
                      <div className="mt-1 text-center text-[10px] font-medium">Бабушка</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[45%] bottom-[70%] transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="relative w-12 h-12 bg-[#7DD3FC] rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 w-3 h-3 bg-white transform rotate-45 translate-x-1.5 -translate-y-1.5"></div>
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                          ЕЛ
                        </div>
                      </div>
                      <div className="mt-1 text-center text-[10px] font-medium">Дедушка</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[55%] bottom-[70%] transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="relative w-12 h-12 bg-[#FDA4AF] rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 w-3 h-3 bg-white transform rotate-45 translate-x-1.5 -translate-y-1.5"></div>
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                          АК
                        </div>
                      </div>
                      <div className="mt-1 text-center text-[10px] font-medium">Бабушка</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-[75%] bottom-[70%] transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="relative w-12 h-12 bg-[#7DD3FC] rounded-md overflow-hidden">
                        <div className="absolute top-0 right-0 w-3 h-3 bg-white transform rotate-45 translate-x-1.5 -translate-y-1.5"></div>
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                          ПК
                        </div>
                      </div>
                      <div className="mt-1 text-center text-[10px] font-medium">Дедушка</div>
                    </div>
                  </div>
                  
                  {/* Линии связей */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Горизонтальная линия между родителями */}
                    <line x1="35" y1="60" x2="65" y2="60" stroke="#cccccc" strokeWidth="1" />
                    
                    {/* Вертикальная линия вниз к основной персоне */}
                    <line x1="50" y1="60" x2="50" y2="90" stroke="#cccccc" strokeWidth="1" />
                    
                    {/* Горизонтальные линии между бабушками/дедушками */}
                    <line x1="25" y1="30" x2="45" y2="30" stroke="#cccccc" strokeWidth="1" />
                    <line x1="55" y1="30" x2="75" y2="30" stroke="#cccccc" strokeWidth="1" />
                    
                    {/* Вертикальные линии вниз к родителям */}
                    <line x1="35" y1="30" x2="35" y2="60" stroke="#cccccc" strokeWidth="1" />
                    <line x1="65" y1="30" x2="65" y2="60" stroke="#cccccc" strokeWidth="1" />
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
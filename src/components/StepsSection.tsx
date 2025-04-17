import { Check } from 'lucide-react';

const StepsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Как это работает
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Три простых шага для начала работы с вашей семейной историей
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
              <span className="text-2xl">1</span>
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Регистрация</h3>
            <p>Создайте бесплатный аккаунт, чтобы начать работу с родословной</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
              <span className="text-2xl">2</span>
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Создание дерева</h3>
            <p>Начните с добавления себя и ближайших родственников</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
              <span className="text-2xl">3</span>
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Расширение</h3>
            <p>Постепенно добавляйте информацию, фотографии и документы</p>
          </div>
        </div>
        
        <div className="mt-16 bg-muted rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl font-bold mb-4 text-center">
            Что вы получаете
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start gap-2">
              <Check className="text-primary mt-1" size={20} />
              <span>Полное генеалогическое древо</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary mt-1" size={20} />
              <span>Защищенное хранилище для фотографий</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary mt-1" size={20} />
              <span>Инструменты архивного поиска</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary mt-1" size={20} />
              <span>Обучающие материалы</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary mt-1" size={20} />
              <span>Возможность совместного редактирования</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary mt-1" size={20} />
              <span>Экспорт и печать результатов</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
import { GitBranch, Database, Users, FileCog, Camera, Share2 } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <GitBranch className="w-10 h-10 text-primary" />,
      title: "Интерактивное древо",
      description: "Создавайте наглядное семейное древо с удобным редактированием связей и перемещением узлов."
    },
    {
      icon: <Database className="w-10 h-10 text-primary" />,
      title: "Цифровой архив",
      description: "Доступ к оцифрованным историческим документам для глубокого исследования своих корней."
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Совместная работа",
      description: "Приглашайте родственников для совместного заполнения и редактирования семейного древа."
    },
    {
      icon: <FileCog className="w-10 h-10 text-primary" />,
      title: "Импорт/Экспорт",
      description: "Загружайте данные из популярных генеалогических форматов или экспортируйте свое древо."
    },
    {
      icon: <Camera className="w-10 h-10 text-primary" />,
      title: "Медиа-галерея",
      description: "Храните и систематизируйте фотографии, документы и памятные записи для каждого члена семьи."
    },
    {
      icon: <Share2 className="w-10 h-10 text-primary" />,
      title: "Гибкие настройки доступа",
      description: "Выбирайте, кто может просматривать или редактировать ваше древо – от полной приватности до публичного доступа."
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Преимущества «Семейные корни»</h2>
          <p className="text-lg text-muted-foreground">
            Наш сервис предлагает все необходимые инструменты для создания подробной 
            семейной истории и сохранения важных воспоминаний о ваших предках.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <div className="mb-4 group">
                <div className="p-2 inline-block rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
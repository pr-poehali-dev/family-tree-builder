import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Начните сохранять семейную историю уже сегодня
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Создайте бесплатный аккаунт и получите доступ ко всем инструментам для исследования и сохранения вашей родословной
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="hero-button">
              <Link to="/signup">Зарегистрироваться</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hero-button-outline">
              <Link to="/demo">Посмотреть демо</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
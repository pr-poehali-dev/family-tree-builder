import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Декоративный фоновый элемент */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[url('/placeholder.svg')] bg-no-repeat bg-center bg-contain"></div>
      
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Сохраните историю вашей семьи
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Создайте цифровое древо, исследуйте архивы и делитесь воспоминаниями с близкими.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="hero-button">
              <Link to="/signup">Начать бесплатно</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hero-button-outline">
              <Link to="/about">Узнать больше</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
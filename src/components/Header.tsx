import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full">
            <span className="text-secondary-foreground font-heading text-xl">🌳</span>
          </div>
          <span className="font-heading text-xl font-medium">Семейные корни</span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">Главная</Link>
          <Link to="/create" className="font-medium hover:text-primary transition-colors">Создать древо</Link>
          <Link to="/education" className="font-medium hover:text-primary transition-colors">Обучение</Link>
          <Link to="/demo" className="font-medium hover:text-primary transition-colors">Демо</Link>
          <Link to="/archives" className="font-medium hover:text-primary transition-colors">Архивы</Link>
          <Link to="/support" className="font-medium hover:text-primary transition-colors">Поддержка</Link>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/signup">Регистрация</Link>
            </Button>
            <Button asChild variant="default">
              <Link to="/login">Войти</Link>
            </Button>
          </div>
        </nav>

        {/* Мобильное меню */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Мобильное меню раскрытое */}
      {mobileMenuOpen && (
        <div className="md:hidden container mx-auto mt-4 pb-4">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium hover:text-primary transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/create" 
              className="font-medium hover:text-primary transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Создать древо
            </Link>
            <Link 
              to="/education" 
              className="font-medium hover:text-primary transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Обучение
            </Link>
            <Link 
              to="/demo" 
              className="font-medium hover:text-primary transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Демо
            </Link>
            <Link 
              to="/archives" 
              className="font-medium hover:text-primary transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Архивы
            </Link>
            <Link 
              to="/support" 
              className="font-medium hover:text-primary transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Поддержка
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button asChild variant="outline">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Регистрация</Link>
              </Button>
              <Button asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Войти</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
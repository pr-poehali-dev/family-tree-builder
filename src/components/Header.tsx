
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetTrigger, Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu, Home, Users, BookOpen, Archive, HelpCircle, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Icon from '@/components/ui/icon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  // Эффект для отслеживания прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Навигационные ссылки для повторного использования
  const navLinks = [
    { to: "/", text: "Главная", icon: "Home" },
    { to: "/create-tree", text: "Создать древо", icon: "Users" },
    { to: "/education", text: "Обучение", icon: "BookOpen" },
    { to: "/archives", text: "Архивы", icon: "Archive" },
    { to: "/support", text: "Поддержка", icon: "HelpCircle" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-200
      ${scrolled 
        ? 'border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm' 
        : 'border-transparent bg-background/0'}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="font-bold text-2xl text-primary transition-colors hover:text-primary/80">
            FamilyTree
          </NavLink>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-base font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
                  isActive ? "text-primary" : "text-foreground/60"
                }`
              }
            >
              <Icon name={link.icon} size={18} className="opacity-70" />
              {link.text}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/profile">
            <Button variant="ghost" size="icon" aria-label="Профиль">
              <Icon name="UserCircle" size={20} />
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button variant="outline">Войти</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button>Регистрация</Button>
          </NavLink>
        </div>

        {/* Mobile menu trigger */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors hover:text-primary flex items-center gap-2 p-2 rounded-md ${
                      isActive ? "text-primary bg-primary/10" : "text-foreground/60"
                    }`
                  }
                >
                  <Icon name={link.icon} size={18} />
                  {link.text}
                </NavLink>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <NavLink to="/profile" onClick={closeMenu} className="mb-2">
                  <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
                    <Icon name="UserCircle" size={18} />
                    Профиль
                  </Button>
                </NavLink>
                <NavLink to="/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">Войти</Button>
                </NavLink>
                <NavLink to="/signup" onClick={closeMenu}>
                  <Button className="w-full">Регистрация</Button>
                </NavLink>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

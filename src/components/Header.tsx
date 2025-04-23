
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetTrigger, Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="font-bold text-2xl text-primary">
            FamilyTree
          </NavLink>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-foreground/60"
              }`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/create-tree"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-foreground/60"
              }`
            }
          >
            Создать древо
          </NavLink>
          <NavLink
            to="/education"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-foreground/60"
              }`
            }
          >
            Обучение
          </NavLink>
          <NavLink
            to="/archives"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-foreground/60"
              }`
            }
          >
            Архивы
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `text-base font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-foreground/60"
              }`
            }
          >
            Поддержка
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
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
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/60"
                  }`
                }
              >
                Главная
              </NavLink>
              <NavLink
                to="/create-tree"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/60"
                  }`
                }
              >
                Создать древо
              </NavLink>
              <NavLink
                to="/education"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/60"
                  }`
                }
              >
                Обучение
              </NavLink>
              <NavLink
                to="/archives"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/60"
                  }`
                }
              >
                Архивы
              </NavLink>
              <NavLink
                to="/support"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/60"
                  }`
                }
              >
                Поддержка
              </NavLink>
              <div className="flex flex-col gap-2 mt-4">
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

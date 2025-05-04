
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-secondary/10 py-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-primary">FamilyTree</h3>
            <p className="text-muted-foreground text-sm">
              Создавайте, исследуйте и сохраняйте свою семейную историю для будущих поколений.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" aria-label="Вконтакте">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.802 12.298c-.012-.012-.023-.024-.033-.037l-.01-.015c-.295-.415-.873-1.245-1.642-2.203l-.035-.035-.017-.015c-.367-.367-.567-.614-.6-.74-.05-.205.012-.368.183-.6.286-.367.53-.68.797-.95.228-.228.464-.476.673-.74l.05-.067c.756-.945 1.3-1.7 1.575-2.306.16-.25.192-.43.192-.6 0-.183-.1-.34-.25-.43-.106-.057-.228-.08-.368-.08h-2.42c-.228 0-.32.023-.43.023-.183 0-.32.08-.43.205-.205.25-.45.756-.863 1.465-.32.55-.654 1.075-.956 1.53-.143.227-.297.432-.45.614-.153.182-.286.273-.404.273-.08 0-.148-.037-.217-.103-.137-.193-.205-.388-.205-.683V5.95c0-.227-.012-.41-.023-.57-.012-.147-.04-.284-.08-.397-.05-.114-.126-.23-.24-.296C13.16 4.573 13.035 4.55 12.9 4.55H10.57c-.12 0-.25.023-.367.058-.08.023-.15.07-.205.114-.058.058-.07.092-.047.115.205.068.365.228.47.432.126.25.184.524.193.84.034.568.034 1.075 0 1.54-.012.16-.035.296-.058.41-.023.114-.058.205-.103.272-.045.07-.08.115-.103.16-.023.034-.035.045-.035.045-.07.023-.13.035-.205.035-.08 0-.172-.035-.274-.103-.147-.114-.282-.25-.403-.43-.228-.295-.433-.63-.65-1-.114-.205-.24-.454-.366-.738l-.115-.25-.16-.32c-.104-.228-.297-.342-.582-.342l-2.306.01c-.25 0-.41.068-.467.204-.023.08-.023.16 0 .25l.01.013c.35.568.726 1.124 1.16 1.7.44.565.857 1.05 1.253 1.47l.563.636c.217.228.423.467.63.705.205.227.41.443.615.648l.217.194c.16.16.353.342.582.546.228.205.48.41.745.603.274.194.593.353.94.48.36.136.7.19 1.047.17h.833c.16-.01.297-.057.387-.136l.023-.024c.023-.023.046-.057.058-.08.012-.036.023-.07.035-.115.07-.16.114-.342.126-.546.023-.34.035-.635.058-.88.012-.115.046-.228.08-.33.035-.09.08-.157.115-.203.011-.023.022-.035.022-.045.068-.07.126-.115.217-.127.046-.11.091 0 .148.034.1.034.16.08.205.137.124.114.246.25.358.386.102.15.24.32.423.532.172.205.32.365.455.478l.136.114c.114.102.24.16.365.193.136.035.228.045.296.035l2.453-.035c.172 0 .32-.012.422-.047.114-.034.183-.068.217-.114.068-.092.068-.195.034-.318-.023-.137-.092-.275-.194-.432z"/>
                </svg>
              </Button>
              <Button size="icon" variant="ghost" aria-label="Телеграм">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.7988 4.30005L3.33211 9.23839C2.11638 9.73172 2.12304 10.3984 3.10101 10.7051L6.31026 11.6684L13.7142 6.85839C14.1625 6.58339 14.5725 6.73172 14.2346 7.03339L8.25268 12.4734H8.25026L8.25268 12.4746L8.01347 15.7884C8.42822 15.7884 8.61493 15.5917 8.85655 15.3609L10.4183 13.8467L13.6692 16.2659C14.4746 16.7109 15.0509 16.4809 15.2529 15.7901L17.7817 5.55839C18.0838 4.69505 17.3504 4.15839 15.7988 4.30005Z"/>
                </svg>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink to="/create-tree" className="text-muted-foreground hover:text-primary transition-colors">
                  Создать древо
                </NavLink>
              </li>
              <li>
                <NavLink to="/education" className="text-muted-foreground hover:text-primary transition-colors">
                  Обучение
                </NavLink>
              </li>
              <li>
                <NavLink to="/archives" className="text-muted-foreground hover:text-primary transition-colors">
                  Архивы
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Помощь
                </NavLink>
              </li>
              <li>
                <NavLink to="/support#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Часто задаваемые вопросы
                </NavLink>
              </li>
              <li>
                <NavLink to="/support#tutorials" className="text-muted-foreground hover:text-primary transition-colors">
                  Уроки
                </NavLink>
              </li>
              <li>
                <NavLink to="/support#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Связаться с нами
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Аккаунт</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Войти
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Регистрация
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Профиль
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FamilyTree. Все права защищены.
          </p>
          <div className="flex gap-4">
            <NavLink to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </NavLink>
            <NavLink to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Условия использования
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

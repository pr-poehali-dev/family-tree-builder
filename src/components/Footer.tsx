import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-xl mb-4">СемьяДрево</h3>
            <p className="text-secondary-foreground/80 mb-4">
              Платформа для сохранения семейной истории и создания родословных древ.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-accent transition-colors">Главная</Link></li>
              <li><Link to="/create" className="hover:text-accent transition-colors">Создать древо</Link></li>
              <li><Link to="/education" className="hover:text-accent transition-colors">Обучение</Link></li>
              <li><Link to="/archives" className="hover:text-accent transition-colors">Архивы</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-accent transition-colors">Часто задаваемые вопросы</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Связаться с нами</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Условия использования</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Контакты</h4>
            <p className="text-secondary-foreground/80 mb-2">Электронная почта: info@semyadrevo.ru</p>
            <p className="text-secondary-foreground/80 mb-4">Телефон: +7 (800) 123-45-67</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Вконтакте">
                🌐
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Telegram">
                📱
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="YouTube">
                📺
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center text-secondary-foreground/60">
          <p>© 2024 СемьяДрево. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
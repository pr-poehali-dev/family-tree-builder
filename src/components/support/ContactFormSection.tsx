import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const ContactFormSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки сообщения
    alert('Сообщение отправлено! Мы ответим вам в ближайшее время.');
    setName('');
    setEmail('');
    setMessage('');
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Обратная связь</CardTitle>
          <CardDescription>
            Отправьте нам сообщение, и мы ответим вам в течение 24 часов.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Ваше имя
                  </label>
                  <Input
                    id="name"
                    placeholder="Иван Петров"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Электронная почта
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Ваше сообщение
                </label>
                <Textarea
                  id="message"
                  placeholder="Опишите вашу проблему или вопрос подробно..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="mt-6 w-full">
              Отправить сообщение
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <ContactInfoCards />
    </>
  );
};

const ContactInfoCards = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Электронная почта
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Для вопросов общего характера:
          </p>
          <p className="font-medium mt-1">support@semeynyekorni.ru</p>
          
          <p className="text-muted-foreground mt-4">
            Для технической поддержки:
          </p>
          <p className="font-medium mt-1">help@semeynyekorni.ru</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Телефон поддержки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Горячая линия (пн-пт, 10:00-19:00 МСК):
          </p>
          <p className="font-medium mt-1">+7 (800) 123-45-67</p>
          
          <p className="text-muted-foreground mt-4">
            WhatsApp для быстрой связи:
          </p>
          <p className="font-medium mt-1">+7 (900) 123-45-67</p>
        </CardContent>
      </Card>
    </div>
  );
};

import { useState } from 'react';
import { MessageSquare, HelpCircle, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQSection } from '@/components/support/FAQSection';
import { ContactFormSection } from '@/components/support/ContactFormSection';
import { TutorialsSection } from '@/components/support/TutorialsSection';

const Support = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Поддержка пользователей</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Получите помощь по работе с сервисом «Семейные корни». Мы стремимся сделать ваше исследование 
            семейной истории максимально комфортным и информативным.
          </p>
        </div>
        
        <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              Частые вопросы
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="mr-2 h-4 w-4" />
              Контактная форма
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              <ArrowRight className="mr-2 h-4 w-4" />
              Обучающие материалы
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <FAQSection />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactFormSection />
          </TabsContent>
          
          <TabsContent value="tutorials">
            <TutorialsSection />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;

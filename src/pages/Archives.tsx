import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArchiveHeader from '@/components/archives/ArchiveHeader';
import CategoryTabs from '@/components/archives/CategoryTabs';
import { archiveCategories, archiveDocuments } from '@/data/archiveData';

/**
 * Страница цифрового архива с историческими документами
 * 
 * Компонент разделен на несколько модулей:
 * - ArchiveHeader - заголовок и строка поиска
 * - CategoryTabs - табы категорий документов
 * - DocumentsGrid - сетка карточек документов
 * - DocumentCard - карточка отдельного документа
 */
const Archives = () => {
  // Состояние для хранения поискового запроса
  const [searchQuery, setSearchQuery] = useState('');
  
  // Фильтрация документов по поисковому запросу
  const filteredDocuments = archiveDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8">
        {/* Заголовок страницы и строка поиска */}
        <ArchiveHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        {/* Табы категорий и список документов */}
        <CategoryTabs 
          categories={archiveCategories}
          documents={archiveDocuments}
          filteredDocuments={filteredDocuments}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Archives;

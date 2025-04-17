import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentsGrid from './DocumentsGrid';
import { ArchiveCategory, ArchiveDocument } from '@/types/archive';

interface CategoryTabsProps {
  categories: ArchiveCategory[];
  documents: ArchiveDocument[];
  filteredDocuments: ArchiveDocument[];
}

const CategoryTabs = ({ categories, documents, filteredDocuments }: CategoryTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-8 flex justify-start overflow-x-auto">
        <TabsTrigger value="all">Все документы</TabsTrigger>
        {categories.map(category => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.name} <span className="ml-2 opacity-60">({category.count})</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all" className="mt-6">
        <DocumentsGrid documents={filteredDocuments} showFilter={true} />
      </TabsContent>
      
      {categories.map(category => (
        <TabsContent key={category.id} value={category.id}>
          <DocumentsGrid 
            documents={documents.filter(doc => doc.category === category.name)} 
            categoryName={category.name} 
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;

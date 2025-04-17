import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentCard from './DocumentCard';
import { ArchiveDocument } from '@/types/archive';

interface DocumentsGridProps {
  documents: ArchiveDocument[];
  showFilter?: boolean;
  categoryName?: string;
}

const DocumentsGrid = ({ documents, showFilter = false, categoryName }: DocumentsGridProps) => {
  return (
    <>
      {showFilter && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Результаты поиска</h2>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
        </div>
      )}
      
      {categoryName && (
        <h2 className="text-2xl font-bold mb-6">{categoryName}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map(document => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
      
      {documents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Документы не найдены</h3>
          <p className="text-muted-foreground">
            Попробуйте изменить параметры поиска или выбрать другую категорию.
          </p>
        </div>
      )}
    </>
  );
};

export default DocumentsGrid;

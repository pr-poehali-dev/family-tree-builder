import { FileText, Book, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArchiveDocument } from '@/types/archive';

interface DocumentCardProps {
  document: ArchiveDocument;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return <FileText className="h-6 w-6 text-muted-foreground" />;
      case 'JPEG':
        return <BookOpen className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Book className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getAccessLevelBadgeClass = (accessLevel: string) => {
    return accessLevel === 'Публичный' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-amber-100 text-amber-800';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{document.title}</CardTitle>
            <CardDescription className="mt-1">{document.category} • {document.date}</CardDescription>
          </div>
          {getFormatIcon(document.format)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{document.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className={`text-xs px-2 py-1 rounded ${getAccessLevelBadgeClass(document.accessLevel)}`}>
          {document.accessLevel}
        </span>
        <Button variant="secondary" size="sm">Просмотр</Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;

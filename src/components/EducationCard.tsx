import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EducationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  duration?: string;
  badge?: string;
  onClick?: () => void;
}

const EducationCard = ({ 
  icon, 
  title, 
  description, 
  duration, 
  badge,
  onClick 
}: EducationCardProps) => {
  return (
    <Card 
      className="h-full cursor-pointer hover:shadow-md transition-all overflow-hidden flex flex-col" 
      onClick={onClick}
    >
      <CardHeader className="relative pb-0">
        <div className="rounded-md bg-muted mb-4 overflow-hidden aspect-video flex items-center justify-center text-4xl">
          {icon}
        </div>
        <CardTitle className="font-heading">{title}</CardTitle>
        {badge && (
          <Badge variant="secondary" className="absolute top-4 right-4">
            {badge}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      {duration && (
        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          <span>{duration}</span>
        </CardFooter>
      )}
    </Card>
  );
};

export default EducationCard;
import { Person } from '@/types/person';

interface ConnectionLinesProps {
  people: Person[];
}

const ConnectionLines = ({ people }: ConnectionLinesProps) => {
  // Функция для поиска родителей персоны по ID
  const findParents = (personId: string) => {
    return people.filter(p => p.childrenIds?.includes(personId));
  };
  
  // Получаем центр узла для линий
  const getNodeCenter = (person: Person) => {
    const nodeSize = 24; // примерный радиус узла
    return {
      x: (person.x || 0) + nodeSize,
      y: (person.y || 0) + nodeSize
    };
  };
  
  // Функция для отрисовки линий связей между людьми
  const renderConnectionLines = () => {
    const lines: JSX.Element[] = [];
    const processedConnections = new Set<string>();
    
    people.forEach(person => {
      if (person.childrenIds) {
        // Для каждого ребенка этого человека
        person.childrenIds.forEach(childId => {
          const child = people.find(p => p.id === childId);
          if (child && child.x !== undefined && child.y !== undefined && 
              person.x !== undefined && person.y !== undefined) {
            
            // Создаем уникальный ключ для соединения
            const connectionKey = [person.id, childId].sort().join('-');
            
            if (!processedConnections.has(connectionKey)) {
              processedConnections.add(connectionKey);
              
              const parentCenter = getNodeCenter(person);
              const childCenter = getNodeCenter(child);
              
              // Отрисовка прямой линии от родителя к ребенку
              lines.push(
                <line 
                  key={`d-${person.id}-${childId}`}
                  x1={parentCenter.x}
                  y1={parentCenter.y}
                  x2={childCenter.x}
                  y2={childCenter.y}
                  stroke="#D9A799"
                  strokeWidth="2"
                />
              );
            }
          }
        });
      }
    });
    
    return lines;
  };

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {renderConnectionLines()}
    </svg>
  );
};

export default ConnectionLines;

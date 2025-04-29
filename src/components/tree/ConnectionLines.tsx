import { Person } from '@/types/person';

interface ConnectionLinesProps {
  people: Person[];
}

const ConnectionLines = ({ people }: ConnectionLinesProps) => {
  // Функция для поиска родителей персоны по ID
  const findParents = (personId: string) => {
    return people.filter(p => p.childrenIds?.includes(personId));
  };
  
  // Получаем центр узла (для линий, идущих из центра)
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
              
              // Находим всех родителей ребенка
              const parents = findParents(childId);
              
              if (parents.length === 2) {
                // Если два родителя, обрабатываем их вместе
                const parent1 = parents[0];
                const parent2 = parents[1];
                
                if (parent1.x !== undefined && parent1.y !== undefined && 
                    parent2.x !== undefined && parent2.y !== undefined) {
                  
                  const parent1Center = getNodeCenter(parent1);
                  const parent2Center = getNodeCenter(parent2);
                  const childCenter = getNodeCenter(child);
                  
                  // Прямые линии от родителей к ребенку
                  lines.push(
                    <line 
                      key={`d-${parent1.id}-${childId}`}
                      x1={parent1Center.x}
                      y1={parent1Center.y}
                      x2={childCenter.x}
                      y2={childCenter.y}
                      stroke="#D9A799"
                      strokeWidth="1"
                    />
                  );
                  
                  lines.push(
                    <line 
                      key={`d-${parent2.id}-${childId}`}
                      x1={parent2Center.x}
                      y1={parent2Center.y}
                      x2={childCenter.x}
                      y2={childCenter.y}
                      stroke="#D9A799"
                      strokeWidth="1"
                    />
                  );
                }
              } else if (parents.length === 1) {
                // Если один родитель, рисуем прямую линию от родителя к ребенку
                const parentCenter = getNodeCenter(person);
                const childCenter = getNodeCenter(child);
                
                lines.push(
                  <line 
                    key={`d-${person.id}-${childId}`}
                    x1={parentCenter.x}
                    y1={parentCenter.y}
                    x2={childCenter.x}
                    y2={childCenter.y}
                    stroke="#D9A799"
                    strokeWidth="1"
                  />
                );
              }
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

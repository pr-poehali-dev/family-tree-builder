import { useState, useRef, useEffect } from 'react';
import TreeNode from '@/components/TreeNode';
import { Person, RelationType } from '@/types/person';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface TreeCanvasProps {
  people: Person[];
  onSelectPerson: (person: Person) => void;
  onAddRelative: (personId: string, relationType: RelationType) => void;
}

const TreeCanvas = ({ people, onSelectPerson, onAddRelative }: TreeCanvasProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 2));
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener('wheel', handleWheel as any, { passive: false });
      
      return () => {
        canvasRef.current?.removeEventListener('wheel', handleWheel as any);
      };
    }
  }, []);
  
  // Функция для поиска родителей персоны по ID
  const findParents = (personId: string) => {
    return people.filter(p => p.childrenIds?.includes(personId));
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
                // Если два родителя, рисуем горизонтальную линию между ними
                const parent1 = parents[0];
                const parent2 = parents[1];
                
                if (parent1.x !== undefined && parent1.y !== undefined && 
                    parent2.x !== undefined && parent2.y !== undefined) {
                  
                  // Определяем порядок родителей (слева направо)
                  const [leftParent, rightParent] = parent1.x < parent2.x ? [parent1, parent2] : [parent2, parent1];
                  
                  // Горизонтальная линия между родителями
                  lines.push(
                    <line 
                      key={`h-${leftParent.id}-${rightParent.id}`}
                      x1={leftParent.x + 12}
                      y1={leftParent.y + 12}
                      x2={rightParent.x + 12}
                      y2={rightParent.y + 12}
                      stroke="#D9A799"
                      strokeWidth="2"
                    />
                  );
                  
                  // Центральная вертикальная линия вниз
                  const centerX = (leftParent.x + rightParent.x) / 2 + 12;
                  lines.push(
                    <line 
                      key={`v-${leftParent.id}-${rightParent.id}-${child.id}`}
                      x1={centerX}
                      y1={leftParent.y + 12}
                      x2={child.x + 12}
                      y2={child.y - 12}
                      stroke="#D9A799"
                      strokeWidth="2"
                    />
                  );
                }
              } else if (parents.length === 1) {
                // Если один родитель, рисуем прямую вертикальную линию
                lines.push(
                  <line 
                    key={`v-${person.id}-${childId}`}
                    x1={person.x + 12}
                    y1={person.y + 12}
                    x2={child.x + 12}
                    y2={child.y - 12}
                    stroke="#D9A799"
                    strokeWidth="2"
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
    <div 
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden bg-[#F5F1EC] cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="absolute"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.1s ease',
        }}
      >
        {/* Канва с семейным древом */}
        <div className="relative min-w-[1200px] min-h-[800px]">
          {/* Линии связей между узлами */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {renderConnectionLines()}
          </svg>
          
          {/* Узлы людей */}
          {people.map(person => (
            <div 
              key={person.id}
              style={{ 
                position: 'absolute', 
                left: person.x || 0, 
                top: person.y || 0,
              }}
            >
              <TreeNode 
                person={person} 
                onSelect={onSelectPerson}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Элементы управления */}
      <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-lg p-2 flex gap-2 border border-gray-200">
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
          onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
          title="Увеличить"
        >
          <ZoomIn size={18} />
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
          title="Уменьшить"
        >
          <ZoomOut size={18} />
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          title="Сбросить масштаб"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};

export default TreeCanvas;
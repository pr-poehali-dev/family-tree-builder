import { useState, useRef, useEffect } from 'react';
import TreeNode from '@/components/TreeNode';
import { Person, RelationType } from '@/types/person';

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
    if (e.button === 0) { // Левая кнопка мыши
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
  
  // Функция для отрисовки линий связей между людьми
  const renderConnectionLines = () => {
    const lines = [];
    const NODE_WIDTH = 75;
    const NODE_HEIGHT = 100;
    
    // Создаем линии для отображения связей родитель-ребенок
    for (const person of people) {
      // Если у человека есть родители, рисуем линии к родителям
      if (person.parentIds && person.parentIds.length > 0) {
        for (const parentId of person.parentIds) {
          const parent = people.find(p => p.id === parentId);
          if (parent && parent.x !== undefined && parent.y !== undefined && 
              person.x !== undefined && person.y !== undefined) {
            
            // Расчет координат для линии (от центра верха узла-ребенка к центру низа узла-родителя)
            const childX = person.x + NODE_WIDTH/2;
            const childY = person.y;
            const parentX = parent.x + NODE_WIDTH/2;
            const parentY = parent.y + NODE_HEIGHT;
            
            lines.push(
              <path 
                key={`parent-${person.id}-${parentId}`}
                d={`M${childX},${childY} C${childX},${childY-40} ${parentX},${parentY+40} ${parentX},${parentY}`}
                stroke="var(--primary)" 
                fill="none"
                strokeWidth="2"
                strokeOpacity="0.7"
              />
            );
          }
        }
      }
      
      // Если у человека есть дети, но мы еще не отрисовали линии
      if (person.childrenIds && person.childrenIds.length > 0) {
        for (const childId of person.childrenIds) {
          // Проверяем, не было ли уже отрисовано с другой стороны
          const child = people.find(p => p.id === childId);
          const alreadyDrawn = child?.parentIds?.includes(person.id);
          
          if (!alreadyDrawn && child && child.x !== undefined && child.y !== undefined && 
              person.x !== undefined && person.y !== undefined) {
            
            const parentX = person.x + NODE_WIDTH/2;
            const parentY = person.y + NODE_HEIGHT;
            const childX = child.x + NODE_WIDTH/2;
            const childY = child.y;
            
            lines.push(
              <path 
                key={`child-${person.id}-${childId}`}
                d={`M${parentX},${parentY} C${parentX},${parentY+40} ${childX},${childY-40} ${childX},${childY}`}
                stroke="var(--primary)" 
                fill="none"
                strokeWidth="2"
                strokeOpacity="0.7"
              />
            );
          }
        }
      }
      
      // Если у человека есть партнер, рисуем горизонтальную линию
      if (person.partnerId) {
        const partner = people.find(p => p.id === person.partnerId);
        // Проверяем, не была ли уже отрисована линия партнерства
        const alreadyDrawn = partner?.partnerId === person.id && 
                             people.findIndex(p => p.id === partner.id) < people.findIndex(p => p.id === person.id);
        
        if (!alreadyDrawn && partner && partner.x !== undefined && partner.y !== undefined && 
            person.x !== undefined && person.y !== undefined) {
          
          // Определяем, кто левее, чтобы правильно нарисовать линию
          const isPersonLeft = person.x < partner.x;
          const leftPerson = isPersonLeft ? person : partner;
          const rightPerson = isPersonLeft ? partner : person;
          
          const leftX = leftPerson.x + NODE_WIDTH;
          const leftY = leftPerson.y + NODE_HEIGHT/2;
          const rightX = rightPerson.x;
          const rightY = rightPerson.y + NODE_HEIGHT/2;
          
          lines.push(
            <line 
              key={`partner-${person.id}-${partner.id}`}
              x1={leftX}
              y1={leftY}
              x2={rightX}
              y2={rightY}
              stroke="var(--primary)" 
              strokeWidth="2"
              strokeOpacity="0.7"
              strokeDasharray="4"
            />
          );
          
          // Добавим сердечко посередине линии партнерства
          const heartX = (leftX + rightX) / 2;
          const heartY = (leftY + rightY) / 2;
          
          lines.push(
            <text
              key={`heart-${person.id}-${partner.id}`}
              x={heartX}
              y={heartY}
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--primary)"
            >
              ❤️
            </text>
          );
        }
      }
    }
    
    return lines;
  };
  
  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden bg-muted/20 cursor-grab"
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
        {/* Центральное дерево */}
        <div className="relative min-w-[1000px] min-h-[600px]">
          {/* Линии связей между узлами */}
          <svg className="absolute top-0 left-0 w-full h-full">
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
                width: 75, // Фиксированная ширина для узла
                height: 100, // Фиксированная высота для узла
              }}
            >
              <TreeNode 
                person={person} 
                onSelect={onSelectPerson}
                onAddRelative={onAddRelative}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Элементы управления */}
      <div className="absolute bottom-4 right-4 bg-background rounded-md shadow-md p-2 flex gap-2 border border-border">
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md"
          onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
          title="Увеличить"
        >
          +
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md"
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
          title="Уменьшить"
        >
          -
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md"
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          title="Сбросить масштаб"
        >
          ⟳
        </button>
      </div>
    </div>
  );
};

export default TreeCanvas;
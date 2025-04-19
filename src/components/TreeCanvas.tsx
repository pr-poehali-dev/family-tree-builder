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
    const NODE_WIDTH = 180;
    const NODE_HEIGHT = 160;
    
    // Создаем линии для отображения связей родитель-ребенок
    for (const person of people) {
      // Если у человека есть родители, рисуем линии к родителям
      if (person.parentIds && person.parentIds.length > 0) {
        for (const parentId of person.parentIds) {
          const parent = people.find(p => p.id === parentId);
          if (parent && parent.x !== undefined && parent.y !== undefined && 
              person.x !== undefined && person.y !== undefined) {
            
            // Координаты узлов
            const childX = person.x + NODE_WIDTH/2;
            const childY = person.y;
            const parentX = parent.x + NODE_WIDTH/2;
            const parentY = parent.y + NODE_HEIGHT;
            
            // Находим партнеров родителя, если они есть
            const partnerId = parent.partnerId;
            const partner = partnerId ? people.find(p => p.id === partnerId) : null;
            
            if (partner && partner.x !== undefined && partner.y !== undefined) {
              // Если родитель имеет партнера, рисуем соединительные линии через центральную точку
              const partnerX = partner.x + NODE_WIDTH/2;
              
              // Определяем центральную точку между родителями
              const centerX = (parentX + partnerX) / 2;
              const centerY = parentY + 100; // Точка соединения ниже родителей
              
              // Рисуем соединительную линию от ребенка к центральной точке
              lines.push(
                <path 
                  key={`child-to-center-${person.id}-${parent.id}`}
                  d={`M${childX},${childY} C${childX},${childY-70} ${centerX},${centerY+70} ${centerX},${centerY}`}
                  stroke="#C0C0C0" 
                  fill="none"
                  strokeWidth="2"
                />
              );
              
              // Рисуем соединительные линии от центральной точки к обоим родителям
              lines.push(
                <path 
                  key={`center-to-parent1-${parent.id}`}
                  d={`M${centerX},${centerY} C${centerX},${centerY-40} ${parentX},${parentY+40} ${parentX},${parentY}`}
                  stroke="#C0C0C0" 
                  fill="none"
                  strokeWidth="2"
                />
              );
              
              lines.push(
                <path 
                  key={`center-to-parent2-${partner.id}`}
                  d={`M${centerX},${centerY} C${centerX},${centerY-40} ${partnerX},${parentY+40} ${partnerX},${parentY}`}
                  stroke="#C0C0C0" 
                  fill="none"
                  strokeWidth="2"
                />
              );
              
              // Добавляем маленький круг в центральной точке
              lines.push(
                <circle
                  key={`center-dot-${parent.id}-${partner.id}`}
                  cx={centerX}
                  cy={centerY}
                  r={4}
                  fill="#A0A0A0"
                />
              );
            } else {
              // Если у родителя нет партнера, рисуем прямую линию
              lines.push(
                <path 
                  key={`parent-${person.id}-${parentId}`}
                  d={`M${childX},${childY} C${childX},${childY-70} ${parentX},${parentY+70} ${parentX},${parentY}`}
                  stroke="#C0C0C0" 
                  fill="none"
                  strokeWidth="2"
                />
              );
            }
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
          
          // Рисуем соединяющую линию между партнерами
          lines.push(
            <path 
              key={`partner-${person.id}-${partner.id}`}
              d={`M${leftX},${leftY} C${leftX+40},${leftY} ${rightX-40},${rightY} ${rightX},${rightY}`}
              stroke="#C0C0C0" 
              fill="none"
              strokeWidth="2"
            />
          );
        }
      }
    }
    
    return lines;
  };
  
  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden bg-slate-50 cursor-grab"
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
                onAddRelative={onAddRelative}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Элементы управления */}
      <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-2 flex gap-2 border border-gray-200">
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
          onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
          title="Увеличить"
        >
          +
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
          title="Уменьшить"
        >
          -
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
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
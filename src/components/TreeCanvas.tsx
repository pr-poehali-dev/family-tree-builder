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
    
    // Создаем линии для отображения связей
    for (const person of people) {
      // Если узел является главным (по центру), то рисуем другие линии
      const isMainPerson = person.isMainPerson;
      
      // Если у человека есть родители, рисуем линии к родителям
      if (person.parentIds && person.parentIds.length > 0) {
        for (const parentId of person.parentIds) {
          const parent = people.find(p => p.id === parentId);
          if (parent && parent.x !== undefined && parent.y !== undefined && 
              person.x !== undefined && person.y !== undefined) {
            
            // Координаты узлов для расчета линий зависят от типа узла
            const getCoordinates = (node: Person) => {
              if (node.isPlaceholder) {
                return {
                  x: node.x + 60, // Центр круглого плейсхолдера
                  y: node.isPlaceholder ? node.y + 60 : node.y,
                  bottom: node.isPlaceholder ? node.y + 120 : node.y + 150,
                  width: 120,
                  height: 120
                };
              } else if (node.isMainPerson) {
                return {
                  x: node.x + 70, // Центр главного узла
                  y: node.y,
                  bottom: node.y + 140,
                  width: 140,
                  height: 140
                };
              } else {
                return {
                  x: node.x + 90, // Центр обычного узла
                  y: node.y,
                  bottom: node.y + 180,
                  width: 180,
                  height: 180
                };
              }
            };
            
            const childCoords = getCoordinates(person);
            const parentCoords = getCoordinates(parent);
            
            // Рисуем вертикальную линию
            lines.push(
              <path 
                key={`parent-${person.id}-${parentId}`}
                d={`M${childCoords.x},${childCoords.y} L${childCoords.x},${
                  (childCoords.y + parentCoords.bottom) / 2
                } L${parentCoords.x},${
                  (childCoords.y + parentCoords.bottom) / 2
                } L${parentCoords.x},${parentCoords.bottom}`}
                stroke="#CCCCCC" 
                fill="none"
                strokeWidth="1.5"
              />
            );
            
            // Если это линия к основному родителю и если есть два родителя, рисуем горизонтальную линию между ними
            if (parent.partnerId) {
              const partner = people.find(p => p.id === parent.partnerId);
              if (partner && partner.x !== undefined && partner.y !== undefined) {
                // Проверяем, не была ли уже отрисована линия партнерства
                const alreadyDrawn = people.findIndex(p => p.id === partner.id) < people.findIndex(p => p.id === parent.id);
                
                if (!alreadyDrawn) {
                  const partnerCoords = getCoordinates(partner);
                  
                  // Рисуем горизонтальную линию между родителями
                  lines.push(
                    <path 
                      key={`partner-${parent.id}-${partner.id}`}
                      d={`M${parentCoords.x},${parentCoords.y + parentCoords.height/2} L${partnerCoords.x},${partnerCoords.y + partnerCoords.height/2}`}
                      stroke="#CCCCCC" 
                      fill="none"
                      strokeWidth="1.5"
                    />
                  );
                }
              }
            }
          }
        }
      }
      
      // Если у человека есть партнер, рисуем горизонтальную линию
      if (person.partnerId && person.isMainPerson) {
        const partner = people.find(p => p.id === person.partnerId);
        
        if (partner && partner.x !== undefined && partner.y !== undefined && 
            person.x !== undefined && person.y !== undefined) {
          
          // Получаем координаты для главного узла и партнера
          const personCoords = {
            x: person.x + 140, // Правый край главного узла
            y: person.y + 70  // Центр по вертикали
          };
          
          const partnerCoords = {
            x: partner.x,       // Левый край узла партнера
            y: partner.y + 60   // Центр по вертикали для плейсхолдера
          };
          
          // Рисуем горизонтальную линию между главным узлом и партнером
          lines.push(
            <path 
              key={`partner-${person.id}-${partner.id}`}
              d={`M${personCoords.x},${personCoords.y} L${partnerCoords.x},${partnerCoords.y}`}
              stroke="#CCCCCC" 
              fill="none"
              strokeWidth="1.5"
            />
          );
        }
      }
      
      // Если узел главный, рисуем линию к ребенку
      if (person.isMainPerson) {
        const children = people.filter(p => p.parentIds?.includes(person.id));
        
        if (children.length > 0 && person.x !== undefined && person.y !== undefined) {
          const child = children[0]; // берем первого ребенка
          
          if (child && child.x !== undefined && child.y !== undefined) {
            // Координаты для главного узла и ребенка
            const personBottom = person.y + 140; // Нижний край главного узла
            const childY = child.y;
            const personCenterX = person.x + 70; // Центр главного узла по горизонтали
            const childCenterX = child.x + 60; // Центр узла ребенка по горизонтали (для плейсхолдера)
            
            // Рисуем вертикальную линию от главного узла к ребенку
            lines.push(
              <path 
                key={`child-${person.id}-${child.id}`}
                d={`M${personCenterX},${personBottom} L${personCenterX},${
                  (personBottom + childY) / 2
                } L${childCenterX},${
                  (personBottom + childY) / 2
                } L${childCenterX},${childY}`}
                stroke="#CCCCCC" 
                fill="none"
                strokeWidth="1.5"
              />
            );
          }
        }
      }
    }
    
    return lines;
  };
  
  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden bg-gray-50 cursor-grab"
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
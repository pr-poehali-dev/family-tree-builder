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
    
    // Найдем главного человека
    const mainPerson = people.find(p => p.isMainPerson);
    if (!mainPerson || mainPerson.x === undefined || mainPerson.y === undefined) return null;
    
    // Найдем родителей
    const parents = people.filter(p => p.isPlaceholder && (p.gender === 'male' || p.gender === 'female'));
    
    // Если есть оба родителя, рисуем горизонтальную линию между ними
    if (parents.length >= 2 && parents[0].x !== undefined && parents[1].x !== undefined && 
        parents[0].y !== undefined && parents[1].y !== undefined) {
      
      const mother = parents.find(p => p.gender === 'female');
      const father = parents.find(p => p.gender === 'male');
      
      if (mother && father) {
        // Горизонтальная линия между родителями
        lines.push(
          <line 
            key="parent-connection"
            x1={mother.x + 45}
            y1={mother.y + 45}
            x2={father.x + 45}
            y2={father.y + 45}
            stroke={mother.gender === 'female' ? "#FDA4AF" : "#93C5FD"}
            strokeWidth="1"
          />
        );
        
        // Вертикальная линия вниз от центра родительской линии
        const centerX = (mother.x + father.x) / 2 + 45;
        lines.push(
          <line 
            key="parent-to-main"
            x1={centerX}
            y1={mother.y + 45}
            x2={mainPerson.x + 65}
            y2={mainPerson.y}
            stroke="#FDA4AF"
            strokeWidth="1"
          />
        );
      }
    }
    
    return lines;
  };
  
  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full overflow-hidden bg-[#f3f6f0] cursor-grab"
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
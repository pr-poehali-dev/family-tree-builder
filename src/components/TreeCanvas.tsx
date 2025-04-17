import { useState, useRef, useEffect } from 'react';
import TreeNode from '@/components/TreeNode';

interface Person {
  id: string;
  name: string;
  birthDate?: string;
  birthPlace?: string;
  photo?: string;
  parentIds?: string[];
  childrenIds?: string[];
  partnerId?: string;
  x?: number;
  y?: number;
  isSelected?: boolean;
}

interface TreeCanvasProps {
  people: Person[];
  onSelectPerson: (person: Person) => void;
  onAddRelative: (personId: string, relationType: 'parent' | 'child' | 'partner') => void;
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
          {/* Здесь могут быть линии связей между узлами */}
          
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
      <div className="absolute bottom-4 right-4 bg-background rounded-md shadow-md p-2 flex gap-2 border border-border">
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md"
          onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
        >
          +
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md"
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
        >
          -
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md"
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
        >
          ⟳
        </button>
      </div>
    </div>
  );
};

export default TreeCanvas;
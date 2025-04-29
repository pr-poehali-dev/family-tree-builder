import { useRef } from 'react';
import { Person, RelationType } from '@/types/person';
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation';
import ConnectionLines from '@/components/tree/ConnectionLines';
import TreeNodes from '@/components/tree/TreeNodes';
import ZoomControls from '@/components/tree/ZoomControls';

interface TreeCanvasProps {
  people: Person[];
  onSelectPerson: (person: Person) => void;
  onAddRelative: (personId: string, relationType: RelationType) => void;
}

const TreeCanvas = ({ people, onSelectPerson, onAddRelative }: TreeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const {
    scale,
    position,
    isDragging,
    setScale,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetView
  } = useCanvasNavigation(canvasRef);
  
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
          <ConnectionLines people={people} />
          
          {/* Узлы людей */}
          <TreeNodes people={people} onSelectPerson={onSelectPerson} />
        </div>
      </div>
      
      {/* Элементы управления масштабом */}
      <ZoomControls 
        scale={scale}
        setScale={setScale}
        resetView={resetView}
      />
    </div>
  );
};

export default TreeCanvas;

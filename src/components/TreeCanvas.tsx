
import { useState, useRef, useEffect } from 'react';
import { Person } from '@/types/person';
import TreeNode from './TreeNode';
import ConnectionLines from './tree/ConnectionLines';
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation';
import ZoomControls from './tree/ZoomControls';

interface TreeCanvasProps {
  persons: Person[];
  onSelectPerson: (person: Person) => void;
  selectedPersonId?: string;
}

const TreeCanvas = ({ persons, onSelectPerson, selectedPersonId }: TreeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [layoutedPersons, setLayoutedPersons] = useState<Person[]>([]);
  
  // Используем хук для навигации по канве
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
  
  // Распределение узлов по канве при изменении данных
  useEffect(() => {
    if (!persons.length) return;
    
    // Функция для расчета позиций узлов
    const layoutTree = () => {
      const nodeWidth = 100; // Ширина узла с отступами
      const nodeHeight = 120; // Высота узла с отступами
      
      // Группируем персон по поколениям
      const generations: { [key: number]: Person[] } = {};
      
      // Определяем поколения на основе связей
      persons.forEach(person => {
        const generation = person.generation || 0;
        if (!generations[generation]) {
          generations[generation] = [];
        }
        generations[generation].push(person);
      });
      
      // Сортируем поколения
      const sortedGenerations = Object.keys(generations)
        .map(Number)
        .sort((a, b) => a - b);
      
      // Расставляем узлы по горизонтали внутри поколения
      sortedGenerations.forEach(genNumber => {
        const genPersons = generations[genNumber];
        const totalWidth = genPersons.length * nodeWidth;
        
        genPersons.forEach((person, index) => {
          // Рассчитываем горизонтальное положение
          const x = (index + 0.5) * nodeWidth;
          
          // Вертикальное положение на основе поколения
          const y = genNumber * nodeHeight + 100;
          
          person.x = x;
          person.y = y;
        });
      });
      
      return [...persons];
    };
    
    // Применяем расчет позиций
    setLayoutedPersons(layoutTree());
  }, [persons]);
  
  // Центрирование на выбранной персоне
  useEffect(() => {
    if (!selectedPersonId || !canvasRef.current) return;
    
    const selectedPerson = layoutedPersons.find(p => p.id === selectedPersonId);
    if (!selectedPerson || !selectedPerson.x || !selectedPerson.y) return;
    
    // Логика центрирования выбранного узла здесь...
  }, [selectedPersonId, layoutedPersons]);
  
  return (
    <div className="relative w-full h-full overflow-hidden bg-secondary/5">
      <div
        ref={canvasRef}
        className={`relative w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          className="absolute origin-top-left transition-transform"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            willChange: 'transform'
          }}
        >
          {/* Рисуем линии связей под узлами */}
          <ConnectionLines persons={layoutedPersons} scale={scale} />
          
          {/* Отрисовываем узлы древа поверх линий */}
          <div className="relative" style={{ zIndex: 2 }}>
            {layoutedPersons.map(person => (
              <div
                key={person.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: person.x,
                  top: person.y,
                }}
              >
                <TreeNode
                  person={person}
                  onSelect={onSelectPerson}
                  isSelected={person.id === selectedPersonId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Контроли масштабирования */}
      <ZoomControls
        scale={scale}
        setScale={setScale}
        resetView={resetView}
      />
    </div>
  );
};

export default TreeCanvas;

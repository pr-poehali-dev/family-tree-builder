
import { useState, useEffect, useRef, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CanvasNavigation {
  scale: number;
  position: Position;
  isDragging: boolean;
  setScale: (scale: number) => void;
  handleMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  handleMouseMove: (e: React.MouseEvent | React.TouchEvent) => void;
  handleMouseUp: () => void;
  resetView: () => void;
}

export const useCanvasNavigation = (
  canvasRef: RefObject<HTMLDivElement>
): CanvasNavigation => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  
  // Используем useRef для предотвращения потери контекста при быстром перемещении
  const positionRef = useRef(position);
  const scaleRef = useRef(scale);
  
  // Обновляем ref при изменении состояний
  useEffect(() => {
    positionRef.current = position;
    scaleRef.current = scale;
  }, [position, scale]);
  
  // Обработчик для колесика мыши (масштабирование)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const direction = e.deltaY > 0 ? -1 : 1;
      const factor = 0.1;
      const newScale = Math.max(0.5, Math.min(3, scaleRef.current + direction * factor));
      
      // Масштабирование относительно курсора
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const oldPosX = mouseX - positionRef.current.x;
        const oldPosY = mouseY - positionRef.current.y;
        const newPosX = (oldPosX / scaleRef.current) * newScale;
        const newPosY = (oldPosY / scaleRef.current) * newScale;
        
        setPosition({
          x: mouseX - newPosX,
          y: mouseY - newPosY
        });
      }
      
      setScale(newScale);
    };
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel);
      }
    };
  }, [canvasRef]);
  
  // Получение координат из события мыши или касания
  const getClientPosition = (e: React.MouseEvent | React.TouchEvent): Position => {
    if ('touches' in e) {
      // Сенсорное событие
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    } else {
      // Событие мыши
      return {
        x: e.clientX,
        y: e.clientY
      };
    }
  };
  
  // Начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos(getClientPosition(e));
  };
  
  // Перетаскивание
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentPos = getClientPosition(e);
    const deltaX = currentPos.x - startPos.x;
    const deltaY = currentPos.y - startPos.y;
    
    setPosition({
      x: position.x + deltaX,
      y: position.y + deltaY
    });
    
    setStartPos(currentPos);
  };
  
  // Окончание перетаскивания
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Сброс к начальному виду
  const resetView = () => {
    if (!canvasRef.current) return;
    
    const containerWidth = canvasRef.current.clientWidth;
    const containerHeight = canvasRef.current.clientHeight;
    
    setPosition({
      x: containerWidth / 2,
      y: containerHeight / 2
    });
    
    setScale(1);
  };
  
  // Инициализация начальной позиции
  useEffect(() => {
    if (canvasRef.current && position.x === 0 && position.y === 0) {
      resetView();
    }
  }, [canvasRef.current]);
  
  return {
    scale,
    position,
    isDragging,
    setScale,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetView
  };
};

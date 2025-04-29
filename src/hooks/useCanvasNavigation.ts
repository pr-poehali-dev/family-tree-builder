import { useState, useCallback, RefObject, useEffect } from 'react';

interface CanvasPosition {
  x: number;
  y: number;
}

export const useCanvasNavigation = (canvasRef: RefObject<HTMLDivElement>) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<CanvasPosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<CanvasPosition>({ x: 0, y: 0 });
  
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 2));
  }, []);
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  }, [isDragging, startPos]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);
  
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        canvasRef.current?.removeEventListener('wheel', handleWheel);
      };
    }
  }, [canvasRef, handleWheel]);
  
  return {
    scale,
    position,
    isDragging,
    setScale,
    setPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetView
  };
};

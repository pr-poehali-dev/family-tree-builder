
import React, { memo, useEffect, useRef } from 'react';
import { Person } from '@/types/person';

interface ConnectionLinesProps {
  persons: Person[];
  scale: number;
}

const ConnectionLines = memo(({ persons, scale }: ConnectionLinesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !persons.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Устанавливаем размеры canvas на основе контейнера
    const container = canvas.parentElement;
    if (!container) return;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    // Очищаем холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Настраиваем стиль линий
    ctx.strokeStyle = '#D9A799';
    ctx.lineWidth = 2 * scale;
    ctx.lineCap = 'round';
    
    // Маска для обходки плашек (линии будут проходить под плашками)
    ctx.globalCompositeOperation = 'destination-over';
    
    // Отрисовка связей между узлами
    persons.forEach(person => {
      if (!person.x || !person.y) return;
      
      // Рисуем связи с детьми
      if (person.childrenIds?.length) {
        person.childrenIds.forEach(childId => {
          const child = persons.find(p => p.id === childId);
          if (child?.x && child?.y) {
            drawConnection(ctx, person.x, person.y, child.x, child.y);
          }
        });
      }
      
      // Рисуем связи с супругами
      if (person.spouseIds?.length) {
        person.spouseIds.forEach(spouseId => {
          const spouse = persons.find(p => p.id === spouseId);
          if (spouse?.x && spouse?.y) {
            // Для супругов используем пунктирную линию
            drawSpouseConnection(ctx, person.x, person.y, spouse.x, spouse.y);
          }
        });
      }
    });
    
    // Восстанавливаем режим отрисовки
    ctx.globalCompositeOperation = 'source-over';
  }, [persons, scale]);
  
  // Функция для рисования связи родитель-ребенок
  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const padding = 15 * scale; // Отступ от узла
    
    // Начинаем путь
    ctx.beginPath();
    
    if (Math.abs(y2 - y1) > 50) {
      // Вертикальная линия с изгибами (для связи поколений)
      const midY = (y1 + y2) / 2;
      
      // Начинаем от нижней части родительского узла
      ctx.moveTo(x1, y1 + padding);
      
      // Промежуточная точка между поколениями
      ctx.lineTo(x1, midY);
      ctx.lineTo(x2, midY);
      ctx.lineTo(x2, y2 - padding);
    } else {
      // Прямая линия для связей на одном уровне
      ctx.moveTo(x1, y1 + padding);
      ctx.lineTo(x2, y2 - padding);
    }
    
    ctx.stroke();
  };
  
  // Функция для рисования связи между супругами
  const drawSpouseConnection = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const padding = 12 * scale; // Отступ от узла
    
    // Сохраняем текущие настройки
    ctx.save();
    
    // Настраиваем пунктир для супругов
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = '#9b87f5';
    
    // Начинаем путь
    ctx.beginPath();
    
    // Горизонтальная линия между супругами
    const midY = (y1 + y2) / 2;
    
    if (Math.abs(x2 - x1) > 60) {
      // Если супруги далеко, рисуем прямую линию
      ctx.moveTo(x1 + padding, y1);
      ctx.lineTo(x2 - padding, y2);
    } else {
      // Если супруги рядом, рисуем арку
      const controlY = midY - 30 * scale; // Контрольная точка для изгиба
      
      ctx.moveTo(x1, y1 - padding);
      ctx.quadraticCurveTo((x1 + x2) / 2, controlY, x2, y2 - padding);
    }
    
    ctx.stroke();
    
    // Восстанавливаем настройки
    ctx.restore();
  };
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }} // Убедимся, что линии под узлами
    />
  );
});

ConnectionLines.displayName = 'ConnectionLines';

export default ConnectionLines;

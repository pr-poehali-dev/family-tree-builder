import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  scale: number;
  setScale: (scale: number | ((prev: number) => number)) => void;
  resetView: () => void;
}

const ZoomControls = ({ scale, setScale, resetView }: ZoomControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-lg p-2 flex gap-2 border border-gray-200">
      <button 
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
        onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
        title="Увеличить"
      >
        <ZoomIn size={18} />
      </button>
      <button 
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
        onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
        title="Уменьшить"
      >
        <ZoomOut size={18} />
      </button>
      <button 
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md"
        onClick={resetView}
        title="Сбросить масштаб"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
};

export default ZoomControls;

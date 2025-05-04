
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize, 
  Move,
  Home as HomeIcon
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface ZoomControlsProps {
  scale: number;
  setScale: (scale: number) => void;
  resetView: () => void;
  centerTree?: () => void;
}

const ZoomControls = ({ 
  scale, 
  setScale, 
  resetView,
  centerTree 
}: ZoomControlsProps) => {
  const [isMoving, setIsMoving] = useState(false);
  
  // Увеличить масштаб
  const zoomIn = () => {
    setScale(Math.min(3, scale + 0.1));
  };
  
  // Уменьшить масштаб
  const zoomOut = () => {
    setScale(Math.max(0.5, scale - 0.1));
  };
  
  // Режим перемещения
  const toggleMoveMode = () => {
    setIsMoving(!isMoving);
    // Здесь можно добавить логику для изменения режима навигации по канве
  };
  
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border border-border/50">
      <div className="text-center text-xs text-muted-foreground pb-1 border-b border-border/30">
        {Math.round(scale * 100)}%
      </div>
      
      <div className="flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={zoomIn}
              aria-label="Увеличить"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Увеличить (+ на клавиатуре)</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={zoomOut}
              aria-label="Уменьшить"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Уменьшить (- на клавиатуре)</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleMoveMode}
              className={isMoving ? "bg-primary/20" : ""}
              aria-label="Режим перемещения"
            >
              <Move className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Режим перемещения</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={centerTree || resetView}
              aria-label="Центрировать древо"
            >
              <HomeIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Центрировать древо</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={resetView}
              aria-label="Сбросить масштаб"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Сбросить масштаб (0 на клавиатуре)</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setScale(1)}
              aria-label="100% масштаб"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>100% масштаб</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ZoomControls;

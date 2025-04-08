import { useRef } from 'react';

function ResizablePanel({ 
  direction = 'horizontal', 
  children = [], 
  primarySize = 50, 
  setPrimarySize,
  primaryMinSize = 20,
  secondaryMinSize = 20 
}) {
  const isHorizontal = direction === 'horizontal';
  const containerRef = useRef(null);
  
  const handleMouseDown = (e) => {
    e.preventDefault();
    
    const container = containerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const startPosition = isHorizontal ? e.clientX : e.clientY;
    const containerSize = isHorizontal ? containerRect.width : containerRect.height;
    
    const onMouseMove = (e) => {
      const currentPosition = isHorizontal ? e.clientX : e.clientY;
      const positionDelta = currentPosition - startPosition;
      
      const containerStart = isHorizontal ? containerRect.left : containerRect.top;
      const newPrimarySize = ((currentPosition - containerStart) / containerSize) * 100;
      
      // Enforce min sizes
      if (newPrimarySize < primaryMinSize || (100 - newPrimarySize) < secondaryMinSize) {
        return;
      }
      
      setPrimarySize(newPrimarySize);
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  
  return (
    <div 
      ref={containerRef}
      className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} w-full h-full`}
    >
      <div 
        className="overflow-hidden"
        style={{ 
          [isHorizontal ? 'width' : 'height']: `${primarySize}%` 
        }}
      >
        {children[0]}
      </div>
      
      {/* Resizer handle */}
      <div
        className={`
          ${isHorizontal ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'}
          bg-dark-tertiary hover:bg-neon-blue transition-colors
        `}
        onMouseDown={handleMouseDown}
      />
      
      <div 
        className="overflow-hidden"
        style={{ 
          [isHorizontal ? 'width' : 'height']: `${100 - primarySize}%` 
        }}
      >
        {children[1]}
      </div>
    </div>
  );
}

export default ResizablePanel;
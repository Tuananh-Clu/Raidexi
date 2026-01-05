import React from 'react';

const BackgroundDecor: React.FC = () => {
  return (
    <>
      <div className="fixed z-0 flex-col hidden gap-2 pointer-events-none bottom-8 left-8 lg:flex">
        <div className="font-mono text-xs text-decor-dark">
          <div>COORD_X: 48.8566</div>
          <div>COORD_Y: 2.3522</div>
          <div>GRID_REF: A-742</div>
        </div>
      </div>
      
      <div className="fixed z-0 hidden pointer-events-none top-8 right-8 lg:block">
        <div className="flex items-center justify-center w-32 h-32 p-2 border border-decor-dark opacity-30">
          <span className="text-6xl material-symbols-outlined text-decor-dark">grid_4x4</span>
        </div>
      </div>
    </>
  );
};

export default BackgroundDecor;
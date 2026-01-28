import React from 'react';

const Header: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 border-b shadow-2xl no-print bg-stone-900 border-stone-800">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold tracking-widest text-white font-display">RAIDEXI</span>
        <span className="hidden pt-1 font-mono text-xs tracking-tighter uppercase text-stone-500 sm:inline-block">Measurement Infrastructure v2.4</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2 text-sm font-semibold tracking-widest transition-all bg-transparent border rounded-none border-stone-700 hover:border-primary text-stone-400 hover:text-primary"
        >
          <span className="material-symbols-outlined text-[18px]">print</span> 
          <span className="hidden sm:inline">PRINT PREVIEW</span>
          <span className="sm:hidden">PRINT</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
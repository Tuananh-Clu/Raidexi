import React from 'react';
import { PARTNER_ITEMS } from '../constants';


const PartnerGrid: React.FC = () => {
  return (
    <section className="w-full border-t border-border-dark">
      <div className="grid grid-cols-2 mx-auto border-l border-border-dark md:grid-cols-3 lg:grid-cols-5 bg-background-dark">
        {PARTNER_ITEMS.map((item, index) => {
          if ('type' in item && item.type === 'join') {
            return (
              <div 
                key={`join-${index}`}
                className="aspect-4/3 flex items-center justify-center border-r border-b border-border-dark p-8 group hover:bg-[#1f1d15] transition-colors duration-500 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2 transition-opacity opacity-50 group-hover:opacity-80">
                  <span className="text-4xl material-symbols-outlined">handshake</span>
                  <span className="text-xs tracking-widest uppercase">Gia nhập</span>
                </div>
              </div>
            );
          }
          if ('src' in item) {
             return (
              <div 
                key={`partner-${index}`}
                className="aspect-4/3 flex items-center justify-center border-r border-b border-border-dark p-8 group hover:bg-[#1f1d15] transition-colors duration-500"
              >
                <img
                  className="w-2/3 h-auto transition-opacity duration-500 opacity-60 grayscale brightness-150 contrast-125 group-hover:opacity-90 mix-blend-screen"
                  src={item.src}
                  alt={item.alt}
                />
              </div>
            );
          }
          
          return null;
        })}
      </div>
    </section>
  );
};

export default PartnerGrid;
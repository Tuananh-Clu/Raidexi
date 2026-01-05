import React, { useState, useEffect, useRef } from 'react';

interface ViewportProps {
  showGrid: boolean;
  triggerFlash: boolean;
  openCamera: boolean;
}

const Viewport: React.FC<ViewportProps> = ({ showGrid, triggerFlash,openCamera }) => {
  const [flashActive, setFlashActive] = useState(false);
  const camera = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (triggerFlash) {
      setFlashActive(true);
      const timer = setTimeout(() => setFlashActive(false), 150);
      return () => clearTimeout(timer);
    }
  }, [triggerFlash]);
  useEffect(() => {
    if (openCamera) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user',width: 1280, height: 720 } })
        .then((stream) => { 
          if (camera.current) {
            camera.current.srcObject = stream; 
          }
        })
        .catch((err) => {
          console.error('Error accessing camera: ', err);
        });
    }
    else {
      if (camera.current && camera.current.srcObject) {
        const stream = camera.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        camera.current.srcObject = null;
      }
    }
  }, [openCamera]);

      

  return (
    <div className="relative bg-[#0d0c0a] flex items-center justify-center p-4 lg:p-8 border-r border-grid-line overflow-hidden group h-full">
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-black border shadow-2xl border-grid-line">
        <video
          ref={camera}
          autoPlay
          muted
          playsInline
          className="object-cover w-full h-full"
        >
        </video>
        <div className="absolute inset-0 z-10 pointer-events-none scanline opacity-20 crt-flicker" />

        <div className={`absolute inset-0 bg-white pointer-events-none z-50 transition-opacity duration-75 ${flashActive ? 'opacity-80' : 'opacity-0'}`} />

        <div className="absolute z-20 border pointer-events-none inset-4 lg:inset-8 border-brass-light/30">
          <div className="absolute top-0 left-0 border-t-2 border-l-2 size-4 border-brass-light" />
          <div className="absolute top-0 right-0 border-t-2 border-r-2 size-4 border-brass-light" />
          <div className="absolute bottom-0 left-0 border-b-2 border-l-2 size-4 border-brass-light" />
          <div className="absolute bottom-0 right-0 border-b-2 border-r-2 size-4 border-brass-light" />

          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-12 opacity-80">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brass-light/50" />
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-brass-light/50" />
          </div>
          {showGrid && (
             <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border border-brass-light/30" />
                ))}
             </div>
          )}
          <div className="absolute top-[10%] left-[30%] right-[30%] bottom-[10%] border border-dashed border-brass-light/60 transition-all duration-1000 ease-in-out hover:border-solid hover:bg-brass-light/5">
            <div className="absolute -top-6 left-0 bg-brass-light text-black px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest animate-pulse">
              TARGET_LOCKED
            </div>
            <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mix-blend-difference">
               <span className="font-mono text-4xl font-thin tracking-widest lg:text-5xl text-brass-light opacity-60">300<span className="mx-2">×</span>300</span>
            </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 flex flex-col items-end justify-between w-8 py-12 pr-2 border-r border-brass-light/20">
            {['180', '160', '140', '120', '100', '080', '060'].map((mark) => (
              <span key={mark} className="text-[10px] font-mono text-brass-light/60">{mark}</span>
            ))}
          </div>
        </div>
        <div className="absolute z-30 px-4 py-2 -translate-x-1/2 border shadow-lg bottom-12 left-1/2 bg-black/80 border-brass-light backdrop-blur-sm">
          <p className="text-brass-light font-mono text-xs tracking-[0.2em] animate-pulse-fast">ALIGN SUBJECT WITHIN FRAME</p>
        </div>
      </div>
    </div>
  );
};

export default Viewport;
"use client"

import { motion } from "framer-motion";

export default function LoadingScreen({ note }: { note: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-500 bg-gradient-to-br from-black/50 via-orange-950/30 to-black/50 backdrop-blur-md">
      <motion.div
        className="relative flex flex-col items-center justify-center gap-6"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-orange-600/30 blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        />

        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-border"
            style={{
              maskImage: "linear-gradient(to bottom right, transparent 40%, black 60%)",
              WebkitMaskImage: "linear-gradient(to bottom right, transparent 40%, black 60%)"
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.2, 
              ease: "linear" 
            }}
          />

          <motion.div
            className="absolute inset-3 rounded-full border-[2.5px] border-transparent bg-gradient-to-l from-amber-400 via-orange-300 to-amber-400 bg-clip-border"
            style={{
              maskImage: "linear-gradient(to top left, transparent 40%, black 60%)",
              WebkitMaskImage: "linear-gradient(to top left, transparent 40%, black 60%)"
            }}
            animate={{ rotate: -360 }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "linear" 
            }}
          />
          <motion.div
            className="absolute inset-0 w-3 h-3 m-auto rounded-full shadow-lg bg-gradient-to-br from-orange-400 to-amber-500 shadow-orange-500/50"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1, 
              ease: "easeInOut" 
            }}
          />

          {[0, 120, 240].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full shadow-sm shadow-orange-400"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-3px",
                marginLeft: "-3px",
              }}
              animate={{
                rotate: [rotation, rotation + 360],
                x: [0, Math.cos((rotation * Math.PI) / 180) * 40],
                y: [0, Math.sin((rotation * Math.PI) / 180) * 40],
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                x: { repeat: Infinity, duration: 2, ease: "linear" },
                y: { repeat: Infinity, duration: 2, ease: "linear" },
              }}
            />
          ))}
        </div>
        <motion.div
          className="px-6 py-2 mt-8 border rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border-orange-500/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p
            className="text-sm font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 100%"
            }}
          >
            {note}
          </motion.p>
        </motion.div>
        <motion.div
          className="absolute w-32 h-1 rounded-full -bottom-8 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent blur-sm"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scaleX: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>
    </div>
  );
}
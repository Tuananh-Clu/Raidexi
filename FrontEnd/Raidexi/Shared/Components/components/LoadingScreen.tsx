"use client"

import { motion } from "framer-motion";

export default function LoadingScreen({ note }: { note: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-500 bg-white/60 backdrop-blur-xl">
      <motion.div
        className="relative flex flex-col items-center justify-center gap-6"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Glow background */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#2563eb]/20 via-[#06b6d4]/20 to-[#2563eb]/20 blur-2xl"
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

        {/* Spinner */}
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-transparent"
            style={{
              borderImage: 'linear-gradient(135deg, #2563eb, #06b6d4) 1',
              borderRadius: '9999px',
              maskImage: "linear-gradient(to bottom right, transparent 40%, black 60%)",
              WebkitMaskImage: "linear-gradient(to bottom right, transparent 40%, black 60%)"
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.2, 
              ease: "linear" 
            }}
          >
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#2563eb] bg-clip-border" 
              style={{
                maskImage: "linear-gradient(to bottom right, transparent 40%, black 60%)",
                WebkitMaskImage: "linear-gradient(to bottom right, transparent 40%, black 60%)"
              }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-3 rounded-full border-[2.5px] border-transparent bg-gradient-to-l from-[#06b6d4] via-[#2563eb] to-[#06b6d4] bg-clip-border"
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
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 w-3 h-3 m-auto rounded-full shadow-lg bg-gradient-to-br from-[#2563eb] to-[#06b6d4] shadow-[#2563eb]/30"
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

          {/* Orbiting dots */}
          {[0, 120, 240].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#06b6d4] rounded-full shadow-sm shadow-[#06b6d4]"
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
        
        {/* Label */}
        <motion.div
          className="px-6 py-2.5 mt-8 rounded-2xl bg-gradient-to-r from-[#2563eb]/5 via-[#06b6d4]/5 to-[#2563eb]/5 border border-[#2563eb]/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p
            className="text-sm font-semibold tracking-wider gradient-text"
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
        
        {/* Bottom glow */}
        <motion.div
          className="absolute w-32 h-1 rounded-full -bottom-8 bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent blur-sm"
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
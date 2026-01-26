"use client"

import { motion } from "framer-motion";

export default function GlobalLoading({ note }: { note: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-500 bg-black/40 backdrop-blur-sm">
      <motion.div
        className="relative flex flex-col items-center justify-center gap-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >

        <motion.div
          className="absolute rounded-full h-28 w-28 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600 blur-xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />

        <motion.div
          className="relative w-20 h-20 border-4 border-transparent rounded-full border-t-yellow-400 border-r-orange-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />

        <motion.div
          className="absolute w-4 h-4 bg-orange-500 rounded-full"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />

        <motion.div
          className="mt-10 text-sm font-medium tracking-wide text-yellow-300"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          {note}
        </motion.div>
      </motion.div>
    </div>
  );
}

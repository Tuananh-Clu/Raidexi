"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.32, 0.72, 0, 1];

export default function LoadingScreen({ note }: { note: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(247,243,234,0.86)] p-6 backdrop-blur-3xl">
      <motion.div
        className="rx-shell w-full max-w-sm"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.62, ease }}
      >
        <div className="rx-core flex flex-col items-center p-8 text-center">
          <div className="relative h-24 w-24">
            <motion.div
              className="absolute inset-0 rounded-full border border-[rgba(24,23,20,0.12)]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.4, ease }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border border-[var(--signal-blue)] border-r-transparent"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.1, ease }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brass)]"
              animate={{ scale: [1, 1.45, 1], opacity: [1, 0.68, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, ease }}
            />
          </div>
          <p className="rx-label mt-6 text-[var(--signal-blue)]">Đang hiệu chuẩn</p>
          <p className="mt-3 text-sm font-semibold text-[var(--ink)]">{note}</p>
        </div>
      </motion.div>
    </div>
  );
}

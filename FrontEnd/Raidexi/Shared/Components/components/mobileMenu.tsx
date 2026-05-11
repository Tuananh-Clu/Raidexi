"use client"

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRightCircle } from 'lucide-react'
import { mobileScreenStore } from '@/Shared/store/mobileScreen.store'

export const MobileMenu = () => {
  const {openMobileMenu, setOpenMobileMenu} = mobileScreenStore();

  const menuItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Đo lường", href: "/Measurements" },
    { label: "Kiến trúc", href: "/Architecture" },
    { label: "Đối tác", href: "/Brand" },
    { label: "Liên hệ", href: "/Contact" },
    { label: "Dashboard", href: "/Dashboard" },
    { label: "Đăng xuất", href: "/Logout" },
  ]

  return (
    <>
      <AnimatePresence>
        {openMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenMobileMenu(false)}
            className="fixed inset-0 z-[500] bg-[#0f172a]/40 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openMobileMenu && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[550] w-80 bg-white/95 backdrop-blur-xl border-l border-[#e2e8f0] shadow-2xl overflow-y-auto"
          >
            {/* Header gradient accent */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]" />
            
            <div className="relative px-6 pt-10 pb-8 border-b border-[#e2e8f0]">
              <motion.h2 
                className="flex flex-row items-center justify-between text-2xl font-bold text-[#0f172a]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Menu 
                <ArrowRightCircle 
                  className="transition-transform cursor-pointer w-7 h-7 text-[#2563eb] hover:scale-110" 
                  onClick={() => setOpenMobileMenu(false)} 
                />
              </motion.h2>
              <p className="mt-1 text-sm text-[#64748b]">Chào mừng bạn đến với hệ thống</p>
            </div>

            <nav className="px-4 py-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setOpenMobileMenu(false)}
                  className="relative flex items-center justify-between px-5 py-4 mb-2 transition-all duration-300 border group rounded-2xl bg-[#f8fafc] border-[#e2e8f0] hover:border-[#2563eb]/20 hover:bg-[#eff6ff] hover:shadow-sm"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative font-medium text-[#334155] transition-colors group-hover:text-[#2563eb]">
                    {item.label}
                  </span>

                  <ChevronRight className="relative w-5 h-5 text-[#cbd5e1] transition-all group-hover:text-[#2563eb] group-hover:translate-x-1" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#e2e8f0] bg-white/80 backdrop-blur-sm"
            >
              <p className="text-xs text-center text-[#94a3b8]">
                © 2026 - Raidexi. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
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
            className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-md"
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
            className="fixed top-0 right-0 bottom-0 z-[550] w-80 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 border-l border-primary shadow-2xl overflow-y-auto"
          >
            <div className="absolute top-0 right-0 w-full h-40 pointer-events-none bg-gradient-to-b from-primary via-transparent to-transparent" />
            
            <div className="relative px-6 pt-20 pb-8 border-b border-primary/20">
              <motion.h2 
                className="flex flex-row items-center justify-between text-2xl font-bold text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Menu 
                <ArrowRightCircle 
                  className="transition-transform cursor-pointer w-7 h-7 hover:scale-110" 
                  onClick={() => setOpenMobileMenu(false)} 
                />
              </motion.h2>
              <p className="mt-1 text-sm text-gray-400">Chào mừng bạn đến với hệ thống</p>
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
                  className="relative flex items-center justify-between px-5 py-4 mb-2 transition-all duration-300 border group rounded-xl bg-zinc-900/50 border-zinc-800 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 group-hover:opacity-100 blur-xl"
                    initial={false}
                  />

                  <span className="relative font-medium text-gray-300 transition-colors group-hover:text-white">
                    {item.label}
                  </span>

                  <ChevronRight className="relative w-5 h-5 text-gray-600 transition-all group-hover:text-primary group-hover:translate-x-1" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-6 border-t border-primary/20 bg-gradient-to-t from-black/50 to-transparent"
            >
              <p className="text-xs text-center text-gray-500">
                © 2026 - Raidexi. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
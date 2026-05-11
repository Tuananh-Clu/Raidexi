"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import { useEffect, type ReactNode } from "react";
import Script from "next/script";
import { BrandProvider } from "@/provider/BrandProvider";
import { BodyMeasureEstimateProvider } from "@/provider/BodyMeasureEstimate";
import { AISuggestSizeProvider } from "@/provider/AISuggestSize";
import GlobalLoading from "@/Shared/Components/components/LoadingScreen";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { mobileScreenStore } from "@/Shared/store/mobileScreen.store";

export default function RootLayout({ children }: { children: ReactNode }) {
  const {isLoading, note}=useLoadingStore();
  const {setIsMobileScreen}=mobileScreenStore();
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 500);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    } 
  }, [setIsMobileScreen]);
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/logo.png" />
        <title>Raidexi - Đo lường cơ thể AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-[#f8fafc] text-[#334155] font-sans antialiased selection:bg-[#2563eb] selection:text-white">
        <Script
          src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
          strategy="afterInteractive"
        />
        {isLoading && <GlobalLoading note={note} />}
        <Toaster position="top-right" 
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#334155',
              border: '1px solid #e2e8f0',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '16px',
              boxShadow: '0 10px 40px -10px rgba(37, 99, 235, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.03)',
              backdropFilter: 'blur(20px)',
            },
          }} 
        />
        <BodyMeasureEstimateProvider>
          <AuthProvider>
            <AISuggestSizeProvider>
              <BrandProvider>{children}</BrandProvider>
            </AISuggestSizeProvider>
          </AuthProvider>
        </BodyMeasureEstimateProvider>
      </body>
    </html>
  );
}

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-[#1a1510] text-[#e0dcd5] font-sans antialiased selection:bg-[#e9be49] selection:text-[#1a1510]">
        <Script
          src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
          strategy="afterInteractive"
        />
        {isLoading && <GlobalLoading note={note} />}
        <Toaster position="top-right" 
          toastOptions={{
            style: {
              background: '#221c15',
              color: '#e0dcd5',
              border: '1px solid #383429',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
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

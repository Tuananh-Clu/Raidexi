"use client";

import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import { useEffect, type ReactNode } from "react";
import { BrandProvider } from "@/provider/BrandProvider";
import { BodyMeasureEstimateProvider } from "@/provider/BodyMeasureEstimate";
import { AISuggestSizeProvider } from "@/provider/AISuggestSize";
import GlobalLoading from "@/Shared/Components/components/LoadingScreen";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { mobileScreenStore } from "@/Shared/store/mobileScreen.store";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { isLoading, note } = useLoadingStore();
  const { setIsMobileScreen } = mobileScreenStore();

  useEffect(() => {
    const handleResize = () => setIsMobileScreen(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileScreen]);

  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/logo.png" />
        <title>Raidexi - Đo cơ thể AI và gợi ý size theo thương hiệu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[var(--surface-canvas)] text-[var(--ink)] font-sans antialiased selection:bg-[var(--signal-blue)] selection:text-white">
        {isLoading && <GlobalLoading note={note} />}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "color-mix(in srgb, var(--surface-paper) 96%, transparent)",
              color: "var(--ink)",
              border: "1px solid var(--hairline)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              borderRadius: "16px",
              boxShadow: "0 24px 80px -36px rgba(23, 19, 15, 0.35)",
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

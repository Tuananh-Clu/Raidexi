"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import type { ReactNode } from "react";
import { BrandProvider } from "@/provider/BrandProvider";
import { BodyMeasureEstimateProvider } from "@/provider/BodyMeasureEstimate";
import { AISuggestSizeProvider } from "@/provider/AISuggestSize";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/logo.png" />
        <title>Raidexi - Đo lường cơ thể AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&amp;family=Noto+Sans:wght@400;500;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

      </head>

      <body>
        <Toaster position="top-right" />
        <AuthProvider>
          <AISuggestSizeProvider>
          <BodyMeasureEstimateProvider>
            <BrandProvider>{children}</BrandProvider>
          </BodyMeasureEstimateProvider>
          </AISuggestSizeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

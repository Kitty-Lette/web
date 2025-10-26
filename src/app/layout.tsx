import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kitty Lette - NFT Roulette Platform",
  description: "Spin the wheel and collect unique NFT treasures with Kitty Lette - where every spin creates a rare collectible adventure!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/Fonts/OpenRunde-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/Fonts/OpenRunde-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/Fonts/OpenRunde-Semibold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/Fonts/OpenRunde-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Open Runde';
              src: url('/Fonts/OpenRunde-Regular.woff2') format('woff2'),
                   url('/Fonts/OpenRunde-Regular.woff') format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Open Runde';
              src: url('/Fonts/OpenRunde-Medium.woff2') format('woff2'),
                   url('/Fonts/OpenRunde-Medium.woff') format('woff');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Open Runde';
              src: url('/Fonts/OpenRunde-Semibold.woff2') format('woff2'),
                   url('/Fonts/OpenRunde-Semibold.woff') format('woff');
              font-weight: 600;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Open Runde';
              src: url('/Fonts/OpenRunde-Bold.woff2') format('woff2'),
                   url('/Fonts/OpenRunde-Bold.woff') format('woff');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: '"Open Runde", ui-sans-serif, system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}

"use client";

import { HeroSection } from "./HeroSection";

interface MainContentProps {
  onPopupChange: (isOpen: boolean) => void;
}

export function MainContent({ onPopupChange }: MainContentProps) {
  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 space-y-6 overflow-y-auto">
      <div
        className="w-full max-w-6xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 30% 20%, rgba(255, 255, 255, 0.95), transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(240, 245, 255, 0.8), transparent 65%),
            radial-gradient(ellipse 50% 60% at 20% 70%, rgba(250, 240, 255, 0.7), transparent 60%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.95) 100%)
          `,
        }}
      >
        <HeroSection onPopupChange={onPopupChange} />
      </div>
    </div>
  );
}
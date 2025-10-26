"use client";

import Image from "next/image";
import { CompactRouletteWheel } from "../../components/compact-roulette-wheel";

interface HeroSectionProps {
  onPopupChange: (isOpen: boolean) => void;
}

export function HeroSection({ onPopupChange }: HeroSectionProps) {
  return (
    <div className="grid md:grid-cols-2 min-h-[600px]">
      <div
        className="p-4 md:p-8 flex flex-col justify-center"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255, 255, 255, 0.6), transparent 80%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(245, 250, 255, 0.5), transparent 70%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(250, 248, 255, 0.4) 100%)
          `,
        }}
      >
        <div className="max-w-sm mx-auto w-full space-y-6 md:space-y-8">
          <div className="text-center mb-4 md:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image
                src="/Images/Logo/kittylette.png"
                alt="Kitty Lette Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                Kitty Lette
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Spin the wheel and collect unique NFT treasures!
            </p>
          </div>

          <CompactRouletteWheel onPopupChange={onPopupChange} />
        </div>
      </div>

      <div
        className="relative bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage:
            "url('/Images/Background/background-kitty-lette.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 text-white">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Discover rare NFT treasures with every spin - where fortune
            favors the bold!
          </h2>
        </div>
      </div>
    </div>
  );
}
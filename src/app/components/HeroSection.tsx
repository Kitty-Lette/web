"use client";

import Image from "next/image";
import { CompactRouletteWheel } from "../../components/compact-roulette-wheel";
import { HeroSkeleton } from "../../components/skeletons/HeroSkeleton";
import { useGetPrice } from "../../hooks/useGetPrice";
import { useGetBalance } from "../../hooks/useGetBalance";
import { useGetFlowBalance } from "../../hooks/useGetFlowBalance";

interface HeroSectionProps {
  onPopupChange: (isOpen: boolean) => void;
}

export function HeroSection({ onPopupChange }: HeroSectionProps) {
  const { loading: priceLoading } = useGetPrice();
  const { loading: balanceLoading } = useGetBalance();
  const { loading: flowBalanceLoading } = useGetFlowBalance();

  // Show full skeleton loading when any loading state is true
  if (priceLoading || balanceLoading || flowBalanceLoading) {
    return <HeroSkeleton />;
  }

  return (
    <div className="grid md:grid-cols-2 min-h-[400px]">
      <div
        className="p-2 md:p-3 flex flex-col justify-center"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255, 255, 255, 0.6), transparent 80%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(245, 250, 255, 0.5), transparent 70%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(250, 248, 255, 0.4) 100%)
          `,
        }}
      >
        <div className="max-w-sm mx-auto w-full space-y-4 md:space-y-5">
          <div className="text-center mb-3 md:mb-5">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Image
                src="/Images/Logo/kittylette.png"
                alt="Kitty Lette Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <h1 className="text-xl font-bold text-gray-900">
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

        <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5 text-white">
          <h2 className="text-lg md:text-2xl font-bold mb-3">
            Discover rare NFT treasures with every spin - where fortune
            favors the bold!
          </h2>
        </div>
      </div>
    </div>
  );
}
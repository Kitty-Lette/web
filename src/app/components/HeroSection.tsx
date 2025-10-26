"use client";

import Image from "next/image";
import { CompactRouletteWheel } from "../../components/compact-roulette-wheel";

interface HeroSectionProps {
  onPopupChange: (isOpen: boolean) => void;
}

export function HeroSection({ onPopupChange }: HeroSectionProps) {
  return (
    <section className="w-full mx-auto max-w-10xl">
      {/* Grid 12 kolom: kiri 7, kanan 5 */}
      <div className="grid md:grid-cols-12 min-h-[460px] md:min-h-[540px] md:rounded-3xl md:overflow-hidden">
        {/* Kiri: lebih lebar */}
        <div
          className="md:col-span-7 p-4 md:p-6 flex flex-col justify-center"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.6), transparent 80%),
              radial-gradient(ellipse 60% 50% at 20% 80%, rgba(245,250,255,0.5), transparent 70%),
              linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(250,248,255,0.4) 100%)
            `,
          }}
        >
          <div className="mx-auto w-full max-w-[340px] space-y-4 md:space-y-5">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <Image
                  src="/Images/Logo/kittylette.png"
                  alt="Kitty Lette Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <h1 className="text-base md:text-lg font-semibold text-gray-900">
                  Kitty Lette
                </h1>
              </div>
              <p className="text-gray-600 text-xs md:text-[13px]">
                Spin the wheel and collect unique NFT treasures!
              </p>
            </div>

            {/* kecilkan wheel (tanpa card baru) */}
            <div className="origin-top mx-auto w-full max-w-[300px] scale-[0.84] md:scale-[0.88] lg:scale-[0.9]">
              <CompactRouletteWheel onPopupChange={onPopupChange} />
            </div>
          </div>
        </div>

        <div
          className="relative md:col-span-5 hidden md:block bg-cover bg-center bg-no-repeat overflow-hidden rounded-r-3xl"
          style={{
            backgroundImage:
              "url('/Images/Background/background-kitty-lette.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-lg md:text-[2rem] font-semibold leading-snug">
              Discover rare NFT treasures with every spin — where fortune favors
              the bold!
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { CompactRouletteWheel } from "@/src/components/compact-roulette-wheel";
import Balatro from "@/src/components/Balatro";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Aurora Dream Soft Harmony */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle 600px at 0% 200px, #bfdbfe, transparent),
        radial-gradient(circle 600px at 100% 200px, #bfdbfe, transparent)
      `,
        }}
      />
      {/* Balatro WebGL Background - Optional Overlay */}
      <div className="absolute inset-0 z-1 opacity-30">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#4DA6FF"
          color2="#1E90FF"
          color3="#0066CC"
          spinSpeed={3.0}
          contrast={2.8}
          lighting={0.6}
        />
      </div>

      {/* Wallet Connection - Top Right Corner */}
      <div className="absolute top-4 right-4 z-20">
        <ConnectButton />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
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

                <CompactRouletteWheel />
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
        </div>
      </div>
    </div>
  );
}

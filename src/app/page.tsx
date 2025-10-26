"use client";

import Image from "next/image";
import { CompactRouletteWheel } from "@/src/components/compact-roulette-wheel";
import Balatro from "@/src/components/Balatro";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useGetFlowBalance } from "@/src/hooks/useGetFlowBalance";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { balance: flowBalance, loading: flowBalanceLoading } = useGetFlowBalance();
  const { isConnected } = useAccount();

  const formatBalance = (balance: bigint) => {
    const formatted = formatEther(balance);
    const num = parseFloat(formatted);
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };
  return (
    <div className="h-screen w-full relative overflow-hidden">
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

      {/* Wallet Connection & Flow Balance - Top Right Corner */}
      {!isPopupOpen && (
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          {/* Flow Balance */}
          {isConnected && (
            <div className="flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200/60 shadow-sm h-10">
              <Image
                src="/Images/Logo/flow-logo.png"
                alt="FLOW"
                width={16}
                height={16}
                className="object-contain"
              />
              {flowBalanceLoading ? (
                <div className="animate-pulse">
                  <div className="h-3 bg-gray-200 rounded w-10"></div>
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-800">
                  {flowBalance ? formatBalance(flowBalance) : "0"}
                </span>
              )}
            </div>
          )}
          
          {/* Connect Button */}
          <ConnectButton.Custom>
            {({ openConnectModal, connectModalOpen }) => (
              <button
                onClick={openConnectModal}
                className="cursor-pointer relative overflow-hidden rounded-full h-10 px-4 font-medium text-white shadow-sm border border-gray-300/30 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 opacity-80">
                  <Balatro
                    isRotate={true}
                    mouseInteraction={false}
                    pixelFilter={400}
                    color1="#4F46E5"
                    color2="#3B82F6"
                    color3="#1E40AF"
                    spinSpeed={1.0}
                    contrast={2.5}
                    lighting={0.4}
                  />
                </div>
                <span className="relative z-10">Connect Wallet</span>
              </button>
            )}
          </ConnectButton.Custom>
        </div>
      )}

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

                <CompactRouletteWheel onPopupChange={setIsPopupOpen} />
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

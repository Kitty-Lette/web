"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useGetFlowBalance } from "../../hooks/useGetFlowBalance";
import { useAccount, useDisconnect } from "wagmi";
import { formatEther } from "viem";
import Balatro from "../../components/Balatro";

interface WalletSectionProps {
  isPopupOpen: boolean;
}

export function WalletSection({ isPopupOpen }: WalletSectionProps) {
  const { balance: flowBalance, loading: flowBalanceLoading } = useGetFlowBalance();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatBalance = (balance: bigint) => {
    const formatted = formatEther(balance);
    const num = parseFloat(formatted);
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };

  if (isPopupOpen) return null;

  return (
    <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
      {isConnected && (
        <button className="cursor-pointer relative overflow-hidden flex items-center space-x-1.5 rounded-full px-3 py-2 shadow-sm h-10 border border-gray-300/30 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-green-600">
          <div className="absolute inset-0 opacity-60">
            <Balatro
              isRotate={true}
              mouseInteraction={false}
              pixelFilter={200}
              color1="#10B981"
              color2="#059669"
              color3="#047857"
              spinSpeed={0.8}
              contrast={4.0}
              lighting={0.6}
              spinAmount={0.5}
            />
          </div>
          <Image
            src="/Images/Logo/flow-logo.png"
            alt="FLOW"
            width={16}
            height={16}
            className="object-contain relative z-10"
          />
          {flowBalanceLoading ? (
            <div className="animate-pulse relative z-10">
              <div className="h-3 bg-white/30 rounded w-10"></div>
            </div>
          ) : (
            <span className="text-sm font-medium text-white relative z-10">
              {flowBalance ? formatBalance(flowBalance) : "0"}
            </span>
          )}
        </button>
      )}
      
      {!isConnected ? (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
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
      ) : (
        <button
          onClick={() => disconnect()}
          className="cursor-pointer relative overflow-hidden rounded-full h-10 px-4 font-medium text-white shadow-sm border border-gray-300/30 transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 opacity-80">
            <Balatro
              isRotate={true}
              mouseInteraction={false}
              pixelFilter={400}
              color1="#EF4444"
              color2="#DC2626"
              color3="#B91C1C"
              spinSpeed={1.2}
              contrast={2.5}
              lighting={0.4}
            />
          </div>
          <span className="relative z-10">
            Disconnect wallet
          </span>
        </button>
      )}
    </div>
  );
}
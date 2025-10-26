"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import FuzzyText from "./FuzzyText";
import { motion, AnimatePresence } from "framer-motion";
import Balatro from "./Balatro";
import { useGetPrice } from "../hooks/useGetPrice";
import { useGetBalance } from "../hooks/useGetBalance";
import { useGetFlowBalance } from "../hooks/useGetFlowBalance";
import { useExecuteSpin, SpinStatus } from "../hooks/useExecuteSpin";
import { formatEther } from "viem";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const nftImages = [
  {
    src: "/Images/NFT/nft-common-kitty-lette.png",
    type: "common",
    name: "Common Sailor Cat 🐾",
    rarity: "Common",
  },
  {
    src: "/Images/NFT/nft-rare-kitty-lette.png",
    type: "rare",
    name: "Rare Pirate Cat 🏴‍☠️",
    rarity: "Rare",
  },
  {
    src: "/Images/NFT/nft-legendary-kitty-lette.png",
    type: "legendary",
    name: "Legendary Captain Cat 👑",
    rarity: "Legendary",
  },
  {
    src: "/Images/NFT/nft-mythic.png",
    type: "mythic",
    name: "Mythic Treasure Master Cat 🔮",
    rarity: "Mythic",
  },
];

interface CompactRouletteWheelProps {
  onPopupChange?: (isOpen: boolean) => void;
}

export function CompactRouletteWheel({ onPopupChange }: CompactRouletteWheelProps = {}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<(typeof nftImages)[0] | null>(
    null
  );
  const hoverIntensity = 0.4;
  const { price, loading: priceLoading } = useGetPrice();
  const { balance, loading: balanceLoading } = useGetBalance();
  const { balance: flowBalance, loading: flowBalanceLoading } = useGetFlowBalance();
  const { isConnected } = useAccount();
  const {
    status: spinStatus,
    error: spinError,
    isApproveLoading,
    isSpinLoading,
    executeSpin,
    executeSpinWheel,
    approveHash,
    spinHash,
    reset: resetSpin,
  } = useExecuteSpin();

  const formatBalance = (balance: bigint) => {
    const formatted = formatEther(balance);
    const num = parseFloat(formatted);
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };

  const formatPrice = (priceInWei: bigint) => {
    const priceInEther = Number(priceInWei) / 10 ** 18;
    return priceInEther % 1 === 0
      ? priceInEther.toString()
      : priceInEther.toFixed(2);
  };

  useEffect(() => {
    if (approveHash && !isApproveLoading && spinStatus === SpinStatus.APPROVING) {
      executeSpinWheel();
    }
  }, [approveHash, isApproveLoading, spinStatus, executeSpinWheel]);

  useEffect(() => {
    if (spinHash && !isSpinLoading && spinStatus === SpinStatus.SPINNING) {
      setIsSpinning(true);
      setLastResult(null);
      
      setTimeout(() => {
        // eslint-disable-next-line react-hooks/immutability
        const selectedNft = getRandomNFTByWeight();
        setLastResult(selectedNft);
        setIsSpinning(false);
        resetSpin();
      }, 6000);
    }
  }, [spinHash, isSpinLoading, spinStatus, resetSpin]);

  useEffect(() => {
    if (spinError) {
      console.error("Spin error:", spinError);
      setIsSpinning(false);
    }
  }, [spinError]);

  useEffect(() => {
    onPopupChange?.(!!lastResult && !isSpinning);
  }, [lastResult, isSpinning, onPopupChange]);

  const testingMode = "mythic" as
    | "normal"
    | "common"
    | "rare"
    | "legendary"
    | "mythic"
    | "equal";

  const getProbabilityWeights = () => {
    switch (testingMode) {
      case "common":
        return [100, 15, 4, 1]; // 80% Common, 15% Rare, 4% Legendary, 1% Mythic
      case "rare":
        return [10, 100, 15, 5]; // 10% Common, 70% Rare, 15% Legendary, 5% Mythic
      case "legendary":
        return [5, 15, 100, 10]; // 5% Common, 15% Rare, 70% Legendary, 10% Mythic
      case "mythic":
        return [1, 1, 1, 97]; // 5% Common, 10% Rare, 15% Legendary, 70% Mythic
      case "equal":
        return [25, 25, 25, 25]; // Equal chance for all
      case "normal":
      default:
        return [60, 25, 12, 3]; // 60% Common, 25% Rare, 12% Legendary, 3% Mythic
    }
  };

  // Weighted random selection function
  const getRandomNFTByWeight = () => {
    const weights = getProbabilityWeights();
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < weights.length; i++) {
      if (random <= weights[i]) {
        return nftImages[i];
      }
      random -= weights[i];
    }

    // Fallback to last item
    return nftImages[nftImages.length - 1];
  };

  const handleSpin = async () => {
    if (!price) return;
    
    try {
      await executeSpin(price);
    } catch (error) {
      console.error("Failed to execute spin:", error);
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="relative rounded-3xl p-8 border border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
          <Balatro
            isRotate={true}
            mouseInteraction={true}
            pixelFilter={700}
            color1="#1e3a8a"
            color2="#0f172a"
            color3="#fbbf24"
            contrast={2.8}
            lighting={0.3}
            spinAmount={0.15}
            spinSpeed={1.5}
            spinRotation={-1.2}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10">
          <div className="mb-6">
            <FuzzyText baseIntensity={0.04} hoverIntensity={hoverIntensity}>
              Pirate Treasure Vault
            </FuzzyText>
            <p className="text-base font-bold text-white leading-relaxed mt-2">
              Spin the wheel of fortune and claim your legendary treasure!
            </p>

            {/* Testing Mode Indicator
            {testingMode !== "normal" && (
              <div className="mt-3 px-3 py-2 bg-yellow-500/90 text-black rounded-lg text-sm font-semibold">
                🧪 TESTING MODE: {testingMode.toUpperCase()}
                {testingMode === "equal" && " (25% each)"}
                {testingMode === "common" && " (80% common)"}
                {testingMode === "rare" && " (70% rare)"}
                {testingMode === "legendary" && " (70% legendary)"}
                {testingMode === "mythic" && " (70% mythic)"}
              </div>
            )} */}
          </div>
        </div>

        {/* NFT Display Container */}
        <div className="relative z-10 w-full bg-white rounded-2xl border-2 border-gray-100 mb-8 shadow-inner ">
          {isSpinning ? (
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-full max-w-sm">
                {/* Train Animation with Full-Size NFT Images */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  {/* Background Image - Always Visible (Mythic for FOMO) */}
                  <div className="absolute inset-0">
                    <Image
                      src={nftImages[3].src}
                      alt="Background NFT"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Continuous Train of Full-Size NFT Images */}
                  <div className="absolute inset-0">
                    <div
                      className="flex animate-[trainPassThrough_6s_linear_infinite] h-full"
                      style={{ width: "400%" }}
                    >
                      {/* Create sequence of all 4 unique NFT images */}
                      {nftImages.map((nft, index) => (
                        <div
                          key={`unique-${index}`}
                          className="shrink-0 h-full relative"
                          style={{ width: "25%" }}
                        >
                          <Image
                            src={nft.src}
                            alt={nft.name}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                          {/* Rarity Badge */}
                          <div
                            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic"
                              ? "✨ " + nft.rarity
                              : nft.rarity}
                          </div>
                        </div>
                      ))}
                      {/* Repeat the sequence for seamless loop */}
                      {nftImages.map((nft, index) => (
                        <div
                          key={`repeat-${index}`}
                          className="shrink-0 h-full relative"
                          style={{ width: "25%" }}
                        >
                          <Image
                            src={nft.src}
                            alt={nft.name}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                          {/* Rarity Badge */}
                          <div
                            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic"
                              ? "✨ " + nft.rarity
                              : nft.rarity}
                          </div>
                        </div>
                      ))}
                      {/* Third repetition for extra smoothness */}
                      {nftImages.map((nft, index) => (
                        <div
                          key={`extra-${index}`}
                          className="shrink-0 h-full relative"
                          style={{ width: "25%" }}
                        >
                          <Image
                            src={nft.src}
                            alt={nft.name}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                          {/* Rarity Badge */}
                          <div
                            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic"
                              ? "✨ " + nft.rarity
                              : nft.rarity}
                          </div>
                        </div>
                      ))}
                      {/* Fourth repetition for complete seamless experience */}
                      {nftImages.map((nft, index) => (
                        <div
                          key={`final-${index}`}
                          className="shrink-0 h-full relative"
                          style={{ width: "25%" }}
                        >
                          <Image
                            src={nft.src}
                            alt={nft.name}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                          {/* Rarity Badge */}
                          <div
                            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic"
                              ? "✨ " + nft.rarity
                              : nft.rarity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spinning Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 z-20 backdrop-blur-sm animate-pulse">
                    Spinning...
                  </div>
                </div>

                {/* Card Content - same structure as static version */}
                <div className="p-4 space-y-3">
                  {/* NFT Name */}
                  <h3 className="text-lg font-bold text-gray-900 animate-pulse">
                    Choose Your Treasure!
                  </h3>

                  {/* NFT Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Collectible</span>
                      <span className="font-medium">NFT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Creator</span>
                      <span className="font-medium">Kitty Lette</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rarity</span>
                      <span className="font-medium text-gray-800 animate-pulse">
                        Determining...
                      </span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-blue-600">
                      <span className="text-lg font-bold animate-pulse">
                        🎯
                      </span>
                      <span className="text-xs">selecting</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <span className="text-lg font-bold animate-pulse">
                        🎲
                      </span>
                      <span className="text-xs">rolling</span>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 animate-pulse">
                      In Progress
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 w-full max-w-sm">
                {/* NFT Image */}
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={nftImages[3].src}
                    alt={nftImages[3].name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                  {/* White Sparkle Effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute top-4 left-4 text-white text-lg animate-sparkle"
                      style={{ animationDelay: "0s" }}
                    >
                      ✦
                    </div>
                    <div
                      className="absolute top-8 right-6 text-white text-sm animate-sparkle"
                      style={{ animationDelay: "0.3s" }}
                    >
                      ✧
                    </div>
                    <div
                      className="absolute top-16 left-8 text-white text-xs animate-sparkle"
                      style={{ animationDelay: "0.6s" }}
                    >
                      ✦
                    </div>
                    <div
                      className="absolute bottom-8 right-4 text-white text-lg animate-sparkle"
                      style={{ animationDelay: "0.9s" }}
                    >
                      ✧
                    </div>
                    <div
                      className="absolute bottom-16 left-6 text-white text-sm animate-sparkle"
                      style={{ animationDelay: "1.2s" }}
                    >
                      ✦
                    </div>
                    <div
                      className="absolute top-12 right-12 text-white text-xs animate-sparkle"
                      style={{ animationDelay: "1.5s" }}
                    >
                      ✧
                    </div>
                  </div>
                  {/* Mythic Rarity Badge for FOMO */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    ✨ Mythic
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  {/* NFT Name */}
                  <h3 className="text-lg font-bold text-gray-900">
                    {nftImages[3].name}
                  </h3>

                  {/* NFT Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Collectible</span>
                      <span className="font-medium">NFT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Creator</span>
                      <span className="font-medium">Kitty Lette</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rarity</span>
                      <span className="font-medium text-orange-600">
                        {nftImages[3].rarity}
                      </span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-orange-600">
                      <span className="text-lg font-bold">7</span>
                      <span className="text-xs">collectors</span>
                    </div>
                    <div className="flex items-center space-x-1 text-orange-600">
                      <span className="text-lg font-bold">0.1%</span>
                      <span className="text-xs">drop rate</span>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      ✨ Ultra Rare
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FROTH Balance - Minimalist */}
        {isConnected && (
          <div className="relative z-10 mb-4">
            <div className="flex items-center justify-center space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <Image
                src="/Images/Logo/froth-token-logo.png"
                alt="FROTH"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="text-white/80 text-xs font-medium">FROTH:</span>
              {balanceLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-white/30 rounded w-12"></div>
                </div>
              ) : (
                <span className="text-white font-semibold text-sm">
                  {balance ? formatBalance(balance) : "0"}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="relative z-10">
          {!isConnected ? (
            <div className="flex justify-center">
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button 
                    onClick={openConnectModal}
                    className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600/30"
                  >
                    <div className="absolute inset-0 opacity-30">
                      <Balatro
                        isRotate={true}
                        mouseInteraction={false}
                        pixelFilter={300}
                        color1="#2a2a2a"
                        color2="#1a1a1a"
                        color3="#000000"
                        spinSpeed={0.8}
                        contrast={1.5}
                        lighting={0.2}
                      />
                    </div>
                    <span className="cursor-pointer relative z-10">Connect your wallet first</span>
                  </Button>
                )}
              </ConnectButton.Custom>
            </div>
          ) : (
            <Button
              onClick={handleSpin}
              disabled={
                isSpinning || 
                priceLoading || 
                spinStatus === SpinStatus.APPROVING || 
                spinStatus === SpinStatus.SPINNING ||
                isApproveLoading ||
                isSpinLoading
              }
              className="cursor-pointer bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-white px-11 py-5 rounded-2xl font-bold text-sm tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-slate-600"
            >
              {spinStatus === SpinStatus.APPROVING || isApproveLoading ? (
                "Approving..."
              ) : spinStatus === SpinStatus.SPINNING || isSpinLoading ? (
                "Processing..."
              ) : isSpinning ? (
                "Spinning..."
              ) : priceLoading ? (
                "Loading..."
              ) : (
                <div className="flex items-center space-x-2">
                  <span>
                    Spin the Wheel ({price ? formatPrice(price) : "0.00"}
                  </span>
                  <Image
                    src="/Images/Logo/froth-token-logo.png"
                    alt="FROTH"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span>FROTH)</span>
                </div>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Clean Minimalist Pop-up Modal */}
      <AnimatePresence>
        {lastResult && !isSpinning && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.4,
              }}
            >
              {/* Balatro Background for Popup - Dynamic based on rarity */}
              <div className="absolute inset-0 z-0">
                <Balatro
                  isRotate={true}
                  mouseInteraction={false}
                  pixelFilter={
                    lastResult.type === "mythic" ||
                    lastResult.type === "legendary"
                      ? 400
                      : 600
                  }
                  color1={
                    lastResult.type === "mythic"
                      ? "#a855f7" // Purple
                      : lastResult.type === "legendary"
                      ? "#f59e0b" // Amber
                      : lastResult.type === "rare"
                      ? "#8b5cf6" // Bright violet
                      : "#3b82f6" // Blue
                  }
                  color2={
                    lastResult.type === "mythic"
                      ? "#06b6d4" // Cyan
                      : lastResult.type === "legendary"
                      ? "#dc2626" // Red
                      : lastResult.type === "rare"
                      ? "#6366f1" // Indigo
                      : "#1e3a8a" // Deep blue
                  }
                  color3={
                    lastResult.type === "mythic"
                      ? "#1e1b4b" // Deep purple
                      : lastResult.type === "legendary"
                      ? "#7c2d12" // Dark brown
                      : lastResult.type === "rare"
                      ? "#312e81" // Dark indigo
                      : "#0f172a" // Dark slate
                  }
                  contrast={
                    lastResult.type === "mythic" ||
                    lastResult.type === "legendary"
                      ? 4.5
                      : 3.0
                  }
                  lighting={
                    lastResult.type === "mythic" ||
                    lastResult.type === "legendary"
                      ? 0.6
                      : 0.4
                  }
                  spinAmount={
                    lastResult.type === "mythic" ||
                    lastResult.type === "legendary"
                      ? 0.35
                      : 0.2
                  }
                  spinSpeed={
                    lastResult.type === "mythic" ||
                    lastResult.type === "legendary"
                      ? 1.8
                      : 0.8
                  }
                  spinRotation={
                    lastResult.type === "mythic" ||
                    lastResult.type === "legendary"
                      ? -1.5
                      : -0.8
                  }
                />
              </div>

              {/* Overlay for readability - Adjusted based on rarity */}
              <div
                className={`absolute inset-0 z-5 ${
                  lastResult.type === "mythic"
                    ? "bg-gradient-to-b from-purple-50/70 via-cyan-50/60 to-purple-50/70"
                    : lastResult.type === "legendary"
                    ? "bg-gradient-to-b from-orange-50/75 via-red-50/65 to-orange-50/75"
                    : lastResult.type === "rare"
                    ? "bg-gradient-to-b from-purple-50/80 via-purple-50/70 to-purple-50/80"
                    : "bg-gradient-to-b from-white/85 via-white/75 to-white/85"
                }`}
              />
              {/* Header */}
              <div className="relative z-10 p-6 pb-4 border-b border-white/20">
                <motion.button
                  onClick={() => setLastResult(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-gray-600 text-lg cursor-pointer">
                    ×
                  </span>
                </motion.button>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Congratulations!
                  </h3>
                  <p className="text-sm text-gray-600">You won a treasure</p>
                </motion.div>
              </div>

              {/* NFT Display */}
              <div className="relative z-10 p-6">
                <motion.div
                  className="relative mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {/* Aura Effect for All Rarities */}
                  <motion.div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-xl">
                      <Balatro
                        isRotate={true}
                        mouseInteraction={false}
                        pixelFilter={
                          lastResult.type === "mythic"
                            ? 250
                            : lastResult.type === "legendary"
                            ? 300
                            : lastResult.type === "rare"
                            ? 400
                            : 500
                        }
                        color1={
                          lastResult.type === "mythic"
                            ? "#a855f7" // Purple
                            : lastResult.type === "legendary"
                            ? "#f59e0b" // Amber
                            : lastResult.type === "rare"
                            ? "#8b5cf6" // Bright violet
                            : "#0ea5e9" // Sky blue
                        }
                        color2={
                          lastResult.type === "mythic"
                            ? "#06b6d4" // Cyan
                            : lastResult.type === "legendary"
                            ? "#dc2626" // Red
                            : lastResult.type === "rare"
                            ? "#6366f1" // Indigo
                            : "#0284c7" // Blue
                        }
                        color3={
                          lastResult.type === "mythic"
                            ? "#1e1b4b" // Deep purple
                            : lastResult.type === "legendary"
                            ? "#7c2d12" // Dark brown
                            : lastResult.type === "rare"
                            ? "#312e81" // Dark indigo
                            : "#0c4a6e" // Dark blue
                        }
                        contrast={
                          lastResult.type === "mythic"
                            ? 6.0
                            : lastResult.type === "legendary"
                            ? 5.5
                            : lastResult.type === "rare"
                            ? 4.0
                            : 3.0
                        }
                        lighting={
                          lastResult.type === "mythic"
                            ? 0.8
                            : lastResult.type === "legendary"
                            ? 0.7
                            : lastResult.type === "rare"
                            ? 0.5
                            : 0.3
                        }
                        spinAmount={
                          lastResult.type === "mythic"
                            ? 0.5
                            : lastResult.type === "legendary"
                            ? 0.4
                            : lastResult.type === "rare"
                            ? 0.25
                            : 0.15
                        }
                        spinSpeed={
                          lastResult.type === "mythic"
                            ? 2.5
                            : lastResult.type === "legendary"
                            ? 2.0
                            : lastResult.type === "rare"
                            ? 1.2
                            : 0.6
                        }
                        spinRotation={
                          lastResult.type === "mythic"
                            ? -2.0
                            : lastResult.type === "legendary"
                            ? -1.5
                            : lastResult.type === "rare"
                            ? -1.0
                            : -0.5
                        }
                      />
                    </div>
                    <div
                      className={`absolute inset-0 rounded-xl ${
                        lastResult.type === "mythic"
                          ? "bg-gradient-to-br from-purple-200/40 via-cyan-200/30 to-purple-200/40"
                          : lastResult.type === "legendary"
                          ? "bg-gradient-to-br from-orange-200/50 via-red-200/40 to-orange-200/50"
                          : lastResult.type === "rare"
                          ? "bg-gradient-to-br from-violet-200/45 via-indigo-200/35 to-violet-200/45"
                          : "bg-gradient-to-br from-sky-200/40 via-blue-200/30 to-sky-200/40"
                      }`}
                    />
                  </motion.div>

                  {/* Main Image Container */}
                  <div
                    className={`relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden ${
                      lastResult.type === "mythic"
                        ? "border-2 border-purple-400/60 shadow-lg shadow-purple-300/50"
                        : lastResult.type === "legendary"
                        ? "border-2 border-yellow-300/60 shadow-lg shadow-yellow-200/50"
                        : lastResult.type === "rare"
                        ? "border-2 border-violet-300/60 shadow-lg shadow-violet-200/50"
                        : "border-2 border-sky-300/60 shadow-md shadow-sky-200/40"
                    }`}
                  >
                    <Image
                      src={lastResult.src}
                      alt={lastResult.name}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full relative z-10"
                    />

                    {/* Shimmer Effect for All Rarities */}
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration:
                          lastResult.type === "mythic"
                            ? 1.5
                            : lastResult.type === "legendary"
                            ? 2
                            : lastResult.type === "rare"
                            ? 2.5
                            : 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                      }}
                    >
                      <div
                        className={`h-full w-1/3 transform rotate-12 ${
                          lastResult.type === "mythic"
                            ? "bg-gradient-to-r from-transparent via-purple-200/60 to-transparent"
                            : lastResult.type === "legendary"
                            ? "bg-gradient-to-r from-transparent via-orange-200/50 to-transparent"
                            : lastResult.type === "rare"
                            ? "bg-gradient-to-r from-transparent via-violet-200/45 to-transparent"
                            : "bg-gradient-to-r from-transparent via-sky-200/35 to-transparent"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Enhanced Rarity Badge */}
                  <motion.div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${
                      lastResult.type === "mythic"
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/50"
                        : lastResult.type === "legendary"
                        ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg shadow-orange-500/50"
                        : lastResult.type === "rare"
                        ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/40"
                        : "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md shadow-sky-400/40"
                    }`}
                    initial={{ scale: 0, x: 10, y: -10 }}
                    animate={{ scale: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {lastResult.type === "mythic" && "✨ "}
                    {lastResult.type === "legendary" && "👑 "}
                    {lastResult.type === "rare" && "💎 "}
                    {lastResult.type === "common" && "⭐ "}
                    {lastResult.rarity}
                  </motion.div>
                </motion.div>

                {/* NFT Info */}
                <motion.div
                  className="text-center mb-6"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">
                    {lastResult.name}
                  </h4>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                    <span>NFT</span>
                    <span>•</span>
                    <span>Kitty Lette</span>
                  </div>

                  {/* Transaction Hash - Minimalist */}
                  {spinHash && (
                    <div className="mt-4 text-center">
                      <a
                        href={`https://evm-testnet.flowscan.io/tx/${spinHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-xs text-blue-600 hover:text-blue-800 transition-colors group"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="underline group-hover:no-underline">View transaction hash</span>
                      </a>
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={handleSpin}
                    className="cursor-pointer w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Spin Again
                  </motion.button>

                  <motion.button
                    onClick={() => setLastResult(null)}
                    className="cursor-pointer w-full bg-white/80 hover:bg-white/90 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors backdrop-blur-sm border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

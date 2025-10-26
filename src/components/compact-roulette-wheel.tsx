"use client";

import { useState, useEffect } from "react";
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
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const nftImages = [
  { src: "/Images/NFT/nft-common-kitty-lette.png", type: "common", name: "Common Sailor Cat 🐾", rarity: "Common" },
  { src: "/Images/NFT/nft-rare-kitty-lette.png", type: "rare", name: "Rare Pirate Cat 🏴‍☠️", rarity: "Rare" },
  { src: "/Images/NFT/nft-legendary-kitty-lette.png", type: "legendary", name: "Legendary Captain Cat 👑", rarity: "Legendary" },
  { src: "/Images/NFT/nft-mythic.png", type: "mythic", name: "Mythic Treasure Master Cat 🔮", rarity: "Mythic" },
];

interface CompactRouletteWheelProps {
  onPopupChange?: (isOpen: boolean) => void;
}

export function CompactRouletteWheel({ onPopupChange }: CompactRouletteWheelProps = {}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<(typeof nftImages)[0] | null>(null);

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
    return priceInEther % 1 === 0 ? priceInEther.toString() : priceInEther.toFixed(2);
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

  const testingMode = "mythic" as "normal" | "common" | "rare" | "legendary" | "mythic" | "equal";

  const getProbabilityWeights = () => {
    switch (testingMode) {
      case "common":
        return [100, 15, 4, 1];
      case "rare":
        return [10, 100, 15, 5];
      case "legendary":
        return [5, 15, 100, 10];
      case "mythic":
        return [1, 1, 1, 97];
      case "equal":
        return [25, 25, 25, 25];
      case "normal":
      default:
        return [60, 25, 12, 3];
    }
  };

  const getRandomNFTByWeight = () => {
    const weights = getProbabilityWeights();
    const totalWeight = weights.reduce((s, w) => s + w, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < weights.length; i++) {
      if (random <= weights[i]) return nftImages[i];
      random -= weights[i];
    }
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
    <div className="text-center space-y-5">
      <div className="relative rounded-2xl p-2 border border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
          <Balatro
            isRotate
            mouseInteraction
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

        {/* Header */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="mb-4">
            <FuzzyText baseIntensity={0.04} hoverIntensity={hoverIntensity}>
              Pirate Treasure Vault
            </FuzzyText>
            <p className="text-xs md:text-sm font-medium text-white/90 leading-relaxed mt-1">
              Spin the wheel of fortune and claim your legendary treasure!
            </p>
          </div>
        </div>

        {/* KARTU NFT — DILEBARKAN */}
        <div className="relative z-10 w-full bg-white rounded-2xl border mb-6 overflow-hidden">
          {isSpinning ? (
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <div className="absolute inset-0">
                    <Image src={nftImages[3].src} alt="Background NFT" width={400} height={400} className="object-cover w-full h-full" />
                  </div>
                  <div className="absolute inset-0">
                    <div className="flex animate-[trainPassThrough_6s_linear_infinite] h-full" style={{ width: "400%" }}>
                      {nftImages.map((nft, index) => (
                        <div key={`unique-${index}`} className="shrink-0 h-full relative" style={{ width: "25%" }}>
                          <Image src={nft.src} alt={nft.name} width={400} height={400} className="object-cover w-full h-full" />
                          <div
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic" ? "✨ " + nft.rarity : nft.rarity}
                          </div>
                        </div>
                      ))}
                      {nftImages.map((nft, index) => (
                        <div key={`repeat-${index}`} className="shrink-0 h-full relative" style={{ width: "25%" }}>
                          <Image src={nft.src} alt={nft.name} width={400} height={400} className="object-cover w-full h-full" />
                          <div
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic" ? "✨ " + nft.rarity : nft.rarity}
                          </div>
                        </div>
                      ))}
                      {nftImages.map((nft, index) => (
                        <div key={`extra-${index}`} className="shrink-0 h-full relative" style={{ width: "25%" }}>
                          <Image src={nft.src} alt={nft.name} width={400} height={400} className="object-cover w-full h-full" />
                          <div
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic" ? "✨ " + nft.rarity : nft.rarity}
                          </div>
                        </div>
                      ))}
                      {nftImages.map((nft, index) => (
                        <div key={`final-${index}`} className="shrink-0 h-full relative" style={{ width: "25%" }}>
                          <Image src={nft.src} alt={nft.name} width={400} height={400} className="object-cover w-full h-full" />
                          <div
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-sm ${
                              nft.type === "mythic"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : nft.type === "legendary"
                                ? "bg-yellow-100/90 text-yellow-800"
                                : nft.type === "rare"
                                ? "bg-purple-100/90 text-purple-800"
                                : "bg-blue-100/90 text-blue-800"
                            }`}
                          >
                            {nft.type === "mythic" ? "✨ " + nft.rarity : nft.rarity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/90 text-gray-800 z-20 backdrop-blur-sm animate-pulse">
                    Spinning...
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 animate-pulse">Choose Your Treasure!</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between"><span>Collectible</span><span className="font-medium">NFT</span></div>
                    <div className="flex justify-between"><span>Creator</span><span className="font-medium">Kitty Lette</span></div>
                    <div className="flex justify-between"><span>Rarity</span><span className="font-medium text-gray-800 animate-pulse">Determining...</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-blue-600"><span className="text-base font-bold animate-pulse">🎯</span><span className="text-[11px]">selecting</span></div>
                    <div className="flex items-center space-x-1 text-blue-600"><span className="text-base font-bold animate-pulse">🎲</span><span className="text-[11px]">rolling</span></div>
                    <div className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 animate-pulse">In Progress</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]">
                <div className="relative aspect-square bg-gray-50">
                  <Image src={nftImages[3].src} alt={nftImages[3].name} width={400} height={400} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-3 left-3 text-white text-base animate-sparkle" style={{ animationDelay: "0s" }}>✦</div>
                    <div className="absolute top-7 right-5 text-white text-sm animate-sparkle" style={{ animationDelay: "0.3s" }}>✧</div>
                    <div className="absolute top-14 left-8 text-white text-xs animate-sparkle" style={{ animationDelay: "0.6s" }}>✦</div>
                    <div className="absolute bottom-7 right-4 text-white text-base animate-sparkle" style={{ animationDelay: "0.9s" }}>✧</div>
                    <div className="absolute bottom-14 left-6 text-white text-sm animate-sparkle" style={{ animationDelay: "1.2s" }}>✦</div>
                    <div className="absolute top-12 right-12 text-white text-xs animate-sparkle" style={{ animationDelay: "1.5s" }}>✧</div>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">✨ Mythic</div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">{nftImages[3].name}</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between"><span>Collectible</span><span className="font-medium">NFT</span></div>
                    <div className="flex justify-between"><span>Creator</span><span className="font-medium">Kitty Lette</span></div>
                    <div className="flex justify-between"><span>Rarity</span><span className="font-medium text-orange-600">{nftImages[3].rarity}</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-orange-600"><span className="text-base font-bold">7</span><span className="text-[11px]">collectors</span></div>
                    <div className="flex items-center space-x-1 text-orange-600"><span className="text-base font-bold">0.1%</span><span className="text-[11px]">drop rate</span></div>
                    <div className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">✨ Ultra Rare</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FROTH Balance */}
        {isConnected && (
          <div className="relative z-10 mb-3">
            <div className="mx-auto inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/20">
              <Image src="/Images/Logo/froth-token-logo.png" alt="FROTH" width={16} height={16} className="object-contain" />
              <span className="text-white/80 text-[12px] font-medium">FROTH:</span>
              {balanceLoading ? (
                <div className="animate-pulse"><div className="h-4 bg-white/30 rounded w-12"></div></div>
              ) : (
                <span className="text-white font-semibold text-sm">{balance ? formatBalance(balance) : "0"}</span>
              )}
            </div>
          </div>
        )}

        {/* Tombol */}
        <div className="relative z-10">
          {!isConnected ? (
            <div className="flex justify-center">
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button onClick={openConnectModal} className="cursor-pointer relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white h-10 px-4 rounded-lg text-sm font-medium transition-colors border border-gray-700/30 shadow">
                    <span className="cursor-pointer relative z-10">Connect your wallet</span>
                  </Button>
                )}
              </ConnectButton.Custom>
            </div>
          ) : (
            <Button
              onClick={handleSpin}
              disabled={isSpinning || priceLoading || spinStatus === SpinStatus.APPROVING || spinStatus === SpinStatus.SPINNING || isApproveLoading || isSpinLoading}
              className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white h-11 px-6 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinStatus === SpinStatus.APPROVING || isApproveLoading
                ? "Approving..."
                : spinStatus === SpinStatus.SPINNING || isSpinLoading
                ? "Processing..."
                : isSpinning
                ? "Spinning..."
                : priceLoading
                ? "Loading..."
                : (
                  <div className="flex items-center gap-2">
                    <span>Spin the Wheel ({price ? formatPrice(price) : "0.00"}</span>
                    <Image src="/Images/Logo/froth-token-logo.png" alt="FROTH" width={16} height={16} className="object-contain" />
                    <span>FROTH)</span>
                  </div>
                )}
            </Button>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {lastResult && !isSpinning && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.div className="relative bg-white rounded-2xl shadow-xl max-w-[360px] w-full mx-auto overflow-hidden border border-slate-200" initial={{ scale: 0.95, opacity: 0, y: 14 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>
              <div className="p-5">
                <motion.button onClick={() => setLastResult(null)} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <span className="text-gray-600 text-lg cursor-pointer">×</span>
                </motion.button>

                <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
                  <Image src={lastResult.src} alt={lastResult.name} fill className="object-cover" />
                </div>

                <h4 className="text-base font-semibold text-slate-900">{lastResult.name}</h4>
                <p className="mt-1 text-sm text-slate-600">{lastResult.rarity} • Kitty Lette</p>

                {spinHash && (
                  <div className="mt-3">
                    <a href={`https://evm-testnet.flowscan.io/tx/${spinHash}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-slate-700 underline underline-offset-2 hover:text-slate-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View transaction
                    </a>
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Button className="h-10 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Spin again</Button>
                  <Button onClick={() => setLastResult(null)} variant="outline" className="h-10 rounded-lg">Close</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

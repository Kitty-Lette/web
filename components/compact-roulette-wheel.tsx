"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FuzzyText from "./FuzzyText";
import { motion, AnimatePresence } from "framer-motion";
import Balatro from "./Balatro";

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

export function CompactRouletteWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<(typeof nftImages)[0] | null>(
    null
  );
  const hoverIntensity = 0.4;

  const handleSpin = () => {
    setIsSpinning(true);
    setLastResult(null);

    // Simulate spin duration with train animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * nftImages.length);
      const selectedNft = nftImages[randomIndex];
      setLastResult(selectedNft);
      setIsSpinning(false);
    }, 6000);
  };

  return (
    <div className="text-center space-y-8">
      {/* NFT Collection Grid */}
      <div className="relative rounded-3xl p-8 border border-gray-200 shadow-sm overflow-hidden">
        {/* Balatro WebGL Background */}
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

        <div className="relative z-10">
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            className="cursor-pointer bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-white px-16 py-5 rounded-2xl font-bold text-lg tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-slate-600"
          >
            {isSpinning ? "Spwhenning..." : "Spin the Wheel"}
          </Button>
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
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.4
              }}
            >
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-gray-100">
                <motion.button
                  onClick={() => setLastResult(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-gray-400 text-lg">×</span>
                </motion.button>
                
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Congratulations!
                  </h3>
                  <p className="text-sm text-gray-500">
                    You won a treasure
                  </p>
                </motion.div>
              </div>

              {/* NFT Display */}
              <div className="p-6">
                <motion.div
                  className="relative mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="w-full aspect-square bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <Image
                      src={lastResult.src}
                      alt={lastResult.name}
                      width={200}
                      height={200}
                      className="object-contain w-full h-full rounded-xl"
                    />
                  </div>
                  
                  {/* Simple Rarity Badge */}
                  <motion.div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium ${
                      lastResult.type === "mythic"
                        ? "bg-yellow-500 text-white"
                        : lastResult.type === "legendary"
                        ? "bg-yellow-100 text-yellow-800"
                        : lastResult.type === "rare"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                    initial={{ scale: 0, x: 10, y: -10 }}
                    animate={{ scale: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
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
                  <h4 className="font-semibold text-gray-900 mb-2 text-base">
                    {lastResult.name}
                  </h4>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span>NFT</span>
                    <span>•</span>
                    <span>Kitty Lette</span>
                  </div>
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
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Spin Again
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setLastResult(null)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors"
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
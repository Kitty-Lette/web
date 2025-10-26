"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const nftImages = [
  { src: "/Images/NFT/nft-common-kitty-lette.png", type: "common", name: "Common Sailor Cat", rarity: "Common" },
  { src: "/Images/NFT/nft-rare-kitty-lette.png", type: "rare", name: "Rare Pirate Cat", rarity: "Rare" },
  { src: "/Images/NFT/nft-legendary-kitty-lette.png", type: "legendary", name: "Legendary Captain Cat", rarity: "Legendary" }
]

export function CompactRouletteWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastResult, setLastResult] = useState<typeof nftImages[0] | null>(null)
  const [animatingImages, setAnimatingImages] = useState<typeof nftImages>([])

  const handleSpin = () => {
    setIsSpinning(true)
    setLastResult(null)
    
    // Create repeating train of images for continuous loop
    const trainImages = [...nftImages, ...nftImages, ...nftImages, ...nftImages]
    setAnimatingImages(trainImages)
    
    // Simulate spin duration - slower animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * nftImages.length)
      const selectedNft = nftImages[randomIndex]
      setLastResult(selectedNft)
      setIsSpinning(false)
      setAnimatingImages([])
    }, 6000)
  }

  return (
    <div className="text-center space-y-8">
      {/* NFT Collection Grid */}
      <div className="relative bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">NFT Collection</h3>
          <p className="text-sm text-gray-600">Spin to discover which treasure you&apos;ll claim!</p>
        </div>

        {/* NFT Display Container */}
        <div className="w-full bg-white rounded-2xl border-2 border-gray-100 mb-8 shadow-inner p-6">
          {isSpinning ? (
            <div className="relative h-32 overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                <div className="flex animate-[trainLoop_6s_ease-in-out_infinite] space-x-8">
                  {animatingImages.map((nft, index) => (
                    <div key={index} className="shrink-0 group">
                      <div className="relative mt-4 mb-8">
                        <div className="w-24 h-24 bg-white rounded-2xl border-2 border-gray-200 p-3 shadow-sm">
                          <Image
                            src={nft.src}
                            alt={nft.name}
                            width={72}
                            height={72}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        {/* Rarity Badge */}
                        <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          nft.type === 'legendary' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                          nft.type === 'rare' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                          'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {nft.rarity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 w-full max-w-sm">
                {/* NFT Image */}
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={nftImages[1].src}
                    alt={nftImages[1].name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                  {/* Rarity Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                    Mystery
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-4 space-y-3">
                  {/* NFT Name */}
                  <h3 className="text-lg font-bold text-gray-900">
                    Mystery NFT Treasure
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
                      <span className="font-medium text-gray-800">
                        Variable
                      </span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-blue-600">
                      <span className="text-lg font-bold">312</span>
                      <span className="text-xs">collectors</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <span className="text-lg font-bold">???</span>
                      <span className="text-xs">rarity</span>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      Mystery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spin Button */}
        <Button
          onClick={handleSpin}
          disabled={isSpinning}
          className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSpinning ? "SPINNING..." : "SPIN THE WHEEL"}
        </Button>
      </div>

      {/* Result Pop-up Modal */}
      {lastResult && !isSpinning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center">
              {/* Close Button */}
              <button 
                onClick={() => setLastResult(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-gray-500 text-lg">✕</span>
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Congratulations!
                </h3>
                <p className="text-gray-600">You&apos;ve won a magnificent treasure!</p>
              </div>
              
              <div className="flex flex-col items-center space-y-6 mb-6">
                <div className="relative">
                  <div className="w-40 h-40 bg-gray-50 rounded-3xl border-2 border-gray-200 p-4 shadow-lg">
                    <Image
                      src={lastResult.src}
                      alt={lastResult.name}
                      width={128}
                      height={128}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className={`absolute -top-3 -right-3 px-3 py-2 rounded-full text-sm font-bold ${
                    lastResult.type === 'legendary' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200' :
                    lastResult.type === 'rare' ? 'bg-purple-100 text-purple-800 border-2 border-purple-200' :
                    'bg-blue-100 text-blue-800 border-2 border-blue-200'
                  }`}>
                    {lastResult.rarity}
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{lastResult.name}</h4>
                  <p className="text-gray-600 mb-4">A precious addition to your collection</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 font-medium">
                      This NFT has been added to your treasure chest!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => setLastResult(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={handleSpin}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  Spin Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
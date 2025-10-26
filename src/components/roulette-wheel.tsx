"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import Image from "next/image"

export function RouletteWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastResult, setLastResult] = useState<"rare" | "common" | null>(null)

  const handleSpin = () => {
    setIsSpinning(true)
    
    // Simulate spin duration
    setTimeout(() => {
      const isRare = Math.random() < 0.2 // 20% chance for rare
      setLastResult(isRare ? "rare" : "common")
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className={`w-80 h-80 rounded-full border-8 border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center relative overflow-hidden ${isSpinning ? 'animate-spin' : 'animate-float'} ${!isSpinning ? 'animate-pulse-glow' : ''}`}>
          {/* Roulette sections */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
            <div className="text-white font-bold text-xl">
              {isSpinning ? "SPINNING..." : "KITTY LETTE"}
            </div>
          </div>
          
          {/* Pointer */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 z-10"></div>
        </div>
        
        {/* Kitty logo in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
          <Image
            src="/Images/Logo/kittylette.png"
            alt="Kitty Lette"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        variant="gradient"
        size="lg"
        className="px-12 py-6 text-xl font-bold transform hover:scale-105 transition-transform cursor-pointer"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </Button>

      {lastResult && !isSpinning && (
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">
              {lastResult === "rare" ? "🌟 RARE NFT!" : "✨ COMMON NFT!"}
            </h3>
            <p className="text-gray-600">
              You&apos;ve won a {lastResult} Kitty Lette NFT collectible!
            </p>
            <div className="mt-4 p-4 from-purple-100 to-pink-100 rounded-lg">
              <div className="w-20 h-20 mx-auto from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🐱</span>
              </div>
              <p className="mt-2 font-semibold">
                {lastResult === "rare" ? "Golden Pirate Cat" : "Sailor Cat"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
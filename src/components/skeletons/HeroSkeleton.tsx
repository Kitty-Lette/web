"use client";

import { WheelSkeleton } from "./WheelSkeleton";

export function HeroSkeleton() {
  return (
    <div className="grid md:grid-cols-2 min-h-[400px]">
      {/* Left side - Wheel skeleton */}
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
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-56 mx-auto animate-pulse"></div>
          </div>

          <WheelSkeleton />
        </div>
      </div>

      {/* Right side - Background image skeleton */}
      <div className="relative bg-gray-200 animate-pulse hidden md:block">
        {/* Background image shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text skeleton */}
        <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5">
          <div className="space-y-3">
            <div className="h-6 md:h-8 bg-white/30 rounded w-full"></div>
            <div className="h-6 md:h-8 bg-white/30 rounded w-4/5"></div>
            <div className="h-6 md:h-8 bg-white/30 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
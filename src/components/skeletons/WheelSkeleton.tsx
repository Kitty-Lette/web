"use client";

export function WheelSkeleton() {
  return (
    <div className="text-center space-y-5">
      <div className="relative rounded-2xl p-9 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
        {/* Content Layer */}
        <div className="relative z-10">
          <div className="mb-4">
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-300 rounded mx-auto w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto w-64"></div>
          </div>
        </div>

        {/* NFT Display Container Skeleton */}
        <div className="relative z-10 w-full bg-white rounded-xl border-2 border-gray-100 mb-5 shadow-inner">
          <div className="flex justify-center">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-full max-w-xs">
              {/* NFT Image Skeleton */}
              <div className="relative aspect-square bg-gray-200">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                
                {/* Rarity Badge Skeleton */}
                <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 rounded-full"></div>
              </div>

              {/* Card Content Skeleton */}
              <div className="p-3 space-y-2">
                {/* NFT Name Skeleton */}
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>

                {/* NFT Details Skeleton */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-8"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-10"></div>
                    <div className="h-3 bg-gray-200 rounded w-14"></div>
                  </div>
                </div>

                {/* Stats Row Skeleton */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-6"></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-8"></div>
                  </div>
                  <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FROTH Balance Skeleton */}
        <div className="relative z-10 mb-3">
          <div className="flex items-center justify-center space-x-2 bg-gray-200 rounded-lg px-2 py-1 border border-gray-300 w-32 mx-auto">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
            <div className="h-3 bg-gray-300 rounded w-8"></div>
          </div>
        </div>

        {/* Spin Button Skeleton */}
        <div className="relative z-10">
          <div className="w-48 h-12 bg-gray-300 rounded-xl mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
import Image from "next/image";
import { CompactRouletteWheel } from "@/components/compact-roulette-wheel";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-50 relative">

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative z-10">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            <div className="p-4 md:p-8 flex flex-col justify-center bg-white">
              <div className="max-w-md mx-auto w-full space-y-6 md:space-y-8">
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

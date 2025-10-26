"use client";

import { useState } from "react";
import { BackgroundSection } from "./components/BackgroundSection";
import { WalletSection } from "./components/WalletSection";
import { MainContent } from "./components/MainContent";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <BackgroundSection />
      <WalletSection isPopupOpen={isPopupOpen} />
      <MainContent onPopupChange={setIsPopupOpen} />
    </div>
  );
}

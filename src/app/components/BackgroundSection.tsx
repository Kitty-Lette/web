"use client";

import Balatro from "../../components/Balatro";

export function BackgroundSection() {
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle 600px at 0% 200px, #bfdbfe, transparent),
            radial-gradient(circle 600px at 100% 200px, #bfdbfe, transparent)
          `,
        }}
      />
      <div className="absolute inset-0 z-1 opacity-30">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#4DA6FF"
          color2="#1E90FF"
          color3="#0066CC"
          spinSpeed={3.0}
          contrast={2.8}
          lighting={0.6}
        />
      </div>
    </>
  );
}
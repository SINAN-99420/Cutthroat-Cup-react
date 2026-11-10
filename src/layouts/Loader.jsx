import { Skull } from "lucide-react";

export default function Loader({ message = "Waking up server..." }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] bg-[#0A0A0A] text-[#39FF14] font-['Poppins',sans-serif]">
      
      {/* Animated Neon Skull */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#39FF14] blur-2xl opacity-20 animate-pulse rounded-full"></div>
        <Skull size={64} className="relative z-10 animate-bounce" style={{ animationDuration: '2s' }} />
      </div>

      {/* Spinning Glow Ring */}
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#222]"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[#39FF14] border-t-transparent animate-spin"></div>
      </div>

      {/* Loading Text */}
      <h2 className="text-lg font-bold text-white tracking-wide animate-pulse">
        {message}
      </h2>
      <p className="text-xs text-gray-500 mt-2">
        (Free hosting cold start might take up to 30 seconds)
      </p>
    </div>
  );
}
import { Trophy } from "lucide-react";

export default function Bracket() {
  return (
    <div className="w-full max-w-[100vw] bg-[#050505] text-white font-['Poppins',sans-serif] p-4 md:p-6 overflow-x-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Tournament Bracket</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">World Cup 2026 Knockout Stage</p>
        </div>
      </div>

      {/* Bracket Card - Horizontal Scroll Enable Cheythittundu */}
      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-4 md:p-10 overflow-x-auto custom-scrollbar min-h-[500px] md:min-h-[600px] flex justify-start md:justify-center items-center">
        
        {/* Bracket Inner Container */}
        <div className="flex gap-6 md:gap-12 min-w-max">
          
          {/* Round of 16 */}
          <div className="flex flex-col justify-around">
            <h3 className="text-center text-[10px] md:text-xs font-bold text-gray-500 mb-4 uppercase">Round of 16</h3>
            <BracketMatch teamA="🇧🇷 Brazil" teamB="🇪🇸 Spain" />
            <BracketMatch teamA="🇦🇷 Argentina" teamB="🇳🇱 NED" />
            <BracketMatch teamA="🇫🇷 France" teamB="🇵🇹 Portugal" />
            <BracketMatch teamA="🇬🇧 England" teamB="🇩🇪 Germany" />
          </div>

          {/* Quarter Finals */}
          <div className="flex flex-col justify-around">
            <h3 className="text-center text-[10px] md:text-xs font-bold text-gray-500 mb-4 uppercase">Quarter Finals</h3>
            <BracketMatch teamA="🇧🇷 Brazil" teamB="🇦🇷 Argentina" />
            <BracketMatch teamA="🇫🇷 France" teamB="🇬🇧 England" />
          </div>

          {/* Semi Finals */}
          <div className="flex flex-col justify-around">
            <h3 className="text-center text-[10px] md:text-xs font-bold text-gray-500 mb-4 uppercase">Semi Finals</h3>
            <BracketMatch teamA="🇧🇷 Brazil" teamB="🇫🇷 France" />
          </div>

          {/* Final */}
          <div className="flex flex-col justify-center">
            <h3 className="text-center text-[10px] md:text-xs font-bold text-gray-500 mb-4 uppercase">Final</h3>
            <div className="bg-[#111] border border-[#39FF14] rounded p-3 md:p-4 flex flex-col items-center relative w-40 md:w-48 shadow-[0_0_20px_rgba(57,255,20,0.15)]">
              <Trophy size={20} className="text-[#39FF14] mb-2 md:mb-3" />
              <div className="w-full flex justify-between text-[11px] md:text-sm font-bold text-white mb-2">
                <span>🇧🇷 Brazil</span> <span className="text-gray-500">-</span>
              </div>
              <div className="w-full flex justify-between text-[11px] md:text-sm font-bold text-white">
                <span>🇫🇷 France</span> <span className="text-gray-500">-</span>
              </div>
              <div className="absolute -top-3 bg-[#0A0A0A] px-2 text-[9px] md:text-[10px] text-[#39FF14] font-bold">
                Jul 19
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function BracketMatch({ teamA, teamB }) {
  return (
    <div className="bg-[#111] border border-[#1F1F1F] rounded p-2.5 md:p-3 w-40 md:w-48 mb-6 relative">
      <div className="flex justify-between text-[11px] md:text-sm font-medium text-gray-300 border-b border-[#222] pb-1.5 md:pb-2 mb-1.5 md:mb-2">
        <span>{teamA}</span> <span className="text-gray-600">vs</span>
      </div>
      <div className="flex justify-between text-[11px] md:text-sm font-medium text-gray-300">
        <span>{teamB}</span>
      </div>
    </div>
  );
}
import { Trophy } from "lucide-react";

export default function Standings() {
  const standings = [
    { rank: 1, name: "You", wlt: "7-2-1", pts: "+$2,100", active: true },
    { rank: 2, name: "Darnell", wlt: "6-3-1", pts: "+$1,200", active: false },
    { rank: 3, name: "Priya", wlt: "5-4-1", pts: "+$500", active: false },
    { rank: 4, name: "London", wlt: "4-5-1", pts: "-$300", active: false },
    { rank: 5, name: "Chris", wlt: "3-6-1", pts: "-$1,500", active: false },
  ];

  return (
    <div className="w-full max-w-[100vw] bg-[#050505] text-white font-['Poppins',sans-serif] p-4 md:p-6 overflow-x-hidden">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white">League Standings</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Live rankings for your active public leagues.</p>
      </div>

      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-4 md:p-6">
        
        {/* League Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Trophy size={18} className="text-[#39FF14]" /> World Cup Degens
          </h2>
          <span className="text-[10px] md:text-xs text-gray-400 border border-[#333] px-3 py-1 rounded w-fit">
            24 Managers
          </span>
        </div>

        {/* Scrollable Table for Mobile */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-400 min-w-[400px]">
            <thead className="text-[10px] md:text-[11px] uppercase bg-[#111] text-gray-500 font-bold">
              <tr>
                <th className="px-3 md:px-4 py-3 rounded-tl-md w-12 md:w-16">Rank</th>
                <th className="px-3 md:px-4 py-3">Manager</th>
                <th className="px-3 md:px-4 py-3 text-center">W-L-T</th>
                <th className="px-3 md:px-4 py-3 text-right rounded-tr-md">Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr 
                  key={row.rank} 
                  className={`border-b border-[#1F1F1F] last:border-0 hover:bg-[#151515] transition ${row.active ? 'bg-[#1A1A1A]' : ''}`}
                >
                  <td className={`px-3 md:px-4 py-3 md:py-4 font-bold text-xs md:text-sm ${row.active ? 'text-[#39FF14] border-l-2 border-[#39FF14]' : 'text-gray-300'}`}>
                    {row.rank}
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4 text-white font-medium text-xs md:text-sm whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4 text-center font-mono text-[10px] md:text-xs">
                    {row.wlt}
                  </td>
                  <td className={`px-3 md:px-4 py-3 md:py-4 text-right font-bold text-xs md:text-sm ${row.pts.startsWith('+') ? 'text-[#39FF14]' : 'text-[#FF3333]'}`}>
                    {row.pts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
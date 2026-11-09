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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">League Standings</h1>
        <p className="text-sm text-gray-400">Live rankings for your active public leagues.</p>
      </div>

      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy size={18} className="text-[#39FF14]" /> World Cup Degens
          </h2>
          <span className="text-xs text-gray-400 border border-[#333] px-3 py-1 rounded">24 Managers</span>
        </div>

        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-[11px] uppercase bg-[#111] text-gray-500 font-bold">
            <tr>
              <th className="px-4 py-3 rounded-tl-md w-16">Rank</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3 text-center">W-L-T</th>
              <th className="px-4 py-3 text-right rounded-tr-md">Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.rank} className={`border-b border-[#1F1F1F] last:border-0 hover:bg-[#151515] transition ${row.active ? 'bg-[#1A1A1A]' : ''}`}>
                <td className={`px-4 py-4 font-bold ${row.active ? 'text-[#39FF14] border-l-2 border-[#39FF14]' : 'text-gray-300'}`}>
                  {row.rank}
                </td>
                <td className="px-4 py-4 text-white font-medium">{row.name}</td>
                <td className="px-4 py-4 text-center font-mono">{row.wlt}</td>
                <td className={`px-4 py-4 text-right font-bold ${row.pts.startsWith('+') ? 'text-[#39FF14]' : 'text-[#FF3333]'}`}>
                  {row.pts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
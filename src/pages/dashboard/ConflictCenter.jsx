import { useState, useEffect } from "react";
import api from "../../lib/api";
import { AlertTriangle } from "lucide-react";

export default function ConflictCenter() {
  const [conflicts, setConflicts] = useState([]);
  
  useEffect(() => {
    api.get("conflicts/").then(res => setConflicts(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#FF3333]/10 border border-[#FF3333]/20 flex items-center justify-center"><AlertTriangle className="text-[#FF3333]" size={24} /></div>
        <div><h1 className="text-2xl font-bold text-white">Conflict Center</h1><p className="text-sm text-gray-400">You own teams on both sides of a match.</p></div>
      </div>

      {conflicts.map((match, i) => (
        <div key={i} className="bg-[#0D0D0D] border border-[#FF3333]/30 rounded-xl p-6 relative overflow-hidden mb-4">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FF3333]"></div>
          <div className="flex justify-between items-center bg-[#111] p-6 rounded-lg border border-[#222]">
            <div className="text-center w-1/3">
              <div className="text-5xl mb-2">{match.flag_a}</div>
              <div className="font-bold text-white">{match.team_a}</div>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              <span className="text-gray-600 font-bold text-sm mb-4">VS</span>
              <button className="bg-[#111] border border-[#333] hover:border-[#39FF14] text-white text-xs font-bold px-4 py-2 rounded transition">Resolve Conflict</button>
            </div>
            <div className="text-center w-1/3">
              <div className="text-5xl mb-2">{match.flag_b}</div>
              <div className="font-bold text-white">{match.team_b}</div>
            </div>
          </div>
        </div>
      ))}
      {conflicts.length === 0 && <p className="text-gray-500">No conflicts found. You're good to go!</p>}
    </div>
  );
}
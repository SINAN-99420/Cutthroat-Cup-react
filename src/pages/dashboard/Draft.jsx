import { useState } from "react";
import api from "../../lib/api";
import { Clock } from "lucide-react";

export default function Draft() {
  const [loading, setLoading] = useState(false);
  const [draftPool] = useState([
    { team: "Portugal", flag: "🇵🇹", rating: "89 OVR" },
    { team: "Uruguay", flag: "🇺🇾", rating: "85 OVR" },
    { team: "Colombia", flag: "🇨🇴", rating: "82 OVR" },
  ]);

  const handleDraft = async (team, flag) => {
    setLoading(true);
    try {
      const res = await api.post("draft/", { team_name: team, flag: flag });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to draft");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Draft</h1>
          <p className="text-sm text-gray-400">Draft a team to your roster ($50 fee).</p>
        </div>
        <div className="bg-[#FF3333]/10 border border-[#FF3333]/30 text-[#FF3333] px-4 py-2 rounded-lg flex items-center gap-2 font-bold"><Clock size={18} /> 00:45</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {draftPool.map((item, i) => (
          <div key={i} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-4xl">{item.flag}</span>
              <span className="text-xs font-bold text-gray-400 bg-[#111] px-2 py-1 rounded">{item.rating}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">{item.team}</h3>
            <button onClick={() => handleDraft(item.team, item.flag)} disabled={loading} className="w-full py-2 bg-[#39FF14] text-black font-bold text-sm rounded hover:bg-green-400 transition disabled:opacity-50">
              Draft Team ($50)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
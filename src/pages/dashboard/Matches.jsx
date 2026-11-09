import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Calendar, MapPin } from "lucide-react";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("matches/")
      .then((res) => {
        setMatches(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) navigate("/login");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="p-6 text-gray-400">Loading matches...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Upcoming Matches</h1>
          <p className="text-sm text-gray-400">Follow the World Cup schedule and track your teams.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {matches.map((match) => (
          <div key={match.id} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#39FF14]/50 transition">
            <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-3 mb-6">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar size={14} /> {new Date(match.match_time).toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-[#39FF14] bg-[#39FF14]/10 px-2 py-1 rounded">
                {match.stage}
              </span>
            </div>

            <div className="flex justify-between items-center px-8 mb-4">
              <div className="text-center w-1/3">
                <div className="text-[48px] mb-2 leading-none">{match.flag_a || "🏳️"}</div>
                <div className="text-[15px] font-bold text-white">{match.team_a}</div>
              </div>
              <div className="text-center w-1/3">
                <span className="text-gray-600 font-bold text-sm bg-[#111] px-3 py-1 rounded-full border border-[#222]">VS</span>
              </div>
              <div className="text-center w-1/3">
                <div className="text-[48px] mb-2 leading-none">{match.flag_b || "🏳️"}</div>
                <div className="text-[15px] font-bold text-white">{match.team_b}</div>
              </div>
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <div className="col-span-2 text-center py-10 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl text-gray-500">
            No matches scheduled yet. Add them in the admin panel.
          </div>
        )}
      </div>
    </div>
  );
}
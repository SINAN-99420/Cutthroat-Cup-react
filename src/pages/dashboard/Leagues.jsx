import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Trophy, Users } from "lucide-react";

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLeagues = () => {
    api.get("leagues/")
      .then((res) => {
        setLeagues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) navigate("/login");
      });
  };

  useEffect(() => {
    fetchLeagues();
  }, [navigate]);

  const handleJoin = async (id) => {
    try {
      const res = await api.post(`leagues/${id}/join/`);
      alert(res.data.message);
      fetchLeagues(); // Refresh after joining
    } catch (err) {
      alert(err.response?.data?.error || "Failed to join league");
    }
  };

  if (loading) return <div className="p-6 text-gray-400">Loading leagues...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Public Leagues</h1>
          <p className="text-sm text-gray-400">Join a league and compete for the prize pool.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leagues.map((league) => (
          <div key={league.id} className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-5 hover:border-[#39FF14]/50 transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                  <Trophy size={18} className="text-[#39FF14]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{league.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Users size={12}/> {league.managers} / {league.max_managers} managers
                  </p>
                </div>
              </div>
              <span className="bg-[#39FF14]/10 text-[#39FF14] text-[10px] font-bold px-2 py-1 rounded border border-[#39FF14]/20">Public</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="bg-[#111] p-2 rounded text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Entry Fee</p>
                <p className="font-bold text-white">${league.entry_fee}</p>
              </div>
              <div className="bg-[#111] p-2 rounded text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Prize Pool</p>
                <p className="font-bold text-[#39FF14]">${league.prize_pool}</p>
              </div>
            </div>

            <button
              onClick={() => handleJoin(league.id)}
              disabled={league.is_joined}
              className={`w-full py-2 rounded-md font-bold text-sm transition ${
                league.is_joined 
                  ? "bg-[#1A1A1A] text-gray-500 cursor-not-allowed" 
                  : "bg-[#39FF14] text-black hover:bg-green-400"
              }`}
            >
              {league.is_joined ? "Already Joined" : `Join League ($${league.entry_fee})`}
            </button>
          </div>
        ))}
        {leagues.length === 0 && <p className="text-gray-500">No public leagues available.</p>}
      </div>
    </div>
  );
}
import { useState } from "react";
import api from "../../lib/api";

export default function Waivers() {
  const [biddingTeam, setBiddingTeam] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [availableTeams] = useState([
    { team: "Japan", flag: "🇯🇵", topBid: "$450" },
    { team: "South Korea", flag: "🇰🇷", topBid: "$320" },
    { team: "USA", flag: "🇺🇸", topBid: "$800" },
  ]);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      await api.post("waivers/", {
        team_name: biddingTeam.team,
        flag: biddingTeam.flag,
        bid_amount: parseFloat(bidAmount)
      });
      alert("Bid placed successfully!");
      setBiddingTeam(null);
      setBidAmount("");
    } catch (err) {
      alert("Error placing bid");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Waiver Wire</h1>
        <p className="text-sm text-gray-400">Place a bid on available teams.</p>
      </div>

      {biddingTeam && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0D0D0D] border border-[#222] p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold text-white mb-4">Bid for {biddingTeam.flag} {biddingTeam.team}</h2>
            <form onSubmit={handleBid}>
              <input type="number" placeholder="Enter bid amount ($)" value={bidAmount} onChange={e => setBidAmount(e.target.value)} className="w-full bg-[#111] border border-[#333] text-white p-3 rounded mb-4 focus:border-[#39FF14] outline-none" required />
              <div className="flex gap-2">
                <button type="button" onClick={() => setBiddingTeam(null)} className="flex-1 py-2 text-gray-400 hover:text-white border border-[#333] rounded">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-[#39FF14] text-black font-bold rounded hover:bg-green-400">Place Bid</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#111] text-[11px] uppercase font-bold text-gray-500">
            <tr><th className="px-6 py-4">Team</th><th className="px-6 py-4">Current Top Bid</th><th className="px-6 py-4 text-right">Action</th></tr>
          </thead>
          <tbody>
            {availableTeams.map((team, i) => (
              <tr key={i} className="border-b border-[#1F1F1F] last:border-0">
                <td className="px-6 py-4 flex items-center gap-3"><span className="text-2xl">{team.flag}</span><span className="font-bold text-white">{team.team}</span></td>
                <td className="px-6 py-4 font-bold text-[#39FF14]">{team.topBid}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setBiddingTeam(team)} className="bg-[#1A1A1A] border border-[#333] hover:border-[#39FF14] text-white px-4 py-1.5 rounded text-xs font-bold transition">Place Bid</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
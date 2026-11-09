import { useState, useEffect } from "react";
import api from "../../lib/api";
import { User, Mail, Wallet } from "lucide-react";

export default function Account() {
  const [profile, setProfile] = useState({ username: "", email: "", favorite_team: "" });
  const [wallet, setWallet] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("account/").then(res => setProfile(res.data));
    api.get("dashboard/").then(res => setWallet(res.data.wallet.balance));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await api.put("account/", profile);
    setTimeout(() => setSaving(false), 500);
    alert("Profile saved!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Account</h1>
      </div>
      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-8">
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-[#1F1F1F]">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`} alt="avatar" className="w-24 h-24 rounded-full bg-[#1A1A1A] border-2 border-[#39FF14] p-1" />
          <div>
            <h2 className="text-2xl font-bold text-white">{profile.username}</h2>
            <span className="inline-block mt-2 bg-[#39FF14]/10 text-[#39FF14] text-xs font-bold px-2 py-1 rounded border border-[#39FF14]/20">Pro Member</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-2"><Mail size={14}/> Email Address</label>
            <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full bg-[#111] border border-[#222] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14]" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-2"><User size={14}/> Favorite Team</label>
            <input type="text" value={profile.favorite_team} onChange={e => setProfile({...profile, favorite_team: e.target.value})} className="w-full bg-[#111] border border-[#222] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14]" />
          </div>
        </div>

        <div className="mt-8 bg-[#111] border border-[#222] p-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#39FF14]/10 flex items-center justify-center"><Wallet className="text-[#39FF14]" size={20} /></div>
            <div><p className="text-sm font-bold text-white">Wallet Balance</p></div>
          </div>
          <p className="text-xl font-bold text-[#39FF14]">${wallet}</p>
        </div>

        <button onClick={handleSave} disabled={saving} className="mt-8 bg-[#39FF14] text-black font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
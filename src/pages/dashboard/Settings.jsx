import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Bell, Lock } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get("settings/").then(res => setSettings(res.data));
  }, []);

  const handleToggle = async (field) => {
    const updated = { ...settings, [field]: !settings[field] };
    setSettings(updated);
    await api.put("settings/", updated);
  };

  if (!settings) return <div className="p-6 text-gray-400">Loading settings...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold text-white">Settings</h1></div>
      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-8 flex flex-col gap-8">
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Bell size={18} className="text-[#39FF14]"/> Notifications</h3>
          <div className="flex flex-col gap-4">
            <Toggle label="Match start reminders" checked={settings.match_reminders} onChange={() => handleToggle('match_reminders')} />
            <Toggle label="Waiver results" checked={settings.waiver_results} onChange={() => handleToggle('waiver_results')} />
            <Toggle label="League invites" checked={settings.league_invites} onChange={() => handleToggle('league_invites')} />
          </div>
        </div>

        <div className="h-px w-full bg-[#1F1F1F]"></div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lock size={18} className="text-[#39FF14]"/> Privacy</h3>
          <div className="flex flex-col gap-4">
             <Toggle label="Public Profile" checked={settings.public_profile} onChange={() => handleToggle('public_profile')} />
          </div>
        </div>

      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between cursor-pointer" onClick={onChange}>
      <p className="text-sm font-bold text-gray-200">{label}</p>
      <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${checked ? 'bg-[#39FF14]/30' : 'bg-[#222]'}`}>
        <div className={`w-4 h-4 rounded-full transition-transform ${checked ? 'bg-[#39FF14] translate-x-4' : 'bg-gray-500'}`}></div>
      </div>
    </div>
  );
}
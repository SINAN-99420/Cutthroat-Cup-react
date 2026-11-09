import { useState, useEffect } from "react";
import api from "../../lib/api";
import { ArrowUpRight, ArrowDownRight, Trophy } from "lucide-react";

export default function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("activity/").then(res => setActivities(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Recent Activity</h1>
        <p className="text-sm text-gray-400">Your transaction and wallet history.</p>
      </div>

      <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl p-6">
        <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#222] before:to-transparent">
          {activities.map((act) => {
             const isPositive = act.transaction_type === 'WINNINGS' || act.transaction_type === 'DEPOSIT';
             return (
              <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0D0D0D] bg-[#1A1A1A] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  {isPositive ? <ArrowUpRight size={16} className="text-[#39FF14]"/> : <ArrowDownRight size={16} className="text-[#FF3333]" />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111] border border-[#222] p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white">{act.description}</span>
                    <span className={`font-bold ${isPositive ? 'text-[#39FF14]' : 'text-[#FF3333]'}`}>
                      {isPositive ? '+' : '-'}${act.amount}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-600 mt-2">{new Date(act.created_at).toLocaleString()}</div>
                </div>
              </div>
            )
          })}
          {activities.length === 0 && <p className="text-center text-gray-500">No recent activity.</p>}
        </div>
      </div>
    </div>
  );
}
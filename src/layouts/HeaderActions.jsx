import { useNavigate } from "react-router-dom";
import { Wallet, ChevronDown, Bell, LogOut, User } from "lucide-react";

/* Top-right bar from the Figma design. Reuse it on any dashboard page. */
export default function HeaderActions({ name = "Manager", balance = "$0", notifications = 2 }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("token");   // <- use the same key as your api.js / Login.jsx
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-5 shrink-0">
      <button
        onClick={() => navigate("/dashboard/account")}
        className="flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/40 text-[#39FF14] rounded-lg px-4 py-2 text-[15px] font-medium"
      >
        <Wallet size={16} /> {balance} <ChevronDown size={14} />
      </button>

      <button className="relative text-gray-300 hover:text-white">
        <Bell size={20} />
        {notifications > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#E11D48] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {notifications}
          </span>
        )}
      </button>

      <div className="flex items-center gap-2.5 bg-[#171717] rounded-lg pl-1.5 pr-3 py-1.5">
        <div className="w-8 h-8 rounded-md border-2 border-[#39FF14] bg-[#222] flex items-center justify-center">
          <User size={16} className="text-gray-300" />
        </div>
        <span className="text-[14px]">{name}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </div>

      <button onClick={handleLogout} className="flex items-center gap-2 text-[14px] text-gray-200 hover:text-white">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
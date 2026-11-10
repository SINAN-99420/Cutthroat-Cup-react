import { useNavigate } from "react-router-dom";
import { Wallet, Bell, User, LogOut, ChevronDown } from "lucide-react";

export default function HeaderActions({ name, balance }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto mt-3 md:mt-0">
      <button className="flex items-center gap-1.5 bg-[#0D0D0D] border border-[#39FF14] px-3 py-1.5 rounded-md text-[12px] md:text-[13px] font-bold text-[#39FF14]">
        <Wallet size={14} /> {balance} <ChevronDown size={12} className="hidden md:block" />
      </button>
      
      <button className="relative w-8 h-8 md:w-9 md:h-9 bg-[#0D0D0D] border border-[#1F1F1F] rounded-md flex items-center justify-center">
        <Bell size={14} className="text-gray-300" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full">2</span>
      </button>
      
      <button className="flex items-center gap-1.5 bg-[#0D0D0D] border border-[#1F1F1F] px-2 py-1.5 rounded-md text-[12px] md:text-[13px]">
        <User size={14} className="text-gray-400" />
        <span className="font-semibold text-gray-300 hidden sm:block">{name}</span>
        <ChevronDown size={12} className="text-gray-500 hidden sm:block" />
      </button>
      
      <button onClick={handleLogout} className="flex items-center gap-1 text-gray-400 hover:text-white transition ml-1">
        <LogOut size={16} />
        <span className="text-[12px] md:hidden">Logout</span> {/* Mobile-il text kaanikkan */}
      </button>
    </div>
  );
}
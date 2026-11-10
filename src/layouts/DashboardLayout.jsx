import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home, Trophy, Users, Ticket, CalendarDays, Medal, GitMerge,
  Clock, Swords, User, Settings, Menu, X, LogOut
} from "lucide-react";

const MAIN = [
  { to: "/dashboard", label: "Home", Icon: Home, end: true },
  { to: "/dashboard/leagues", label: "Leagues", Icon: Trophy },
  { to: "/dashboard/draft", label: "Draft", Icon: Users },
  { to: "/dashboard/waivers", label: "Waivers", Icon: Ticket },
  { to: "/dashboard/matches", label: "Matches", Icon: CalendarDays },
  { to: "/dashboard/standings", label: "Standings", Icon: Medal },
  { to: "/dashboard/bracket", label: "Bracket", Icon: GitMerge },
  { to: "/dashboard/activity", label: "Activity", Icon: Clock },
  { to: "/dashboard/conflicts", label: "Conflict Center", Icon: Swords, badge: 2 },
];

const MANAGE = [
  { to: "/dashboard/account", label: "My Account", Icon: User },
  { to: "/dashboard/settings", label: "Settings", Icon: Settings },
];

function Item({ to, label, Icon, end, badge, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition group ${
          isActive
            ? "bg-[#39FF14]/10 text-[#39FF14] border-l-2 border-[#39FF14]"
            : "text-gray-400 hover:text-white hover:bg-[#151515] border-l-2 border-transparent"
        }`
      }
    >
      <div className="flex items-center gap-2.5">
        <Icon size={16} className="shrink-0" />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-[#E11D48] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full max-w-[100vw] bg-[#0A0A0A] text-[#EDEDED] font-['Poppins',sans-serif] overflow-hidden">
      
      {/* ─── MOBILE TOP BAR ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D0D0D] border-b border-[#1F1F1F] flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Swords size={20} className="text-white" />
          <span className="font-bold text-[16px] text-white">Cutthroat Cup</span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-white p-2">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── SIDEBAR OVERLAY (Mobile) ─── */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 mt-16"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* ─── SIDEBAR ─── */}
      <aside className={`
        fixed md:relative top-16 md:top-0 left-0 h-[calc(100vh-64px)] md:h-screen
        w-[230px] shrink-0 bg-[#0D0D0D] border-r border-[#1F1F1F] flex flex-col z-50 transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="hidden md:flex h-16 items-center gap-2.5 px-5 border-b border-[#1F1F1F]">
          <Swords size={20} className="text-white" />
          <span className="text-[16px] font-bold tracking-wide text-white">Cutthroat Cup</span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
          {MAIN.map((i) => <Item key={i.to} {...i} onClick={() => setIsMobileOpen(false)} />)}
        </div>

        <div className="border-t border-[#1F1F1F] pt-4 pb-4 px-3 flex flex-col gap-1">
          <p className="text-[10px] font-bold tracking-widest text-gray-500 px-3 mb-1 uppercase">Manage</p>
          {MANAGE.map((i) => <Item key={i.to} {...i} onClick={() => setIsMobileOpen(false)} />)}
          
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2.5 px-3 py-2.5 mt-2 rounded-lg text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-[#1A1A1A] transition border-l-2 border-transparent"
          >
            <LogOut size={16} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      {/* W-full and overflow-x-hidden ivide add cheythu */}
      <main className="flex-1 w-full min-w-0 flex flex-col h-full md:h-screen overflow-hidden pt-16 md:pt-0">
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
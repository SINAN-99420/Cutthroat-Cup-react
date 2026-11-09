import { NavLink, Outlet } from "react-router-dom";
import {
  Home, Trophy, Users, Ticket, CalendarDays, Medal, GitMerge,
  Clock, Swords, User, Settings,
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

function Item({ to, label, Icon, end, badge }) {
  return (
    <NavLink
      to={to}
      end={end}
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
  return (
    <div className="flex h-screen bg-[#0A0A0A] text-[#EDEDED] font-['Poppins',sans-serif] overflow-hidden">
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[230px] shrink-0 bg-[#0D0D0D] border-r border-[#1F1F1F]">
        
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-[#1F1F1F]">
          <Swords size={20} className="text-white" />
          <span className="text-[16px] font-bold tracking-wide text-white">Cutthroat Cup</span>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
          {MAIN.map((i) => <Item key={i.to} {...i} />)}
        </div>

        {/* Manage Section */}
        <div className="border-t border-[#1F1F1F] pt-4 pb-4 px-3 flex flex-col gap-1">
          <p className="text-[10px] font-bold tracking-widest text-gray-500 px-3 mb-1 uppercase">Manage</p>
          {MANAGE.map((i) => <Item key={i.to} {...i} />)}
        </div>
        
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
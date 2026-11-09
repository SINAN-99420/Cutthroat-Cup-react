import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import {
  Swords, Trophy, Ticket, Users, Target, Wallet,
  ChevronRight, ArrowRight, User,
} from "lucide-react";
import HeaderActions from "../../layouts/HeaderActions";

const ACTIONS = [
  { Icon: Swords, color: "#FF2D2D", title: "Conflict cut", desc: "Brazil vs Spain", time: "Due in 12h" },
  { Icon: Ticket, color: "#FFB800", title: "Waiver deadline", desc: "3 auctions ending", time: "2h 15m" },
  { Icon: Users, color: "#22B8F0", title: "Your draft pick", desc: "Round 3 • Pick 12", time: "in 45m" },
];

const RECENT = [
  { init: "A", bg: "#6D5DFB", l1: "Brazil vs Spain", l2: "Portugal", right: "$2,100", rc: "text-[#39FF14]", ago: "2h ago" },
  { init: "J", bg: "#2BB5B0", l1: "Alex cut Germany", l2: "", right: "vs Argentina", rc: "text-[#39FF14]", ago: "5h ago" },
  { init: "S", bg: "#B08D57", l1: "vs USA", l2: "Sam earned", right: "$1,250", rc: "text-[#39FF14]", ago: "6h ago" },
];

const WAIVERS = [
  { flag: "🇵🇹", name: "Portugal", top: "$2,300", yours: "$2,100" },
  { flag: "🇺🇾", name: "Uruguay", top: "$1,800", yours: "$1,500" },
  { flag: "🇨🇴", name: "Colombia", top: "$1,200", yours: "$1,000" },
];

const STANDINGS = [
  { pos: 1, name: "You", wallet: "$18,750", diff: "+$2,300", up: true, me: true },
  { pos: 2, name: "Daniel", wallet: "$16,200", diff: "+$1,100", up: true },
  { pos: 3, name: "Priya", wallet: "$14,850", diff: "+$950", up: true },
  { pos: 4, name: "Jordan", wallet: "$13,400", diff: "-$250", up: false },
  { pos: 5, name: "Casey", wallet: "$11,750", diff: "-$1,250", up: false },
];

const UPCOMING_FALLBACK = [
  {
    when: "TOMORROW • 3:00 PM ET", round: "Round of 16",
    a: { name: "Brazil", flag: "🇧🇷", own: "You own" }, b: { name: "Spain", flag: "🇪🇸", own: "You own" },
    alert: { lines: ["You own both teams", "Conflict cut required"], btn: "Resolve" },
  },
  {
    when: "SAT JUN 21 • 12:00 PM ET", round: "Round of 16",
    a: { name: "NLD", flag: "🇳🇱", own: "You own" }, b: { name: "ARG", flag: "🇦🇷", own: "Opponent" },
    alert: { lines: ["High ownership impact"], btn: "View" },
  },
];

const BRACKET_FLAGS = ["🇧🇷", "🇪🇬", "🇰🇷", "🇪🇸", "🇫🇷", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "🇵🇹", "🇧🇪"];

const RECOMMENDED_FALLBACK = {
  name: "Global Cup 2026", subtitle: "18/24 managers • $0 entry • Knockout Round", extra: 13,
};

const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const money = (n) => `$${Number(n ?? 0).toLocaleString()}`;

export default function Home() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("dashboard/")
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.response?.status === 401) navigate("/login");
      });
  }, [navigate]);

  if (!data) return <div className="p-6 text-gray-400 font-['Poppins',sans-serif]">Loading dashboard...</div>;

  const leagues = data.my_leagues || [];
  const publicCount = leagues.filter((l) => l.is_public).length;
  const privateCount = leagues.length - publicCount;
  const shownLeagues = leagues.filter((l) =>
    filter === "all" ? true : filter === "public" ? l.is_public : !l.is_public
  );

  const userName = data.user?.name ?? data.user?.username ?? "Shannon";
  const next = data.upcoming_matches?.[0];
  const rec = data.recommended_league || RECOMMENDED_FALLBACK;

  const upcoming = data.upcoming_matches?.length
    ? data.upcoming_matches.slice(0, 2).map((m, i) => ({
        when: new Date(m.match_time)
          .toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
          .toUpperCase(),
        round: m.stage || "TBD",
        a: { name: m.team_a, flag: m.flag_a || "🏳️", own: m.own_a || "" },
        b: { name: m.team_b, flag: m.flag_b || "🏳️", own: m.own_b || "" },
        alert: UPCOMING_FALLBACK[i]?.alert,
      }))
    : UPCOMING_FALLBACK;

  return (
    <div className="w-full bg-[#050505] text-white font-['Poppins',sans-serif] px-6 py-5">
      
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-6 mb-5">
        <div>
          <h1 className="text-[24px] leading-tight font-light">
            Welcome back, <span className="font-semibold">{userName}</span>
          </h1>
          <p className="text-[12px] text-gray-400 mt-0.5">
            Manage your clubs, survive conflict cuts, and grow your wallet through the World Cup.
          </p>
        </div>
        <HeaderActions name={userName} balance={money(data.wallet.balance)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-5">
        {/* =================== LEFT COLUMN =================== */}
        <div className="flex flex-col gap-4 min-w-0">
          
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              value={money(data.wallet.balance)} label="WALLET BALANCE" color="#39FF14"
              sub={<><span className="text-[#39FF14]">+$12</span> this week</>}
              icon={<Wallet size={16} color="#39FF14" />}
            />
            <StatCard value="6/10" label="ACTIVE TEAMS" color="#22B8F0" sub="60% of roster" icon={<Users size={16} color="#22B8F0" />} />
            <StatCard value="2" label="OPEN CONFLICTS" color="#E11D48" sub={<span className="text-[#E11D48]">Action needed</span>} icon={<Target size={16} color="#E11D48" />} />
            <StatCard value="3" label="WAIVER BIDS" color="#FFB800" sub="Total submitted" icon={<Ticket size={16} color="#FFB800" />} />
          </div>

          {/* My leagues */}
          <Panel>
            <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
              <h2 className="font-semibold text-[13px] tracking-wide text-gray-200">MY LEAGUES</h2>
              <div className="flex items-center gap-2">
                <Tab active={filter === "all"} onClick={() => setFilter("all")}>All ({leagues.length})</Tab>
                <Tab active={filter === "public"} onClick={() => setFilter("public")}>Public ({publicCount})</Tab>
                <Tab active={filter === "private"} onClick={() => setFilter("private")}>Private ({privateCount})</Tab>
                <button
                  onClick={() => navigate("/dashboard/leagues")}
                  className="ml-2 bg-[#39FF14] hover:bg-[#4dff2e] text-black px-3 py-1.5 rounded text-[11px] font-bold flex items-center gap-1 transition"
                >
                  Create private league <ArrowRight size={12} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {shownLeagues.length > 0 ? (
                shownLeagues.map((league, index) => (
                  <LeagueRow
                    key={league.id ?? index}
                    logo={league.logo}
                    name={league.name}
                    isPublic={league.is_public}
                    subtitle={`${league.managers}/${league.max_managers} managers • ${league.stage || "Group Stage"}`}
                    rank={league.rank ? ordinal(league.rank) : "1st"}
                    total={league.managers}
                    wallet={money(league.wallet ?? league.prize_pool)}
                    conflicts={league.conflicts ?? 0}
                    onClick={() => navigate(`/dashboard/leagues/${league.id ?? ""}`)}
                  />
                ))
              ) : (
                <div className="text-[12px] text-gray-500 py-4 text-center border border-dashed border-[#262626] rounded-lg">
                  You haven't joined any leagues yet. Go to Leagues tab!
                </div>
              )}
            </div>
          </Panel>

          {/* Recommended public league */}
          <div className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-gradient-to-r from-[#133B11] to-transparent border-b border-[#1F1F1F]">
              <h2 className="font-semibold text-[12px] tracking-wide text-gray-300">RECOMMENDED PUBLIC LEAGUE</h2>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-3">
              <div className="flex items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-lg bg-[#1A1A1A] flex items-center justify-center overflow-hidden shrink-0">
                  {rec.image ? <img src={rec.image} alt="" className="w-full h-full object-cover" /> : <Trophy size={24} className="text-[#f2c94c]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-bold">{rec.name}</h3>
                    <Tag isPublic />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{rec.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {["#5B9BD5", "#555", "#8a7a6a", "#3f6f8f"].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border border-[#0D0D0D] -ml-1.5 first:ml-0" style={{ background: c }} />
                  ))}
                  <span className="ml-2 text-[10px] bg-[#222] text-gray-300 px-1.5 py-0.5 rounded">+{rec.extra ?? 13}</span>
                </div>
                <button
                  onClick={() => navigate("/dashboard/leagues")}
                  className="bg-[#39FF14] hover:bg-[#4dff2e] text-black px-4 py-1.5 rounded text-[11px] font-bold flex items-center gap-1 transition"
                >
                  Join league <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom three panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Upcoming matches */}
            <Panel title="UPCOMING MATCHES" link="View all" onLink={() => navigate("/dashboard/matches")} flush>
              {upcoming.map((m, i) => (
                <div key={i} className="px-3 py-2.5 border-t border-[#1F1F1F]">
                  <div className="flex justify-between text-[9px] text-gray-500 mb-2">
                    <span>{m.when}</span><span>{m.round}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <TeamSide team={m.a} />
                    <span className="text-[10px] text-gray-600">VS</span>
                    <TeamSide team={m.b} right />
                  </div>
                  {m.alert && (
                    <div className="mt-2 flex items-center justify-between bg-[#E11D48]/10 border border-[#E11D48]/20 rounded px-2 py-1.5">
                      <div className="flex items-center gap-1.5">
                        {m.alert.lines.length > 1 && <Swords size={12} className="text-[#E11D48]" />}
                        <div className="text-[8px] text-[#FF4D4D] leading-tight font-medium">
                          {m.alert.lines.map((l) => <div key={l}>{l}</div>)}
                        </div>
                      </div>
                      <button className="text-[10px] font-bold text-gray-300 hover:text-white">{m.alert.btn}</button>
                    </div>
                  )}
                </div>
              ))}
            </Panel>

            {/* Waiver auctions */}
            <Panel title="WAIVER AUCTIONS" link="View all" onLink={() => navigate("/dashboard/waivers")} flush>
              <div className="flex justify-between px-3 py-2 text-[9px] font-bold border-t border-[#1F1F1F]">
                <span className="text-[#FFB800]">3 AUCTIONS ENDING</span><span className="text-[#FFB800]">2h 15m</span>
              </div>
              {WAIVERS.map((w) => (
                <div key={w.name} className="flex items-center justify-between px-3 py-2 border-t border-[#1F1F1F]">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] leading-none">{w.flag}</span>
                    <span className="text-[11px] font-medium text-gray-300">{w.name}</span>
                  </div>
                  <div className="flex gap-3 text-[10px]">
                    <div><p className="text-[8px] text-gray-500">Top bid</p><p className="font-bold text-gray-200">{w.top}</p></div>
                    <div><p className="text-[8px] text-gray-500">Your bid</p><p className="font-bold text-[#39FF14]">{w.yours}</p></div>
                  </div>
                </div>
              ))}
              <div className="p-3">
                <GreenButton onClick={() => navigate("/dashboard/waivers")}>View all auctions</GreenButton>
              </div>
            </Panel>

            {/* League standings */}
            <Panel title="LEAGUE STANDINGS" link="View all" onLink={() => navigate("/dashboard/standings")} flush>
              <div className="grid grid-cols-[20px_1fr_60px_50px] px-3 py-2 text-[8px] text-gray-500 border-t border-[#1F1F1F] font-bold">
                <span>#</span><span>MANAGER</span><span className="text-right">Wallet</span><span className="text-right">+/-</span>
              </div>
              {STANDINGS.map((r) => (
                <div key={r.pos} className={`grid grid-cols-[20px_1fr_60px_50px] items-center px-3 py-2 text-[10px] border-t border-[#1F1F1F] ${r.me ? "bg-[#39FF14]/10 text-white" : "text-gray-400"}`}>
                  <span className={r.me ? "text-[#39FF14] font-bold" : ""}>{r.pos}</span>
                  <span className="flex items-center gap-1 font-medium truncate"><User size={10} className="text-gray-500" />{r.name}</span>
                  <span className="font-bold text-gray-200 text-right pr-1">{r.wallet}</span>
                  <span className={`text-right font-bold ${r.up ? "text-[#39FF14]" : "text-[#FF3333]"}`}>{r.diff}</span>
                </div>
              ))}
              <div className="p-3">
                <GreenButton onClick={() => navigate("/dashboard/standings")}>Full Standings</GreenButton>
              </div>
            </Panel>
          </div>
        </div>

        {/* =================== RIGHT COLUMN =================== */}
        <div className="flex flex-col gap-4">
          {/* Next match */}
          <div className="rounded-xl border border-[#39FF14]/50 bg-[#0D0D0D] p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[13px] tracking-wide text-gray-200">NEXT MATCH</h2>
              <span className="text-[10px] text-gray-400 border border-[#333] px-2 py-0.5 rounded">{next?.stage || "TBD"}</span>
            </div>
            {next ? (
              <>
                <div className="flex items-center justify-between px-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] leading-none">{next.flag_a || "🏳️"}</span>
                    <span className="text-[12px] font-bold">{next.team_a.substring(0, 3).toUpperCase()}</span>
                  </div>
                  <span className="text-gray-600 text-[10px] font-bold">VS</span>
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <span className="text-[20px] leading-none">{next.flag_b || "🏳️"}</span>
                    <span className="text-[12px] font-bold">{next.team_b.substring(0, 3).toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 border-t border-[#1F1F1F] pt-3">
                  <span>{new Date(next.match_time).toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })}</span>
                  <span className="text-[#39FF14]">2 of your teams</span>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 text-[12px] py-4">No upcoming matches</div>
            )}
          </div>

          {/* Action needed */}
          <Panel title="ACTION NEEDED" badge="2">
            <div className="flex flex-col">
              {ACTIONS.map(({ Icon, color, title, desc, time }, i) => (
                <div key={title} className={`flex items-center justify-between py-2.5 ${i ? "border-t border-[#1F1F1F]" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} color={color} />
                    <div>
                      <p className="text-[12px] font-bold text-gray-200">{title}</p>
                      <p className="text-[9px] text-gray-500">{desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color }}>{time}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Recent activity */}
          <Panel title="RECENT ACTIVITY" link="View all" onLink={() => navigate("/dashboard/activity")}>
            <div className="flex flex-col">
              {RECENT.map((r, i) => (
                <div key={i} className={`flex items-center justify-between py-2.5 ${i ? "border-t border-[#1F1F1F]" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: r.bg }}>{r.init}</div>
                    <div>
                      <p className="text-[9px] text-gray-500">{r.l1}</p>
                      {r.l2 && <p className="text-[11px] font-medium">{r.l2}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className={`font-bold ${r.rc}`}>{r.right}</span>
                    <span className="text-gray-600 w-9 text-right">{r.ago}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Tournament bracket */}
          <Panel title="TOURNAMENT BRACKET" link="View bracket" onLink={() => navigate("/dashboard/bracket")}>
            <Bracket />
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Small components                                                    */
/* ================================================================== */

function Panel({ title, link, onLink, badge, flush, children }) {
  return (
    <div className={`bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl ${flush ? "pb-0" : "p-3.5"} overflow-hidden`}>
      {(title || link) && (
        <div className={`flex justify-between items-center ${flush ? "px-3 py-2.5" : "mb-2"}`}>
          <h2 className="font-bold text-[12px] tracking-wide text-gray-200">{title}</h2>
          {link && <button onClick={onLink} className="text-[10px] font-bold text-[#39FF14] hover:underline">{link}</button>}
          {badge && <span className="bg-[#E11D48] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{badge}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function Hex({ color, children }) {
  const clip = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
  return (
    <div className="w-[36px] h-[40px] flex items-center justify-center shrink-0" style={{ clipPath: clip, background: `${color}55` }}>
      <div className="w-[32px] h-[36px] flex items-center justify-center bg-[#0b0b0b]" style={{ clipPath: clip }}>
        {children}
      </div>
    </div>
  );
}

function StatCard({ value, label, sub, color, icon }) {
  return (
    <div
      className="relative rounded-xl border p-3.5 flex flex-col justify-between overflow-hidden min-h-[100px]"
      style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, #0b0b0b 35%, ${color}1A 100%)` }}
    >
      <div className="flex justify-between items-start">
        <p className="text-[28px] leading-none font-bold" style={{ color }}>{value}</p>
        <Hex color={color}>{icon}</Hex>
      </div>
      <div className="mt-2">
        <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{label}</p>
        <p className="text-[9px] text-gray-500 mt-0.5 font-medium">{sub}</p>
      </div>
    </div>
  );
}

function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-[10px] font-bold border transition ${
        active ? "bg-[#39FF14]/15 text-[#39FF14] border-[#39FF14]/50" : "bg-[#1A1A1A] text-gray-400 border-[#2A2A2A] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Tag({ isPublic }) {
  return (
    <span
      className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${
        isPublic ? "bg-[#39FF14]/15 text-[#39FF14] border-[#39FF14]/30" : "bg-[#1E90FF]/15 text-[#3AA0FF] border-[#1E90FF]/30"
      }`}
    >
      {isPublic ? "Public" : "Private"}
    </span>
  );
}

function LeagueRow({ logo, name, isPublic, subtitle, rank, total, wallet, conflicts, onClick }) {
  return (
    <div
      onClick={onClick}
      className="grid grid-cols-[minmax(0,1.8fr)_1fr_1fr_1fr_16px] items-center gap-2 px-3 py-2.5 bg-[#111] border border-[#1F1F1F] rounded-lg hover:border-[#333] transition cursor-pointer"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
          {logo ? <img src={logo} alt="" className="w-full h-full object-cover" /> : <Trophy size={14} className="text-black" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[12px] font-bold truncate text-gray-200">{name}</h3>
            <Tag isPublic={isPublic} />
          </div>
          <p className="text-[9px] text-gray-500 mt-0.5 truncate">{subtitle}</p>
        </div>
      </div>
      <p className="text-[11px] font-bold text-gray-200">{rank} <span className="font-normal text-gray-500">/ {total}</span></p>
      <div><p className="text-[11px] font-bold text-[#39FF14]">{wallet}</p><p className="text-[8px] text-gray-500">Wallet</p></div>
      <div><p className="text-[11px] font-bold text-gray-200">{conflicts}</p><p className="text-[8px] text-gray-500">Conflicts</p></div>
      <ChevronRight size={14} className="text-gray-600" />
    </div>
  );
}

function TeamSide({ team, right }) {
  return (
    <div className={`flex items-center gap-1.5 ${right ? "flex-row-reverse text-right" : ""}`}>
      <span className="text-[16px] leading-none">{team.flag}</span>
      <div>
        <p className="text-[11px] font-bold leading-tight text-gray-200">{team.name}</p>
        {team.own && <p className={`text-[8px] font-medium leading-tight ${team.own === "You own" ? "text-[#39FF14]" : "text-gray-500"}`}>{team.own}</p>}
      </div>
    </div>
  );
}

function GreenButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#39FF14] hover:bg-[#4dff2e] text-black py-2 rounded text-[11px] font-bold flex items-center justify-center gap-1 transition"
    >
      {children} <ArrowRight size={12} />
    </button>
  );
}

function Bracket() {
  const ROW = 22, TOP = 15;
  const c = (i) => TOP + i * ROW + ROW / 2;
  const qf = [0, 1, 2, 3].map((i) => (c(i * 2) + c(i * 2 + 1)) / 2);
  const sf = [0, 1].map((i) => (qf[i * 2] + qf[i * 2 + 1]) / 2);
  const fin = (sf[0] + sf[1]) / 2;
  const line = "#333";

  return (
    <div className="flex-1 flex flex-col justify-center">
      <svg viewBox="0 0 240 200" className="w-full h-auto">
        <g fill="#666" fontSize="8" textAnchor="middle">
          <text x="12" y="10">R16</text><text x="73" y="10">QF</text><text x="128" y="10">SF</text>
        </g>
        {BRACKET_FLAGS.map((f, i) => (
          <text key={i} x="0" y={c(i) + 4} fontSize="12">{f}</text>
        ))}
        {qf.map((y, i) => (
          <g key={i} stroke={line} fill="none" strokeWidth="1">
            <path d={`M24 ${c(i * 2)} H34 V${c(i * 2 + 1)} H24 M34 ${y} H52`} />
            <rect x="52" y={y - 7} width="24" height="14" rx="2" />
          </g>
        ))}
        {sf.map((y, i) => (
          <g key={i} stroke={line} fill="none" strokeWidth="1">
            <path d={`M76 ${qf[i * 2]} H86 V${qf[i * 2 + 1]} H76 M86 ${y} H104`} />
            <rect x="104" y={y - 7} width="24" height="14" rx="2" />
          </g>
        ))}
        <g stroke={line} fill="none" strokeWidth="1">
          <path d={`M128 ${sf[0]} H138 V${sf[1]} H128 M138 ${fin} H156`} />
          <rect x="156" y={fin - 25} width="60" height="50" rx="3" />
        </g>
        <text x="186" y={fin - 12} fill="#666" fontSize="8" textAnchor="middle">FINAL</text>
        <text x="186" y={fin + 8} fontSize="18" textAnchor="middle">🏆</text>
        <text x="186" y={fin + 20} fill="#666" fontSize="7" textAnchor="middle">JUL 19</text>
      </svg>
      <div className="flex flex-col gap-1 mt-2 ml-[40%] text-[8px] text-gray-500">
        <span className="flex items-center gap-1.5"><i className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" /> Your team</span>
        <span className="flex items-center gap-1.5"><i className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Opponent</span>
        <span className="flex items-center gap-1.5"><i className="w-1.5 h-1.5 rounded-full bg-[#FF3B3B]" /> Eliminated</span>
      </div>
    </div>
  );
}
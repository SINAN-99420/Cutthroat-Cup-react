import { Link } from "react-router-dom";
import { Shield, Skull, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cc-dark relative overflow-hidden flex flex-col">
      {/* Background Image with Green Glow */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518605368461-1e1e38ce8103?q=80&w=2070&auto=format&fit=crop" 
          alt="Stadium" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cc-dark via-cc-dark/80 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cc-green/20 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Skull className="text-white" size={24} />
          <span>Cutthroat Cup</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition">How it works</a>
          <a href="#" className="hover:text-white transition">Blog</a>
        </div>
        <Link to="/login" className="bg-cc-green text-black px-6 py-2 rounded-md font-bold hover:bg-green-400 transition">
          Login
        </Link>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
            World Cup 2026 Public and Private Leagues
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            STOP WATCHING <br />
            THE <span className="text-cc-green">WORLD CUP</span> ALONE
          </h1>
          <Skull size={64} className="text-white mb-6" />
          <p className="text-gray-400 max-w-2xl text-lg mb-10">
            Join a public league, draft a country portfolio, and turn every goal, 
            upset, and knockout collision into wallet movement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="border border-cc-green text-cc-green px-8 py-3 rounded-md font-bold hover:bg-cc-green/10 transition">
              Join a public league
            </button>
            <button className="bg-cc-green text-black px-8 py-3 rounded-md font-bold hover:bg-green-400 transition shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              Create a private league
            </button>
          </div>
        </motion.div>

        {/* Floating Cards (Demo) */}
        <div className="w-full max-w-5xl mt-20 flex flex-col md:flex-row justify-between gap-6 px-4">
          {/* Left Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-cc-card/80 backdrop-blur border border-cc-border p-6 rounded-xl w-full md:w-72 flex flex-col gap-6"
          >
            <div className="flex gap-4 items-start">
              <Users className="text-cc-green" />
              <div>
                <h3 className="font-bold text-sm mb-1">JOIN PUBLIC FAST</h3>
                <p className="text-xs text-gray-400">No commission. 100% of your entry fee goes into the prize pool.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <TrendingUp className="text-cc-green" />
              <div>
                <h3 className="font-bold text-sm mb-1">EVERY MATCH PAYS</h3>
                <p className="text-xs text-gray-400">Wins, draws, goals, clean sheets, and upsets cash out instantly.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Card (Next Match Preview) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-cc-card/80 backdrop-blur border border-cc-border p-6 rounded-xl w-full md:w-80"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-gray-400">Round of 16</span>
              <span className="bg-cc-red text-white text-[10px] font-bold px-2 py-1 rounded">Conflict</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🇧🇷</div>
                <div className="text-sm font-bold">Brazil</div>
              </div>
              <span className="text-gray-500 text-xs font-bold">VS</span>
              <div className="text-center">
                <div className="text-4xl mb-2">🇪🇸</div>
                <div className="text-sm font-bold">Spain</div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-6 border-b border-cc-border pb-4">
              <span>Manager owns both</span>
              <span>Cut one by Kickoff</span>
            </div>
            <div className="bg-cc-green/10 text-cc-green text-xs font-bold text-center py-2 rounded">
              Public waivers open • +10 win • +2 goal
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
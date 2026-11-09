import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Skull } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // LIVE RENDER BACKEND URL
      const res = await axios.post("https://cutthroat-cup.onrender.com/api/login/", {
        username,
        password,
      });
      // Token save cheyyunnu
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 font-['Poppins',sans-serif]">
      <div className="w-full max-w-md bg-[#111] border border-[#222] p-8 rounded-xl">
        <div className="flex flex-col items-center mb-8">
          <Skull size={48} className="text-[#39FF14] mb-4" />
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Login to manage your leagues</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#39FF14] text-black font-bold py-3 rounded-md hover:bg-green-400 transition mt-4"
          >
            Login
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account? <Link to="/signup" className="text-[#39FF14] hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
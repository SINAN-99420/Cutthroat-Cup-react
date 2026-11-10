import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Skull } from "lucide-react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // <-- Loading state add cheythu
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // <-- Loading start

    try {
      const res = await axios.post("https://cutthroat-cup.onrender.com/api/register/", {
        username,
        email,
        password,
      });
      // Token save cheyyunnu
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // Signup kazhinjal direct dashboard
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try a different username.");
      setIsLoading(false); // <-- Error vannal loading stop cheyyunnu
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 font-['Poppins',sans-serif]">
      <div className="w-full max-w-md bg-[#111] border border-[#222] p-8 rounded-xl">
        <div className="flex flex-col items-center mb-8">
          <Skull size={48} className="text-[#39FF14] mb-4" />
          <h1 className="text-2xl font-bold text-white">Create an Account</h1>
          <p className="text-gray-400 text-sm mt-2">Join the Cutthroat Cup</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]"
              placeholder="Choose a username"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]"
              placeholder="Create a password"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#39FF14] text-black font-bold py-3 rounded-md hover:bg-green-400 transition mt-4 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-[#39FF14] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
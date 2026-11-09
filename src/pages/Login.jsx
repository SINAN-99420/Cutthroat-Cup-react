import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      // Django TokenAuth Endpoint
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
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
    <div className="min-h-screen bg-cc-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-cc-card border border-cc-border p-8 rounded-xl">
        <div className="flex flex-col items-center mb-8">
          <Skull size={48} className="text-cc-green mb-4" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
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
              className="w-full bg-cc-dark border border-cc-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-cc-green"
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
              className="w-full bg-cc-dark border border-cc-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-cc-green"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cc-green text-black font-bold py-3 rounded-md hover:bg-green-400 transition mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
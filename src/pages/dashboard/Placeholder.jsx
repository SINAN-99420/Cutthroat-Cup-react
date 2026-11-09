import { Construction } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.split("/").pop();
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-500 p-6">
      <Construction size={48} className="text-[#39FF14] mb-4 opacity-50" />
      <h1 className="text-2xl font-bold text-white mb-2">{formattedName} Page</h1>
      <p className="text-sm">This section is under development for the MVP.</p>
    </div>
  );
}
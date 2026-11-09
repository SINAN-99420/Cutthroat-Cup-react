import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import DashboardHome from "./pages/dashboard/Home";
import Leagues from "./pages/dashboard/Leagues";
import Matches from "./pages/dashboard/Matches";
import Standings from "./pages/dashboard/Standings";
import Bracket from "./pages/dashboard/Bracket";
// New Pages
import Draft from "./pages/dashboard/Draft";
import Waivers from "./pages/dashboard/Waivers";
import Activity from "./pages/dashboard/Activity";
import ConflictCenter from "./pages/dashboard/ConflictCenter";
import Account from "./pages/dashboard/Account";
import Settings from "./pages/dashboard/Settings";
import Signup from "./pages/dashboard/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="leagues" element={<Leagues />} />
          <Route path="matches" element={<Matches />} />
          <Route path="standings" element={<Standings />} />
          <Route path="bracket" element={<Bracket />} />
          
          <Route path="draft" element={<Draft />} />
          <Route path="waivers" element={<Waivers />} />
          <Route path="activity" element={<Activity />} />
          <Route path="conflicts" element={<ConflictCenter />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
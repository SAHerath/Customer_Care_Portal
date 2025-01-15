import React from "react";
import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/ProfileView";
import GeneralPlans from "./pages/GeneralPlans";
import RoamingPlans from "./pages/RoamingPlans";


const App: React.FC = () => {
  const location = useLocation();

  // Map routes to dynamic titles
  const getTitle = (path: string): string => {
    const titleMap: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/dashboard/view-profile': 'Profile',
      '/dashboard/package-plans/general': 'General Plans',
      '/dashboard/package-plans/roaming': 'Roaming Plans',
      '/dashboard/settings': 'Settings',
    };
    return titleMap[path] || 'Dashboard';
  };

  const title = getTitle(location.pathname);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="/dashboard"
             element={
              <ProtectedRoute>
                <Dashboard title={title}/>
              </ProtectedRoute>
            } >
        <Route index element={<Home />} />
        <Route path="view-profile" element={<Profile />} />
        <Route path="package-plans/general" element={<GeneralPlans />} />
        <Route path="package-plans/roaming" element={<RoamingPlans />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
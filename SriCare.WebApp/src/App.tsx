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
import CurrentBill from "./pages/CurrentBill";
import PastBills from "./pages/PastBills";
import PaymentHistory from "./pages/PaymentHistory";
import Chat from "./pages/Chat";


const App: React.FC = () => {
  const location = useLocation();

  // Map routes to dynamic titles
  const getTitle = (path: string): string => {
    const titleMap: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/dashboard/view-profile': 'Profile',
      '/dashboard/packages/general': 'General Plans',
      '/dashboard/packages/roaming': 'Roaming Plans',
      '/dashboard/billing/summery': 'Bill Summery',
      '/dashboard/billing/history': 'Bill History',
      '/dashboard/billing/payments': 'Bill Payments',
      '/dashboard/settings': 'Settings',
      '/dashboard/chat': 'Live Chat',
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
        <Route path="packages/general" element={<GeneralPlans />} />
        <Route path="packages/roaming" element={<RoamingPlans />} />
        <Route path="billing/summery" element={<CurrentBill />} />
        <Route path="billing/history" element={<PastBills />} />
        <Route path="billing/payments" element={<PaymentHistory />} />
        <Route path="chat" element={<Chat />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
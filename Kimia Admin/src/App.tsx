import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DashboardLayout } from "./components/DashboardLayout";
import { UsersPage } from "./components/pages/UsersPage";
import { MeditationPage } from "./components/pages/MeditationPage";
import { ProgressionPage } from "./components/pages/ProgressionPage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";

export default function App() {
  const [activePage, setActivePage] = useState("users");
  const [authPage, setAuthPage] = useState<"login" | "register" | null>(
    "login"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // setAuthPage(null);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setAuthPage(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPage("login");
    setActivePage("users");
  };

  const renderPage = () => {
    switch (activePage) {
      case "users":
        return <UsersPage />;
      case "meditation":
        return <MeditationPage />;
      case "progression":
        return <ProgressionPage />;
      default:
        return <UsersPage />;
    }
  };

  
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        {authPage === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginPage
              onLogin={handleLogin}
              onSwitchToRegister={() => setAuthPage("register")}
            />
          </motion.div>
        )}
        {authPage === "register" && (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterPage
              onRegister={handleRegister}
              onSwitchToLogin={() => setAuthPage("login")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <DashboardLayout
      activePage={activePage}
      onPageChange={setActivePage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

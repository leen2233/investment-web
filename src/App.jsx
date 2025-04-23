import { Providers } from "./providers";
import DashboardPage from "./pages/Dashboard";
import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProfilePage from "./pages/ProfilePage";
import InvestmentsPage from "./pages/Investments";
import GamePage from "./pages/GamePage";
import WalletPage from "./pages/WalletPage";
import ReferralsPage from "./pages/ReferralsPage";
import SettingsPage from "./pages/SettingsPage";
import DepositPage from "./pages/DepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditProfilePage from "./pages/EditProfilePage";
import TransactionsPage from "./pages/TransactionsPage";
import "@/src/translations/i18n";

// Layout component for pages with Navbar and Sidebar
function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Auth pages without Navbar/Sidebar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* All other pages nested inside MainLayout */}
          <Route
            path="*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/error" element={<div>Error Page</div>} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/edit" element={<EditProfilePage />} />
                  <Route path="/investments" element={<InvestmentsPage />} />
                  <Route path="/game" element={<GamePage />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route
                    path="/wallet/transactions"
                    element={<TransactionsPage />}
                  />
                  <Route path="/referrals" element={<ReferralsPage />} />
                  <Route path="/profile/settings" element={<SettingsPage />} />
                  <Route path="/wallet/deposit" element={<DepositPage />} />
                  <Route path="/wallet/withdraw" element={<WithdrawPage />} />
                </Routes>
              </MainLayout>
            }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Providers>
  );
}

import { DashboardHeader } from "../../components/dashboard/dashboard-header";
import { DashboardStats } from "../../components/dashboard/dashboard-stats";
import { ProfitCalculator } from "../../components/dashboard/profit-calculator";
import { InvestmentPlans } from "../../components/dashboard/investment-plans";
import { RecentTransactions } from "../../components/dashboard/recent-transactions";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const [plans, setPlans] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await api.get("/investments/plans");
      setPlans(response);
    };

    const fetchTransactions = async () => {
      const response = await api.get("users/transactions/recent");
      setLastTransactions(response);
    };

    const fetchStats = async () => {
      const response = await api.get("users/me/stats");
      setStats(response);
    };

    fetchPlans();
    fetchTransactions();
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={t("nav.dashboard")}
        description={t("dashboard.welcome")}
      />

      <DashboardStats stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfitCalculator />
        <RecentTransactions transactions={lastTransactions} />
      </div>

      <InvestmentPlans plans={plans} />
    </div>
  );
}

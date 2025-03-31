import { DashboardHeader } from "../../components/dashboard/dashboard-header";
import { DashboardStats } from "../../components/dashboard/dashboard-stats";
import { ProfitCalculator } from "../../components/dashboard/profit-calculator";
import { InvestmentPlans } from "../../components/dashboard/investment-plans";
import { RecentTransactions } from "../../components/dashboard/recent-transactions";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [plans, setPlans] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [stats, setStats] = useState({});

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
        title="Dashboard"
        description="Welcome back! Here's an overview of your investments and earnings."
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

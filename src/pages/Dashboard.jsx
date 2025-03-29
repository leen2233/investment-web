import { DashboardHeader } from "../../components/dashboard/dashboard-header";
import { DashboardStats } from "../../components/dashboard/dashboard-stats";
import { ProfitCalculator } from "../../components/dashboard/profit-calculator";
import { InvestmentPlans } from "../../components/dashboard/investment-plans";
import { RecentTransactions } from "../../components/dashboard/recent-transactions";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your investments and earnings."
      />

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfitCalculator />
        <RecentTransactions />
      </div>

      <InvestmentPlans />
    </div>
  );
}

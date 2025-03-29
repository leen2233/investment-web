import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { InvestmentPlansFull } from "@/components/investments/investment-plans-full";
import { ActiveInvestments } from "@/components/investments/active-investments";

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Investment Plans"
        description="Choose from our range of investment plans with different risk levels and returns."
      />

      <InvestmentPlansFull />
      <ActiveInvestments />
    </div>
  );
}

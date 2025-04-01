import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { InvestmentPlansFull } from "@/components/investments/investment-plans-full";
import { ActiveInvestments } from "@/components/investments/active-investments";
import { api } from "@/lib/axios";
import { useState, useEffect } from "react";

export default function InvestmentsPage() {
  const [plans, setPlans] = useState([]);
  const [activeInvestments, setActiveInvestments] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await api.get("/investments/plans");
      setPlans(response);
    };

    const fetchInvestments = async () => {
      const response = await api.get("/users/me/investments");
      setActiveInvestments(response);
    };

    fetchPlans();
    fetchInvestments();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Investment Plans"
        description="Choose from our range of investment plans with different risk levels and returns."
      />

      <InvestmentPlansFull plans={plans} />
      <ActiveInvestments investments={activeInvestments} />
    </div>
  );
}

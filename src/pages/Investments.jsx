import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { InvestmentPlansFull } from "@/components/investments/investment-plans-full";
import { ActiveInvestments } from "@/components/investments/active-investments";
import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function InvestmentsPage() {
  const [plans, setPlans] = useState([]);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const { t } = useTranslation();

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
        title={t("investments.availablePlans")}
        description={t("investments.choosePlan")}
      />

      <InvestmentPlansFull plans={plans} />
      <ActiveInvestments investments={activeInvestments} />
    </div>
  );
}

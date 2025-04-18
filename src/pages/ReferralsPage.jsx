import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ReferralLink } from "@/components/referrals/referral-link";
import { ReferralLeaderboard } from "@/components/referrals/referral-leaderboard";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useTranslation } from "react-i18next";

const ReferralStats = ({ referral }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">
          {t("referrals.statistics")}
        </h3>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          {t("referrals.statisticsDescription")}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-lg font-semibold">{referral.referral_count}</p>
            <p className="text-sm text-muted-foreground">
              {t("referrals.totalReferrals")}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">${referral.earnings}</p>
            <p className="text-sm text-muted-foreground">
              {t("referrals.earnings")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReferralsPage() {
  const [referral, setReferral] = useState({});
  const [topReferrers, setTopReferrers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const response = await api.get("/users/referrals/");
        setReferral(response);
      } catch (error) {
        console.error("Error fetching referral data:", error);
      }
    };

    const fetchTopReferrers = async () => {
      try {
        const response = await api.get("/top-referrers");
        setTopReferrers(response);
      } catch (error) {
        console.error("Error fetching top referrers:", error);
      }
    };

    fetchReferralData();
    fetchTopReferrers();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={t("referrals.program")}
        description={t("referrals.description")}
      />

      <ReferralStats referral={referral} />
      <ReferralLink code={referral.referral_code} />
      <ReferralLeaderboard topReferrers={topReferrers} />
    </div>
  );
}

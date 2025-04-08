import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ReferralLink } from "@/components/referrals/referral-link";
import { ReferralLeaderboard } from "@/components/referrals/referral-leaderboard";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

const ReferralStats = ({ referral }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">
          Referral Statistics
        </h3>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Here's an overview of your referral performance.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-lg font-semibold">{referral.referral_count}</p>
            <p className="text-sm text-muted-foreground">Referrals</p>
          </div>
          <div>
            <p className="text-lg font-semibold">${referral.earnings}</p>
            <p className="text-sm text-muted-foreground">Earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReferralsPage() {
  const [referral, setReferral] = useState({});
  const [topReferrers, setTopReferrers] = useState([]);

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
        title="Referral Program"
        description="Invite friends and earn rewards when they join and invest."
      />

      <ReferralStats referral={referral} />
      <ReferralLink code={referral.referral_code} />
      <ReferralLeaderboard topReferrers={topReferrers} />
    </div>
  );
}

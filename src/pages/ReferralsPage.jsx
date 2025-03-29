"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ReferralLink } from "@/components/referrals/referral-link";
import { ReferralLeaderboard } from "@/components/referrals/referral-leaderboard";

const ReferralStats = () => {
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
            <p className="text-lg font-semibold">10</p>
            <p className="text-sm text-muted-foreground">Referrals</p>
          </div>
          <div>
            <p className="text-lg font-semibold">$50</p>
            <p className="text-sm text-muted-foreground">Earnings</p>
          </div>
          <div>
            <p className="text-lg font-semibold">2</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Referral Program"
        description="Invite friends and earn rewards when they join and invest."
      />

      <ReferralStats />
      <ReferralLink />
      <ReferralLeaderboard />
    </div>
  );
}

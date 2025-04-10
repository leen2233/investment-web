import { UserProfile } from "@/components/profile/user-profile";
import { UserBalance } from "@/components/profile/user-balance";
import { ReferralProgram } from "@/components/profile/referral-program";
import { Rewards } from "@/components/profile/rewards";
import { TransactionHistory } from "@/components/profile/transaction-history";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link to="/profile/settings">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </Link>
      </div>

      <UserProfile />

      <div className="grid gap-8 md:grid-cols-3">
        <UserBalance />
        <ReferralProgram />
        {/* <Rewards /> */}
      </div>

      <TransactionHistory />
    </div>
  );
}

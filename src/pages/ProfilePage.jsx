import { UserProfile } from "@/components/profile/user-profile";
import { UserBalance } from "@/components/profile/user-balance";
import { ReferralProgram } from "@/components/profile/referral-program";
import { Rewards } from "@/components/profile/rewards";
import { TransactionHistory } from "@/components/profile/transaction-history";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/auth-context";

export default function ProfilePage() {
  const { user, checkAuth } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const updateUser = async () => {
      await checkAuth();
    };
    updateUser();
  }, []);

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("nav.profile")}</h1>
        <Link to="/profile/settings">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{t("nav.settings")}</span>
          </Button>
        </Link>
      </div>

      <UserProfile user={user} />

      <div className="grid gap-8 md:grid-cols-3">
        <UserBalance balance={user?.balance} />
        <ReferralProgram />
        {/* <Rewards /> */}
      </div>

      <TransactionHistory />
    </div>
  );
}

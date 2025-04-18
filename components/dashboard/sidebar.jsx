import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import { TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="hidden w-64 border-r border-border/40 p-4 md:block">
      <div className="space-y-4">
        <UserBalance balance={user?.balance || 0} />
        {user && user.investments && (
          <StatsCard
            title={t("dashboard.activeInvestments")}
            value={user.investments.active_investments}
            subtitle={t("dashboard.totalValue", {
              value: user.investments.total_value,
            })}
            icon={<TrendingUp className="h-4 w-4 text-neon-cyan" />}
          />
        )}
        {user && user.referral_earnings && (
          <StatsCard
            title={t("dashboard.referralEarnings")}
            value={user.referral_earnings.earnings}
            subtitle={t("dashboard.activeReferrals", {
              count: user.referral_earnings.referrals,
            })}
            icon={<Award className="h-4 w-4 text-neon-purple" />}
            prefix="$"
          />
        )}
        {user && user.next_reward && (
          <ReferralProgress reward={user.next_reward} />
        )}
      </div>
    </div>
  );
}

function UserBalance({ balance }) {
  const { t } = useTranslation();

  return (
    <Card className="glassmorphism overflow-hidden">
      <div className="absolute inset-0 bg-glow-blue opacity-10" />
      <div className="p-4">
        <div className="mb-1 text-sm font-medium text-muted-foreground">
          {t("dashboard.yourBalance")}
        </div>
        <div className="text-2xl font-bold text-glow">
          $<CountUp end={balance} duration={2} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {t("dashboard.availableForWithdrawal")}
          </span>
          <span className="text-xs font-medium text-neon-blue">
            ${(balance / 100) * 90}
          </span>
        </div>
      </div>
    </Card>
  );
}

function StatsCard({ title, value, subtitle, icon, prefix = "" }) {
  return (
    <Card className="glassmorphism overflow-hidden">
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          {icon}
        </div>
        <div className="text-xl font-bold">
          {prefix}
          <CountUp end={value} duration={1.5} />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </Card>
  );
}

function ReferralProgress({ reward }) {
  const { t } = useTranslation();

  return (
    <Card className="glassmorphism overflow-hidden">
      <div className="p-4">
        <div className="mb-1 text-sm font-medium text-muted-foreground">
          {t("dashboard.referralProgress")}
        </div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span>
            {t("dashboard.nextRewardAt", { count: reward.referral_count })}
          </span>
          <span>{reward.current_referrals}/15</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-purple to-neon-blue"
            initial={{ width: 0 }}
            animate={{
              width:
                (100 / reward.referral_count) * reward.current_referrals + "%",
            }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {t("dashboard.reward")}:{" "}
          <span className="font-medium text-neon-purple">
            {t("dashboard.bonusAmount", { amount: reward.amount })}
          </span>
        </div>
      </div>
    </Card>
  );
}

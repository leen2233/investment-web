import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import { TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";

export function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="hidden w-64 border-r border-border/40 p-4 md:block">
      <div className="space-y-4">
        <UserBalance balance={user?.balance || 0} />
        {user && user.investments && (
          <StatsCard
            title="Active Investments"
            value={user.investments.active_investments}
            subtitle={"$" + user.investments.total_value + " total value"}
            icon={<TrendingUp className="h-4 w-4 text-neon-cyan" />}
          />
        )}
        {user && user.referral_earnings && (
          <StatsCard
            title="Referral Earnings"
            value={user.referral_earnings.earnings}
            subtitle={user.referral_earnings.referrals + " active referrals"}
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
  return (
    <Card className="glassmorphism overflow-hidden">
      <div className="absolute inset-0 bg-glow-blue opacity-10" />
      <div className="p-4">
        <div className="mb-1 text-sm font-medium text-muted-foreground">
          Your Balance
        </div>
        <div className="text-2xl font-bold text-glow">
          $<CountUp end={balance} duration={2} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Available for withdrawal
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
  return (
    <Card className="glassmorphism overflow-hidden">
      <div className="p-4">
        <div className="mb-1 text-sm font-medium text-muted-foreground">
          Referral Progress
        </div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span>Next reward at {reward.referral_count} referrals</span>
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
          Reward:{" "}
          <span className="font-medium text-neon-purple">
            ${reward.amount} Bonus
          </span>
        </div>
      </div>
    </Card>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function WalletBalance({ stats }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const balances = [
    {
      title: t("dashboard.totalBalance"),
      value: stats?.balance?.total || 0,
      icon: <Wallet className="h-5 w-5 text-neon-blue" />,
      color: "blue",
    },
    {
      title: t("wallet.deposits"),
      value: stats?.deposits?.total || 0,
      icon: <ArrowUpRight className="h-5 w-5 text-neon-cyan" />,
      color: "cyan",
    },
    {
      title: t("wallet.withdrawals"),
      value: stats?.withdrawals?.total || 0,
      icon: <ArrowDownRight className="h-5 w-5 text-neon-purple" />,
      color: "purple",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {balances.map((balance, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="glassmorphism overflow-hidden">
            <div
              className={`absolute inset-0 bg-glow-${balance.color} opacity-20`}
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">
                  {balance.title}
                </div>
                {balance.icon}
              </div>
              <div className="mt-2 text-3xl font-bold text-glow">
                $<CountUp end={balance.value} duration={2} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {t("wallet.availableForWithdrawal")}:{" "}
                <span className="font-medium text-foreground">
                  ${Math.floor(balance.value * 0.95)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

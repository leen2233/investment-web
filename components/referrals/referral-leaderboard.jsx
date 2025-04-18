"use client";

import { motion } from "framer-motion";
import { Trophy, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

export function ReferralLeaderboard({ topReferrers }) {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-neon-purple" />
            <CardTitle>{t("referrals.topReferrers")}</CardTitle>
          </div>
          <CardDescription>{t("referrals.topReferrersDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="max-h-[400px] overflow-y-auto pr-2 scrollbar-hidden"
          >
            {topReferrers.map((referrer, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-secondary/30 transition-colors mb-2"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      index + 1 === 1
                        ? "bg-yellow-500/80"
                        : index + 1 === 2
                        ? "bg-gray-300/80"
                        : index + 1 === 3
                        ? "bg-amber-600/80"
                        : "bg-muted"
                    } text-background font-bold`}
                  >
                    {index + 1}
                  </div>
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-xs">
                      {referrer.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">@{referrer.username}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>
                        {t("referrals.referralCount", {
                          count: referrer.referred_number,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-neon-cyan">
                  ${referrer.referral_earnings}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

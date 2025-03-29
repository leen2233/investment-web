"use client"

import { motion } from "framer-motion"
import { Trophy, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ReferralLeaderboard() {
  const topReferrers = [
    { rank: 1, name: "Alex Johnson", referrals: 45, earnings: "$2,250", avatar: "AJ" },
    { rank: 2, name: "Sarah Miller", referrals: 38, earnings: "$1,900", avatar: "SM" },
    { rank: 3, name: "David Chen", referrals: 32, earnings: "$1,600", avatar: "DC" },
    { rank: 4, name: "Emma Wilson", referrals: 29, earnings: "$1,450", avatar: "EW" },
    { rank: 5, name: "Michael Brown", referrals: 24, earnings: "$1,200", avatar: "MB" },
    { rank: 6, name: "Jessica Lee", referrals: 21, earnings: "$1,050", avatar: "JL" },
    { rank: 7, name: "Robert Kim", referrals: 19, earnings: "$950", avatar: "RK" },
    { rank: 8, name: "Lisa Wang", referrals: 17, earnings: "$850", avatar: "LW" },
    { rank: 9, name: "James Taylor", referrals: 15, earnings: "$750", avatar: "JT" },
    { rank: 10, name: "Olivia Davis", referrals: 13, earnings: "$650", avatar: "OD" },
  ]

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
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-neon-purple" />
            <CardTitle>Top Referrers</CardTitle>
          </div>
          <CardDescription>The most successful members of our referral program</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="max-h-[400px] overflow-y-auto pr-2 scrollbar-hidden"
          >
            {topReferrers.map((referrer) => (
              <motion.div
                key={referrer.rank}
                variants={itemVariants}
                className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-secondary/30 transition-colors mb-2"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      referrer.rank === 1
                        ? "bg-yellow-500/80"
                        : referrer.rank === 2
                          ? "bg-gray-300/80"
                          : referrer.rank === 3
                            ? "bg-amber-600/80"
                            : "bg-muted"
                    } text-background font-bold`}
                  >
                    {referrer.rank}
                  </div>
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-xs">
                      {referrer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{referrer.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{referrer.referrals} referrals</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-neon-cyan">{referrer.earnings}</div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


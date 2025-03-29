"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CountUp } from "@/components/ui/count-up"

export function ReferralStats() {
  const stats = [
    {
      title: "Total Referrals",
      value: 12,
      icon: <Users className="h-5 w-5 text-neon-blue" />,
      color: "blue",
    },
    {
      title: "Referral Earnings",
      value: 350,
      prefix: "$",
      icon: <DollarSign className="h-5 w-5 text-neon-cyan" />,
      color: "cyan",
    },
    {
      title: "Next Reward",
      value: "15 referrals",
      progress: 80,
      reward: "$100 Bonus",
      icon: <Award className="h-5 w-5 text-neon-purple" />,
      color: "purple",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div className="grid gap-4 md:grid-cols-3" variants={containerVariants} initial="hidden" animate="visible">
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="glassmorphism overflow-hidden h-full">
            <div className={`absolute inset-0 bg-glow-${stat.color} opacity-20`} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                {stat.icon}
              </div>
              {typeof stat.value === "number" ? (
                <div className="mt-2 text-2xl font-bold">
                  {stat.prefix && stat.prefix}
                  <CountUp end={stat.value} duration={2} />
                </div>
              ) : (
                <div className="mt-2 text-2xl font-bold">{stat.value}</div>
              )}

              {stat.progress && (
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>12/15</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r from-neon-${stat.color} to-neon-${stat.color}/60`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Reward: <span className="font-medium text-neon-purple">{stat.reward}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}


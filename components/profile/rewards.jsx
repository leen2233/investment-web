"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CountUp } from "@/components/ui/count-up"

export function Rewards() {
  const rewards = [
    {
      title: "$25 Bonus",
      points: 1000,
      icon: <Gift className="h-4 w-4" />,
    },
    {
      title: "Free Withdrawal",
      points: 500,
      icon: <Gift className="h-4 w-4" />,
    },
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
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <div className="absolute inset-0 bg-glow-cyan opacity-10" />
        <CardHeader className="pb-3">
          <CardTitle>Rewards</CardTitle>
          <CardDescription>Your loyalty points and rewards</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm">Available Points</span>
            <span className="font-medium text-neon-cyan">
              <CountUp end={1250} duration={2} /> pts
            </span>
          </div>
          <motion.div className="space-y-4" variants={listVariants} initial="hidden" animate="visible">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-neon-cyan/10 p-2 text-neon-cyan">{reward.icon}</div>
                  <div>
                    <div className="font-medium">{reward.title}</div>
                    <div className="text-xs text-muted-foreground">{reward.points} points</div>
                  </div>
                </div>
                <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-neon-cyan to-neon-blue hover:shadow-neon-cyan transition-all duration-300"
                  >
                    Redeem
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


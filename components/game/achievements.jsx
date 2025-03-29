"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Trophy, Award, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Achievements() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50])

  const achievements = [
    {
      title: "Daily Player",
      description: "Play the game for 7 consecutive days",
      icon: <Trophy className="h-5 w-5" />,
      progress: 71,
      reward: "250 points",
      color: "purple",
    },
    {
      title: "Big Winner",
      description: "Win over 1000 points in a single spin",
      icon: <Award className="h-5 w-5" />,
      progress: 45,
      reward: "500 points",
      color: "blue",
    },
    {
      title: "Leaderboard Champion",
      description: "Reach top 10 on the weekly leaderboard",
      icon: <Trophy className="h-5 w-5" />,
      progress: 10,
      reward: "1000 points",
      color: "cyan",
    },
    {
      title: "Investment Master",
      description: "Have 5 active investments simultaneously",
      icon: <Target className="h-5 w-5" />,
      progress: 60,
      reward: "750 points",
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (progress: number) => ({
      width: `${progress}%`,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  }

  return (
    <motion.div ref={containerRef} style={{ opacity, y }}>
      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <motion.div variants={headerVariants} initial="hidden" animate="visible">
            <CardTitle>Your Achievements</CardTitle>
            <CardDescription>Complete tasks to earn rewards and climb the leaderboard</CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="rounded-lg border border-border/40 bg-card p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`rounded-full bg-neon-${achievement.color}/10 p-2 text-neon-${achievement.color}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r from-neon-${achievement.color} to-neon-${achievement.color}/60`}
                        custom={achievement.progress}
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Reward: <span className="font-medium text-foreground">{achievement.reward}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


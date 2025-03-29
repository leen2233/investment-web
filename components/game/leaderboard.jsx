"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState("weekly")

  const leaderboardData = {
    daily: [
      { rank: 1, name: "Alex Johnson", points: 2450, avatar: "/placeholder.svg" },
      { rank: 2, name: "Sarah Miller", points: 1980, avatar: "/placeholder.svg" },
      { rank: 3, name: "David Chen", points: 1740, avatar: "/placeholder.svg" },
      { rank: 4, name: "Emma Wilson", points: 1520, avatar: "/placeholder.svg" },
      { rank: 5, name: "Michael Brown", points: 1350, avatar: "/placeholder.svg" },
    ],
    weekly: [
      { rank: 1, name: "Sarah Miller", points: 8750, avatar: "/placeholder.svg" },
      { rank: 2, name: "Alex Johnson", points: 7620, avatar: "/placeholder.svg" },
      { rank: 3, name: "Emma Wilson", points: 6540, avatar: "/placeholder.svg" },
      { rank: 4, name: "David Chen", points: 5980, avatar: "/placeholder.svg" },
      { rank: 5, name: "Michael Brown", points: 4750, avatar: "/placeholder.svg" },
    ],
    monthly: [
      { rank: 1, name: "Emma Wilson", points: 24680, avatar: "/placeholder.svg" },
      { rank: 2, name: "Sarah Miller", points: 22450, avatar: "/placeholder.svg" },
      { rank: 3, name: "Alex Johnson", points: 19870, avatar: "/placeholder.svg" },
      { rank: 4, name: "Michael Brown", points: 17540, avatar: "/placeholder.svg" },
      { rank: 5, name: "David Chen", points: 15980, avatar: "/placeholder.svg" },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>Top players this week</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value={activeTab} className="mt-4 space-y-4">
                  <motion.div variants={listVariants} initial="hidden" animate="visible">
                    {leaderboardData[activeTab as keyof typeof leaderboardData].map((player) => (
                      <motion.div
                        key={player.rank}
                        variants={itemVariants}
                        className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              player.rank === 1
                                ? "bg-yellow-500/80"
                                : player.rank === 2
                                  ? "bg-gray-300/80"
                                  : player.rank === 3
                                    ? "bg-amber-600/80"
                                    : "bg-muted"
                            } text-background font-bold`}
                          >
                            {player.rank}
                          </div>
                          <Avatar>
                            <AvatarImage src={player.avatar} alt={player.name} />
                            <AvatarFallback>
                              {player.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">{player.points.toLocaleString()} points</div>
                          </div>
                        </div>
                        {player.rank <= 3 && (
                          <motion.div
                            className="flex items-center gap-1 text-sm font-medium"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + player.rank * 0.1 }}
                          >
                            <Trophy
                              className={`h-4 w-4 ${
                                player.rank === 1
                                  ? "text-yellow-500"
                                  : player.rank === 2
                                    ? "text-gray-400"
                                    : "text-amber-600"
                              }`}
                            />
                            <span>{player.rank === 1 ? "1st" : player.rank === 2 ? "2nd" : "3rd"}</span>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center bg-muted/30 px-6 py-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="gap-2">
              View Full Leaderboard
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


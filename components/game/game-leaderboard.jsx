import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function GameLeaderboard() {
  const [activeTab, setActiveTab] = useState("daily");

  const leaderboardData = {
    daily: [
      { rank: 1, name: "Alex Johnson", winnings: 2450, avatar: "AJ" },
      { rank: 2, name: "Sarah Miller", winnings: 1980, avatar: "SM" },
      { rank: 3, name: "David Chen", winnings: 1740, avatar: "DC" },
      { rank: 4, name: "Emma Wilson", winnings: 1520, avatar: "EW" },
      { rank: 5, name: "Michael Brown", winnings: 1350, avatar: "MB" },
      { rank: 6, name: "Jessica Lee", winnings: 1120, avatar: "JL" },
      { rank: 7, name: "Robert Kim", winnings: 980, avatar: "RK" },
      { rank: 8, name: "Lisa Wang", winnings: 850, avatar: "LW" },
      { rank: 9, name: "James Taylor", winnings: 720, avatar: "JT" },
      { rank: 10, name: "Olivia Davis", winnings: 650, avatar: "OD" },
    ],
    weekly: [
      { rank: 1, name: "Sarah Miller", winnings: 8750, avatar: "SM" },
      { rank: 2, name: "Alex Johnson", winnings: 7620, avatar: "AJ" },
      { rank: 3, name: "Emma Wilson", winnings: 6540, avatar: "EW" },
      { rank: 4, name: "David Chen", winnings: 5980, avatar: "DC" },
      { rank: 5, name: "Michael Brown", winnings: 4750, avatar: "MB" },
      { rank: 6, name: "Jessica Lee", winnings: 4120, avatar: "JL" },
      { rank: 7, name: "Robert Kim", winnings: 3680, avatar: "RK" },
      { rank: 8, name: "Lisa Wang", winnings: 3250, avatar: "LW" },
      { rank: 9, name: "James Taylor", winnings: 2920, avatar: "JT" },
      { rank: 10, name: "Olivia Davis", winnings: 2650, avatar: "OD" },
    ],
    monthly: [
      { rank: 1, name: "Emma Wilson", winnings: 24680, avatar: "EW" },
      { rank: 2, name: "Sarah Miller", winnings: 22450, avatar: "SM" },
      { rank: 3, name: "Alex Johnson", winnings: 19870, avatar: "AJ" },
      { rank: 4, name: "Michael Brown", winnings: 17540, avatar: "MB" },
      { rank: 5, name: "David Chen", winnings: 15980, avatar: "DC" },
      { rank: 6, name: "Jessica Lee", winnings: 14120, avatar: "JL" },
      { rank: 7, name: "Robert Kim", winnings: 12680, avatar: "RK" },
      { rank: 8, name: "Lisa Wang", winnings: 11250, avatar: "LW" },
      { rank: 9, name: "James Taylor", winnings: 9920, avatar: "JT" },
      { rank: 10, name: "Olivia Davis", winnings: 8650, avatar: "OD" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            defaultValue="daily"
            value={activeTab}
            onValueChange={setActiveTab}
          >
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
                  <motion.div
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-h-[400px] overflow-y-auto pr-2 scrollbar-hidden"
                  >
                    {leaderboardData[activeTab].map((player) => (
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
                          <Avatar className="h-8 w-8 border border-border">
                            <AvatarFallback className="bg-neon-blue/20 text-neon-blue text-xs">
                              {player.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ${player.winnings.toLocaleString()}
                            </div>
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
      </Card>
    </motion.div>
  );
}

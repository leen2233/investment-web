import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

export function GameLeaderboard({ data }) {
  const [activeTab, setActiveTab] = useState("daily");
  const { t } = useTranslation();

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
          <CardTitle>{t("game.leaderboard")}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs
            defaultValue="daily"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="daily">{t("game.daily")}</TabsTrigger>
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
                    {data.map((player, index) => (
                      <motion.div
                        key={player.rank}
                        variants={itemVariants}
                        className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-secondary/30 transition-colors"
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
                            <AvatarFallback className="bg-neon-blue/20 text-neon-blue text-xs">
                              {player.username[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              @{player.username}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${player.earnings.toLocaleString()}{" "}
                              {t("game.earned")}
                            </div>
                          </div>
                        </div>
                        {index < 3 && (
                          <motion.div
                            className="flex items-center gap-1 text-sm font-medium"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + (index + 1) * 0.1 }}
                          >
                            <Trophy
                              className={`h-4 w-4 ${
                                index + 1 === 1
                                  ? "text-yellow-500"
                                  : index + 1 === 2
                                  ? "text-gray-400"
                                  : "text-amber-600"
                              }`}
                            />
                            <span className="sr-only">
                              {t("game.place", { place: index + 1 })}
                            </span>
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

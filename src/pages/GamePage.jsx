import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SpinWheel } from "@/components/game/spin-wheel";
import { GameLeaderboard } from "@/components/game/game-leaderboard";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function GamePage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await api.get("/spin-leaderboard");
        setLeaderboardData(response);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={t("nav.game")}
        description={t("game.description")}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SpinWheel />
        <GameLeaderboard data={leaderboardData} />
      </div>
    </div>
  );
}

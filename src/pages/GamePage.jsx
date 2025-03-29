import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SpinWheel } from "@/components/game/spin-wheel";
import { GameLeaderboard } from "@/components/game/game-leaderboard";

export default function GamePage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="P2E Game"
        description="Spin the wheel to multiply your investment and compete for the top spot on the leaderboard."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SpinWheel />
        <GameLeaderboard />
      </div>
    </div>
  );
}

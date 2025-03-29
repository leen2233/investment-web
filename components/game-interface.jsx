"use client"

import type React from "react"

import { useState } from "react"
import { Award, ChevronRight, Gamepad2, RefreshCw, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function GameInterface() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState<number | null>(null)

  const handleSpin = () => {
    setIsSpinning(true)
    setSpinResult(null)

    // Simulate spinning wheel with random result
    setTimeout(() => {
      const result = Math.floor(Math.random() * 100) + 1
      setSpinResult(result)
      setIsSpinning(false)
    }, 2000)
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">P2E Game Center</h2>
        <Button variant="outline" className="gap-2">
          <Gamepad2 className="h-4 w-4" />
          Game History
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Spin to Win</CardTitle>
            <CardDescription>Spin the wheel for a chance to win rewards and bonuses</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="relative mb-8 h-64 w-64">
              <div
                className={`absolute inset-0 rounded-full border-4 border-dashed border-primary/50 ${isSpinning ? "animate-spin" : ""}`}
                style={{ animationDuration: "1s" }}
              />
              <div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
                style={{
                  transform: isSpinning ? "scale(0.95)" : "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {spinResult !== null ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{spinResult}</div>
                    <div className="mt-2 text-sm font-medium text-white/80">
                      {spinResult > 75
                        ? "Jackpot!"
                        : spinResult > 50
                          ? "Big Win!"
                          : spinResult > 25
                            ? "Winner!"
                            : "Try Again!"}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    {isSpinning ? (
                      <RefreshCw className="h-12 w-12 animate-spin" />
                    ) : (
                      <div className="text-xl font-medium">Click Spin!</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Button size="lg" className="mt-4 px-8" onClick={handleSpin} disabled={isSpinning}>
              {isSpinning ? "Spinning..." : "Spin Now"}
            </Button>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-4 text-center text-sm text-muted-foreground">
            You have 3 free spins remaining today. Additional spins cost 10 points each.
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Top players this week</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="mt-4 space-y-4">
                <LeaderboardItem rank={1} name="Alex Johnson" points={2450} avatar="/placeholder.svg" />
                <LeaderboardItem rank={2} name="Sarah Miller" points={1980} avatar="/placeholder.svg" />
                <LeaderboardItem rank={3} name="David Chen" points={1740} avatar="/placeholder.svg" />
                <LeaderboardItem rank={4} name="Emma Wilson" points={1520} avatar="/placeholder.svg" />
                <LeaderboardItem rank={5} name="Michael Brown" points={1350} avatar="/placeholder.svg" />
              </TabsContent>
              <TabsContent value="weekly" className="mt-4 space-y-4">
                <LeaderboardItem rank={1} name="Sarah Miller" points={8750} avatar="/placeholder.svg" />
                <LeaderboardItem rank={2} name="Alex Johnson" points={7620} avatar="/placeholder.svg" />
                <LeaderboardItem rank={3} name="Emma Wilson" points={6540} avatar="/placeholder.svg" />
                <LeaderboardItem rank={4} name="David Chen" points={5980} avatar="/placeholder.svg" />
                <LeaderboardItem rank={5} name="Michael Brown" points={4750} avatar="/placeholder.svg" />
              </TabsContent>
              <TabsContent value="monthly" className="mt-4 space-y-4">
                <LeaderboardItem rank={1} name="Emma Wilson" points={24680} avatar="/placeholder.svg" />
                <LeaderboardItem rank={2} name="Sarah Miller" points={22450} avatar="/placeholder.svg" />
                <LeaderboardItem rank={3} name="Alex Johnson" points={19870} avatar="/placeholder.svg" />
                <LeaderboardItem rank={4} name="Michael Brown" points={17540} avatar="/placeholder.svg" />
                <LeaderboardItem rank={5} name="David Chen" points={15980} avatar="/placeholder.svg" />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center bg-muted/50 px-6 py-4">
            <Button variant="outline" className="gap-2">
              View Full Leaderboard
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Complete tasks to earn rewards and climb the leaderboard</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <AchievementCard
            title="Daily Player"
            description="Play the game for 7 consecutive days"
            icon={<Trophy className="h-5 w-5" />}
            progress={71}
            reward="250 points"
          />
          <AchievementCard
            title="Big Winner"
            description="Win over 1000 points in a single spin"
            icon={<Award className="h-5 w-5" />}
            progress={45}
            reward="500 points"
          />
          <AchievementCard
            title="Leaderboard Champion"
            description="Reach top 10 on the weekly leaderboard"
            icon={<Trophy className="h-5 w-5" />}
            progress={10}
            reward="1000 points"
          />
        </CardContent>
      </Card>
    </div>
  )
}

interface LeaderboardItemProps {
  rank: number
  name: string
  points: number
  avatar: string
}

function LeaderboardItem({ rank, name, points, avatar }: LeaderboardItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            rank === 1 ? "bg-yellow-500" : rank === 2 ? "bg-gray-300" : rank === 3 ? "bg-amber-600" : "bg-muted"
          } text-background font-bold`}
        >
          {rank}
        </div>
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{points.toLocaleString()} points</div>
        </div>
      </div>
      {rank <= 3 && (
        <div className="flex items-center gap-1 text-sm font-medium">
          <Trophy
            className={`h-4 w-4 ${rank === 1 ? "text-yellow-500" : rank === 2 ? "text-gray-400" : "text-amber-600"}`}
          />
          <span>{rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}</span>
        </div>
      )}
    </div>
  )
}

interface AchievementCardProps {
  title: string
  description: string
  icon: React.ReactNode
  progress: number
  reward: string
}

function AchievementCard({ title, description, icon, progress, reward }: AchievementCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="text-xs text-muted-foreground">
          Reward: <span className="font-medium text-foreground">{reward}</span>
        </div>
      </div>
    </div>
  )
}


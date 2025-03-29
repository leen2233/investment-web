"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function GameInterface() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState<number | null>(null)
  const [spinHistory, setSpinHistory] = useState<number[]>([])
  const [spinsRemaining, setSpinsRemaining] = useState(3)

  const handleSpin = () => {
    if (spinsRemaining <= 0) return

    setIsSpinning(true)
    setSpinResult(null)

    // Simulate spinning wheel with random result
    setTimeout(() => {
      const result = Math.floor(Math.random() * 100) + 1
      setSpinResult(result)
      setSpinHistory((prev) => [result, ...prev].slice(0, 5))
      setSpinsRemaining((prev) => prev - 1)
      setIsSpinning(false)
    }, 2000)
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

  const wheelVariants = {
    initial: { rotate: 0 },
    spinning: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
    stopped: { rotate: 0 },
  }

  const resultVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5 },
  }

  const getResultColor = (result: number) => {
    if (result > 75) return "text-neon-purple text-glow"
    if (result > 50) return "text-neon-blue text-glow-blue"
    if (result > 25) return "text-neon-cyan text-glow-cyan"
    return "text-white"
  }

  const getResultText = (result: number) => {
    if (result > 75) return "Jackpot!"
    if (result > 50) return "Big Win!"
    if (result > 25) return "Winner!"
    return "Try Again!"
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader>
          <CardTitle>Spin to Win</CardTitle>
          <CardDescription>Spin the wheel for a chance to win rewards and bonuses</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="relative mb-8 h-64 w-64">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-dashed border-neon-purple/50"
              variants={wheelVariants}
              initial="initial"
              animate={isSpinning ? "spinning" : "stopped"}
            />

            {/* Inner circle */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue shadow-neon"
              animate={{
                scale: isSpinning ? [1, 0.95, 1, 0.95, 1] : 1,
                transition: {
                  duration: isSpinning ? 2 : 0.3,
                  repeat: isSpinning ? Number.POSITIVE_INFINITY : 0,
                },
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {spinResult !== null ? (
                  <motion.div
                    key="result"
                    className="text-center"
                    variants={resultVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div className={`text-5xl font-bold ${getResultColor(spinResult)}`}>{spinResult}</div>
                    <div className="mt-2 text-sm font-medium text-white/80">{getResultText(spinResult)}</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="spin"
                    className="text-center text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {isSpinning ? (
                      <RefreshCw className="h-12 w-12 animate-spin" />
                    ) : (
                      <div className="text-xl font-medium">Click Spin!</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover={spinsRemaining > 0 ? "hover" : "disabled"}
            whileTap={spinsRemaining > 0 ? "tap" : "disabled"}
          >
            <Button
              size="lg"
              className="mt-4 px-8 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300"
              onClick={handleSpin}
              disabled={isSpinning || spinsRemaining <= 0}
            >
              {isSpinning ? "Spinning..." : `Spin Now (${spinsRemaining} left)`}
            </Button>
          </motion.div>

          {spinHistory.length > 0 && (
            <div className="mt-6 w-full">
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">Recent Spins</h4>
              <div className="flex justify-center gap-2">
                {spinHistory.map((result, index) => (
                  <motion.div
                    key={index}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      result > 75
                        ? "bg-neon-purple/20 text-neon-purple"
                        : result > 50
                          ? "bg-neon-blue/20 text-neon-blue"
                          : result > 25
                            ? "bg-neon-cyan/20 text-neon-cyan"
                            : "bg-muted text-muted-foreground"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {result}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/30 px-6 py-4 text-center text-sm text-muted-foreground">
          You have {spinsRemaining} free spins remaining today. Additional spins cost 10 points each.
        </CardFooter>
      </Card>
    </motion.div>
  )
}


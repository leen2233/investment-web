import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [spinHistory, setSpinHistory] = useState([]);
  const [betAmount, setBetAmount] = useState(10);
  const [potentialWin, setPotentialWin] = useState(20);

  useEffect(() => {
    setPotentialWin(betAmount * 2);
  }, [betAmount]);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinResult(null);

    // Simulate spinning wheel with random result
    const spinDuration = 3000 + Math.random() * 2000;

    setTimeout(() => {
      const result = Math.random() * 100;
      const win = result > 50;
      setSpinResult(win ? 2 : 0);
      setSpinHistory((prev) => [win ? 2 : 0, ...prev].slice(0, 10));
      setIsSpinning(false);
    }, spinDuration);
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

  const wheelVariants = {
    initial: { rotate: 0 },
    spinning: {
      rotate: 1800,
      transition: {
        duration: 5,
        ease: [0.2, 0.8, 0.6, 1],
      },
    },
  };

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
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle>Spin to Win</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-8 h-64 w-64">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-neon-blue/50" />

              {/* Spinning wheel */}
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-cyan"
                variants={wheelVariants}
                initial="initial"
                animate={isSpinning ? "spinning" : "initial"}
              >
                {/* Wheel segments */}
                <div className="absolute inset-0 rounded-full">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 origin-center"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    >
                      <div className="absolute top-0 left-1/2 h-1/2 w-0.5 -translate-x-1/2 bg-white/20" />
                    </div>
                  ))}
                </div>

                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm" />
                </div>
              </motion.div>

              {/* Pointer */}
              <div className="absolute -top-2 left-1/2 h-8 w-8 -translate-x-1/2 transform">
                <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-neon-blue" />
              </div>

              {/* Result overlay */}
              <AnimatePresence>
                {spinResult !== null && !isSpinning && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                    variants={resultVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    {spinResult > 0 ? (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-neon-cyan text-glow-cyan">
                          {spinResult}x
                        </div>
                        <div className="mt-2 text-xl font-medium text-white">
                          You Won!
                        </div>
                        <div className="mt-1 text-sm text-white/80">
                          +${betAmount * spinResult}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-500">
                          0x
                        </div>
                        <div className="mt-2 text-xl font-medium text-white">
                          You Lost
                        </div>
                        <div className="mt-1 text-sm text-white/80">
                          -${betAmount}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mb-6 w-full max-w-xs space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bet-amount">Bet Amount</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBetAmount(Math.max(5, betAmount - 5))}
                    disabled={isSpinning}
                  >
                    -
                  </Button>
                  <Input
                    id="bet-amount"
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="text-center"
                    disabled={isSpinning}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBetAmount(betAmount + 5)}
                    disabled={isSpinning}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-neon-blue/30 bg-neon-blue/5 p-3 text-center">
                <div className="text-sm text-muted-foreground">
                  Potential Win
                </div>
                <div className="text-xl font-bold text-glow">
                  ${potentialWin}
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full max-w-xs bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Spinning...</span>
                </div>
              ) : (
                "Spin Now"
              )}
            </Button>
          </div>

          {spinHistory.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium text-center">
                Recent Results
              </h4>
              <div className="flex justify-center gap-2">
                {spinHistory.map((result, index) => (
                  <motion.div
                    key={index}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      result > 0
                        ? "bg-neon-cyan/20 text-neon-cyan"
                        : "bg-red-500/20 text-red-500"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {result}x
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/30 px-6 py-4 text-center text-sm text-muted-foreground">
          Double or nothing! Spin the wheel for a 50% chance to double your bet.
        </CardFooter>
      </Card>
    </motion.div>
  );
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calculator, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardHero() {
  const [amount, setAmount] = useState(1000)
  const [duration, setDuration] = useState(6)
  const [plan, setPlan] = useState("balanced")
  const [calculatedReturn, setCalculatedReturn] = useState(1080)

  const handleCalculate = () => {
    let rate = 0
    switch (plan) {
      case "conservative":
        rate = 0.04
        break
      case "balanced":
        rate = 0.08
        break
      case "growth":
        rate = 0.12
        break
      default:
        rate = 0.08
    }

    const monthlyRate = rate / 12
    const result = amount * (1 + monthlyRate * duration)
    setCalculatedReturn(Math.round(result))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const resultVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-background via-background to-background/80 p-6 md:p-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-neon-purple/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-neon-blue/20 blur-3xl" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              <span className="text-glow text-neon-purple">Maximize</span> Your Investment Returns
            </h1>
          </motion.div>

          <motion.p className="max-w-[600px] text-muted-foreground md:text-lg" variants={itemVariants}>
            Use our interactive calculator to see how your investments can grow over time with our competitive rates and
            flexible plans.
          </motion.p>

          <motion.div className="flex flex-col gap-4 sm:flex-row" variants={itemVariants}>
            <Button
              className="group gap-2 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300"
              size="lg"
            >
              Start Investing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card className="glassmorphism overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-neon-blue" />
                <h3 className="text-xl font-bold">Profit Calculator</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="duration">Duration (months)</Label>
                    <span className="text-sm text-muted-foreground">{duration} months</span>
                  </div>
                  <Slider
                    id="duration"
                    min={1}
                    max={36}
                    step={1}
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Investment Plan</Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger id="plan" className="bg-background/50">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative (3-5% APY)</SelectItem>
                      <SelectItem value="balanced">Balanced (6-10% APY)</SelectItem>
                      <SelectItem value="growth">Growth (10-15% APY)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleCalculate}
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300"
                >
                  Calculate
                </Button>

                <motion.div
                  className="rounded-lg border border-neon-blue/30 bg-background/50 p-4 text-center"
                  variants={resultVariants}
                  initial="initial"
                  animate={calculatedReturn ? "animate" : "initial"}
                  key={calculatedReturn}
                >
                  <div className="text-sm font-medium text-muted-foreground">Estimated Return</div>
                  <div className="mt-1 text-2xl font-bold text-glow-blue">${calculatedReturn.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    After {duration} months at {plan === "conservative" ? "4%" : plan === "balanced" ? "8%" : "12%"} APY
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}


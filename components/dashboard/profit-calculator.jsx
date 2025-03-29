"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProfitCalculator() {
  const [amount, setAmount] = useState(1000)
  const [duration, setDuration] = useState(30)
  const [plan, setPlan] = useState("daily5")
  const [calculatedReturn, setCalculatedReturn] = useState(1500)

  const handleCalculate = () => {
    let rate = 0
    switch (plan) {
      case "daily3":
        rate = 0.03
        break
      case "daily5":
        rate = 0.05
        break
      case "daily7":
        rate = 0.07
        break
      default:
        rate = 0.05
    }

    const result = amount * (1 + rate * duration)
    setCalculatedReturn(Math.round(result))
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

  const resultVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-neon-blue" />
            <CardTitle>Profit Calculator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="duration">Duration (days)</Label>
                <span className="text-sm text-muted-foreground">{duration} days</span>
              </div>
              <Slider
                id="duration"
                min={1}
                max={90}
                step={1}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Investment Plan</Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily3">Daily 3% ROI</SelectItem>
                  <SelectItem value="daily5">Daily 5% ROI</SelectItem>
                  <SelectItem value="daily7">Daily 7% ROI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
            >
              Calculate Profit
            </Button>

            <motion.div
              className="mt-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5 p-4 text-center"
              variants={resultVariants}
              initial="initial"
              animate={calculatedReturn ? "animate" : "initial"}
              key={calculatedReturn}
            >
              <div className="text-sm font-medium text-muted-foreground">Estimated Return</div>
              <div className="mt-1 text-2xl font-bold text-glow">${calculatedReturn.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                After {duration} days with {plan === "daily3" ? "3%" : plan === "daily5" ? "5%" : "7%"} daily ROI
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


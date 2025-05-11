"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function ProfitCalculator({ plans }) {
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState(30);
  const [plan, setPlan] = useState();
  const [calculatedReturn, setCalculatedReturn] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (plans?.length > 0 && !plan) {
      setPlan(plans[0].percentage);
    }
  }, [plans, plan]);

  useEffect(() => {
    if (amount && duration && plan) {
      const result = amount + (amount / 100) * plan * (duration / 30);
      setCalculatedReturn(result);
    }
  }, [amount, duration, plan]);

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

  const resultVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-neon-blue" />
            <CardTitle>{t("calculator.title")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">{t("calculator.investmentAmount")}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={amount || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setAmount(0);
                    } else if (/^\d+$/.test(value)) {
                      setAmount(Number(value));
                    }
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="duration">{t("calculator.duration")}</Label>
                <span className="text-sm text-muted-foreground">
                  {duration} {t("calculator.days")}
                </span>
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
              <Label htmlFor="plan">{t("calculator.investmentPlan")}</Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder={t("calculator.selectPlan")} />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => {
                    return (
                      <SelectItem key={plan.id} value={plan.percentage}>
                        {plan.percentage}% {t("investments.roi")}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => {}}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
            >
              {t("calculator.calculateProfit")}
            </Button>

            <motion.div
              className="mt-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5 p-4 text-center"
              variants={resultVariants}
              initial="initial"
              animate={calculatedReturn ? "animate" : "initial"}
              key={calculatedReturn}
            >
              <div className="text-sm font-medium text-muted-foreground">
                {t("calculator.estimatedReturn")}
              </div>
              <div className="mt-1 text-2xl font-bold text-glow">
                ${calculatedReturn.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("calculator.afterDays", {
                  days: duration,
                  roi: plan + "%",
                })}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

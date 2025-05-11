import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InvestmentPlanDetail } from "@/components/investments/investment-plan-detail";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/lib/axios";

export default function InvestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState(30);
  const [calculatedProfit, setCalculatedProfit] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  // Fetch plan details
  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!id) {
        navigate("/investments");
        return;
      }

      try {
        setLoading(true);
        const plan = await api.get(`/investment-plans/${id}`);
        setSelectedPlan(plan);
        setAmount(plan.minimum_amount);
        setDuration(plan.minimum_duration);
      } catch (err) {
        setError(err.message);
        navigate("/investments");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id, navigate]);

  // Calculate profit in real-time when amount or duration changes
  useEffect(() => {
    if (selectedPlan) {
      const profit =
        amount + (amount / 100) * selectedPlan.percentage * duration;
      setCalculatedProfit(profit);
    }
  }, [amount, duration, selectedPlan]);

  // Handle redirect after successful investment
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/investments");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleInvest = async () => {
    try {
      // Add your investment API call here
      await api.post("users/me/investments/create/", {
        plan_id: id,
        amount,
        duration,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <Card className="glassmorphism p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
          </div>
        </Card>
      </div>
    );
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
  };

  return (
    <div className="container mx-auto space-y-8 py-6">
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-lg text-center"
        >
          {t("investments.successDescription", {
            amount: amount,
            plan: selectedPlan.name_en,
          })}
        </motion.div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-center"
        >
          {error}
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Investment Form */}
        <Card className="glassmorphism overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-neon-blue" />
              <CardTitle>{t("investments.makeInvestment")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">{t("calculator.investmentAmount")}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  min={selectedPlan?.minimum_amount}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
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
                min={selectedPlan?.minimum_duration}
                max={365}
                step={1}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
              />
            </div>

            <div className="rounded-lg border border-neon-blue/30 bg-neon-blue/5 p-4">
              <div className="text-sm font-medium text-muted-foreground">
                {t("calculator.estimatedReturn")}
              </div>
              <div className="mt-1 text-2xl font-bold text-glow">
                ${calculatedProfit.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("calculator.afterDays", {
                  days: duration,
                  roi:
                    selectedPlan?.percentage + "% " + t("investments.roiShort"),
                })}
              </div>
            </div>

            <Button
              onClick={handleInvest}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
            >
              {t("investments.confirmInvestment")}
            </Button>
          </CardContent>
        </Card>

        {/* Selected Plan Details */}
        <Card className="glassmorphism overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>{t("investments.selectedPlan")}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {selectedPlan && <InvestmentPlanDetail plan={selectedPlan} />}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

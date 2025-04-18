import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  User,
  DollarSign,
  Users,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

export function SetupGuideSlider({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  const steps = [
    {
      icon: <User className="h-8 w-8 text-neon-blue" />,
      title: t("onboarding.profile.title", "Complete Your Profile"),
      description: t(
        "onboarding.profile.description",
        "Add your information to personalize your experience"
      ),
      action: {
        text: t("onboarding.profile.action", "Update Profile"),
        href: "/profile",
      },
    },
    {
      icon: <DollarSign className="h-8 w-8 text-neon-purple" />,
      title: t("onboarding.deposit.title", "Make Your First Deposit"),
      description: t(
        "onboarding.deposit.description",
        "Start your investment journey with a minimum deposit"
      ),
      action: {
        text: t("onboarding.deposit.action", "Deposit Funds"),
        href: "/wallet/deposit",
      },
    },
    {
      icon: <Users className="h-8 w-8 text-neon-cyan" />,
      title: t("onboarding.referral.title", "Invite Friends"),
      description: t(
        "onboarding.referral.description",
        "Share your referral link and earn bonuses"
      ),
      action: {
        text: t("onboarding.referral.action", "Get Referral Link"),
        href: "/referrals",
      },
    },
    {
      icon: <Gift className="h-8 w-8 text-green-500" />,
      title: t("onboarding.rewards.title", "Claim Welcome Bonus"),
      description: t(
        "onboarding.rewards.description",
        "Get your welcome bonus and start earning"
      ),
      action: {
        text: t("onboarding.rewards.action", "Claim Bonus"),
        href: "/profile/rewards",
      },
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const navigate = (direction) => {
    const nextStep = currentStep + direction;
    if (nextStep >= 0 && nextStep < steps.length) {
      setCurrentStep(nextStep);
    } else if (nextStep === steps.length && onComplete) {
      onComplete();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden glassmorphism">
      <CardContent className="p-6">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="mt-2 text-sm text-muted-foreground">
            {t("onboarding.progress", "Step {{current}} of {{total}}", {
              current: currentStep + 1,
              total: steps.length,
            })}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={currentStep}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center">
                {steps[currentStep].icon}
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {steps[currentStep].title}
                </h3>
                <p className="text-muted-foreground">
                  {steps[currentStep].description}
                </p>
              </div>
              <div className="flex justify-center pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300"
                >
                  <a href={steps[currentStep].action.href}>
                    {steps[currentStep].action.text}
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={() => navigate(1)}>
            {currentStep === steps.length - 1 ? (
              <Check className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

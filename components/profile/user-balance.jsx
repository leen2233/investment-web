"use client";

import { motion } from "framer-motion";
import { DollarSign, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { useTranslation } from "react-i18next";

export function UserBalance({ balance }) {
  const { t } = useTranslation();

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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader className="pb-3">
          <CardTitle>{t("wallet.availableBalance")}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-3xl font-bold text-glow">
            $<CountUp end={balance || 0} duration={2} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full gap-2">
            <Button
              asChild
              className="flex-1 gap-2 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300"
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full"
              >
                <Link
                  to="/wallet/deposit"
                  className="flex items-center justify-center gap-2 w-full h-full"
                >
                  <DollarSign className="h-4 w-4" />
                  {t("wallet.deposit")}
                </Link>
              </motion.div>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex-1 gap-2 border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full"
              >
                <Link
                  to="/wallet/withdraw"
                  className="flex items-center justify-center gap-2 w-full h-full"
                >
                  <CreditCard className="h-4 w-4" />
                  {t("wallet.withdraw")}
                </Link>
              </motion.div>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

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

export function UserBalance({ balance }) {
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
        <div className="absolute inset-0 bg-glow-purple opacity-10" />
        <CardHeader className="pb-3">
          <CardTitle>Available Balance</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-3xl font-bold text-glow">
            $<CountUp end={balance || 0} duration={2} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full gap-2">
            <motion.div
              className="flex-1"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/wallet/deposit" className="w-full block z-10">
                <Button className="w-full gap-2 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300">
                  <DollarSign className="h-4 w-4" />
                  Deposit
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex-1"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/wallet/withdraw" className="w-full block">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
                >
                  <CreditCard className="h-4 w-4" />
                  Withdraw
                </Button>
              </Link>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

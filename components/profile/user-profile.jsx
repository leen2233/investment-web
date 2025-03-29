"use client";

import { motion } from "framer-motion";
import { User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";

export function UserProfile() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };
  const { user } = useAuth();

  return (
    <motion.div
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-4" variants={itemVariants}>
        <Avatar className="h-16 w-16 border-4 border-background">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{user && user.username}</h2>
          <p className="text-muted-foreground">Member since March 2025</p>
        </div>
      </motion.div>

      <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant="outline"
            className="gap-2 border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
          >
            <User className="h-4 w-4" />
            Edit Profile
          </Button>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button className="gap-2 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300">
            <DollarSign className="h-4 w-4" />
            Deposit Funds
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

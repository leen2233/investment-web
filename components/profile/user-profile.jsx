import { motion } from "framer-motion";
import { User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

export function UserProfile({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  return (
    <motion.div
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-4" variants={itemVariants}>
        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-4 border-background">
          <AvatarImage src={user?.avatar} alt={user?.username} />
          <AvatarFallback>{user?.username?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold truncate">
            {user?.username}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("profile.memberSince", {
              date: format(
                new Date(user?.created_at || new Date()),
                "MMMM yyyy"
              ),
            })}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0"
        variants={itemVariants}
      >
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-auto"
        >
          <Button
            variant="outline"
            className="gap-2 w-full sm:w-auto border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
            onClick={() => {
              navigate("/profile/edit");
            }}
          >
            <User className="h-4 w-4" />
            {t("profile.editProfile")}
          </Button>
        </motion.div>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-auto"
        >
          <Link to="/wallet/deposit" className="w-full block">
            <Button className="gap-2 w-full sm:w-auto bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300">
              <DollarSign className="h-4 w-4" />
              {t("wallet.depositFunds")}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

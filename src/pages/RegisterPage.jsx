import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Replace next/navigation
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { RegistrationForm } from "@/components/auth/registration-form";

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate(); // Replace useRouter
  const [searchParams] = useSearchParams(); // Replace useSearchParams from next/navigation
  const referralCode = searchParams.get("ref") || "";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/"); // Replace router.push
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-neon-blue"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4">
      {/* Background effects */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-neon-blue/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-neon-purple/10 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold tracking-tight"
          >
            Crypto<span className="text-neon-blue">X</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-muted-foreground"
          >
            Investment & P2E Platform
          </motion.p>
        </div>

        <RegistrationForm initialReferralCode={referralCode} />
      </motion.div>
    </div>
  );
}

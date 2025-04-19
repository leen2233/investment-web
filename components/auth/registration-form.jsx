import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, User, Eye, EyeOff, Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function RegistrationForm({ initialReferralCode = "" }) {
  const navigate = useNavigate();
  const { register, checkAuth } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const checkExistingAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        navigate("/");
      }
    };
    checkExistingAuth();
  }, [checkAuth, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState(initialReferralCode);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);

  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    if (!username || !password) return;

    setIsSubmitting(true);

    try {
      const response = await register(username, password, referralCode || null);

      if (response.error) {
        // Handle non-field errors
        if (response.error.non_field_errors) {
          setGeneralError(response.error.non_field_errors[0]);
        }

        // Handle field-specific errors
        const errors = {};
        Object.entries(response.error).forEach(([key, value]) => {
          if (key !== "non_field_errors" && Array.isArray(value)) {
            errors[key] = value;
          }
        });

        setFieldErrors(errors);
        setIsSubmitting(false);
      }
      if (response.token) {
        localStorage.setItem("token", response.token);

        const userResponse = await api.get("/users/me/");
        const userData = userResponse.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      console.log(error);
      setGeneralError(t("common.error"));
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return fieldErrors[fieldName]?.[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>{t("auth.registerTitle")}</CardTitle>
          <CardDescription>{t("auth.registerDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          {generalError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("auth.username")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder={t("auth.enterUsername")}
                  className={`pl-10 ${
                    getFieldError("username") ? "border-destructive" : ""
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              {getFieldError("username") && (
                <p className="text-sm text-destructive">
                  {getFieldError("username")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.enterPassword")}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral-code">{t("referrals.yourCode")}</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="referral-code"
                  placeholder={t("referrals.enterCode")}
                  className={`pl-10 ${
                    getFieldError("referral") ? "border-destructive" : ""
                  }`}
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>
              {getFieldError("referral") && (
                <p className="text-sm text-destructive">
                  {getFieldError("referral")}
                </p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="relative w-full overflow-hidden bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 hover:shadow-neon-blue"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>{t("auth.creatingAccount")}</span>
                  </div>
                ) : (
                  t("auth.signUp")
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>{t("auth.terms")}</p>
          <p className="mt-2">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="text-neon-blue hover:underline">
              {t("auth.login")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

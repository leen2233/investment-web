import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/auth-context";
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
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { api } from "../../lib/axios";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const login = async (username, password) => {
    setError(null);

    try {
      const response = await api.post("/users/login/", {
        username,
        password,
      });

      const token = response.token;
      localStorage.setItem("token", token);

      const userResponse = await api.get("/users/me/");
      const userData = userResponse.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("auth.invalidCredentials");
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) return;

    setIsSubmitting(true);
    await login(username, password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>{t("auth.loginTitle")}</CardTitle>
          <CardDescription>{t("auth.loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">{t("auth.username")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder={t("auth.enterUsername")}
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="relative w-full overflow-hidden bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 hover:shadow-neon-blue"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>{t("auth.loggingIn")}</span>
                  </div>
                ) : (
                  t("auth.login")
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p className="mt-2">
            {t("auth.noAccount")}{" "}
            <Link to="/register" className="text-neon-blue hover:underline">
              {t("auth.register")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

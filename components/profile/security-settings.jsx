import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield, Smartphone, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { api } from "../../lib/axios";

export function SecuritySettings() {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get("/users/sessions");
      setSessions(response);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await api.delete(`/users/sessions/${sessionId}/`);
      setSessions(sessions.filter((session) => session.id !== sessionId));
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError(t("settings.security.passwordMismatch"));
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setError(t("settings.security.passwordTooShort"));
      return;
    }

    try {
      await api.post("/users/change-password/", {
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
      });

      setSuccess(t("settings.security.passwordChangeSuccess"));
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(t("settings.security.passwordChangeError"));
      }
      console.error("Failed to change password:", error);
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>{t("settings.security.passwordTitle")}</CardTitle>
          <CardDescription>
            {t("settings.security.passwordDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                {t("settings.security.currentPassword")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder={t("settings.security.currentPassword")}
                  className="pl-10 pr-10"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">
                {t("settings.security.newPassword")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder={t("settings.security.newPassword")}
                  className="pl-10 pr-10"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("settings.security.confirmPassword")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("settings.security.confirmPassword")}
                  className="pl-10 pr-10"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("settings.security.passwordRequirements")}
              </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <Button
              type="submit"
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300"
            >
              {t("settings.security.updatePassword")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>{t("settings.security.sessions")}</CardTitle>
          <CardDescription>
            {t("settings.security.sessionsDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {loading ? (
              <p>Loading sessions...</p>
            ) : (
              sessions.map((session) => (
                <div key={session.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        {session.browser} on {session.os}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t("settings.security.ipAddress", {
                          ip: session.ip_address,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Started: {new Date(session.created_at).toLocaleString()}
                        {" • "}
                        Last seen:{" "}
                        {new Date(session.last_seen).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {session.is_active && (
                        <div className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                          {t("settings.security.activeNow")}
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSession(session.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <XCircle className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                const currentSession = sessions.find((s) => s.is_active);
                if (currentSession) {
                  await Promise.all(
                    sessions
                      .filter((s) => s.id !== currentSession.id)
                      .map((s) => handleDeleteSession(s.id))
                  );
                }
              }}
            >
              {t("settings.security.logoutOthers")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

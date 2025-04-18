import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, AtSign, Bell, Shield, Languages } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function ProfileSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Simulated API call
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="space-y-6">
        {/* <Card className="glassmorphism overflow-hidden">
          <CardHeader>
            <CardTitle>{t("settings.profile.title")}</CardTitle>
            <CardDescription>
              {t("settings.profile.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("settings.profile.email")}</Label>
                  <div className="flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">user@example.com</span>
                    <Badge variant="secondary" className="ml-auto">
                      {t("settings.profile.verified")}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t("settings.profile.language")}</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("settings.profile.selectLanguage")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        {t("settings.profile.languages.en")}
                      </SelectItem>
                      <SelectItem value="es">
                        {t("settings.profile.languages.es")}
                      </SelectItem>
                      <SelectItem value="fr">
                        {t("settings.profile.languages.fr")}
                      </SelectItem>
                      <SelectItem value="de">
                        {t("settings.profile.languages.de")}
                      </SelectItem>
                      <SelectItem value="zh">
                        {t("settings.profile.languages.zh")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
        </Card> */}
        {/* 
        <Card className="glassmorphism overflow-hidden">
          <CardHeader>
            <CardTitle>{t("settings.notifications.title")}</CardTitle>
            <CardDescription>
              {t("settings.notifications.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.notifications.email")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.notifications.emailDescription")}
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.notifications.push")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.notifications.pushDescription")}
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.notifications.marketing")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.notifications.marketingDescription")}
                  </p>
                </div>
                <Switch
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card className="glassmorphism overflow-hidden">
          <CardHeader>
            <CardTitle>{t("settings.security.title")}</CardTitle>
            <CardDescription>
              {t("settings.security.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-neon-blue" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {t("settings.security.2faTitle")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.security.2faDescription")}
                  </p>
                </div>
                <Button variant="outline">
                  {t("settings.security.enable")}
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Lock className="h-8 w-8 text-neon-purple" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {t("settings.security.passwordTitle")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.security.passwordDescription")}
                  </p>
                </div>
                <Button variant="outline">
                  {t("settings.security.change")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* <Button
          type="submit"
          className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              <span>{t("common.saving")}</span>
            </div>
          ) : (
            t("common.saveChanges")
          )}
        </Button> */}
      </div>
    </motion.div>
  );
}

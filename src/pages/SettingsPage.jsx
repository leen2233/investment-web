import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SecuritySettings } from "@/components/profile/security-settings";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="py-8 space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <DashboardHeader
          title={t("settings.security.title")}
          description={t("settings.security.description")}
        />
      </div>

      <SecuritySettings />
    </div>
  );
}

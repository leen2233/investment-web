import { EditProfile } from "@/components/profile/edit-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function EditProfilePage() {
  return (
    <div className="py-1 space-y-1">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <EditProfile />
    </div>
  );
}

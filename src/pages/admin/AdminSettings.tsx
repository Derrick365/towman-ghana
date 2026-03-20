import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAdminAuth } from "@/lib/admin-auth";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const { user } = useAdminAuth();
  const [settings, setSettings] = useState({
    siteName: "Towman Ghana",
    contactEmail: "support@towmanghana.com",
    contactPhone: "+233 30 222 3333",
    autoApprove: false,
    emailNotifications: true,
    maintenanceMode: false,
    maxVehiclesPerOperator: "10",
    minRatingThreshold: "3.0",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Platform configuration</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Site Name</label>
              <Input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Contact Email</label>
              <Input value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Contact Phone</label>
              <Input value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Operator Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Max Vehicles per Operator</label>
              <Input type="number" value={settings.maxVehiclesPerOperator} onChange={(e) => setSettings({ ...settings, maxVehiclesPerOperator: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Min Rating Threshold</label>
              <Input type="number" step="0.1" value={settings.minRatingThreshold} onChange={(e) => setSettings({ ...settings, minRatingThreshold: e.target.value })} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Auto-approve Operators</p>
                <p className="text-xs text-muted-foreground">Skip manual review for new registrations</p>
              </div>
              <Switch checked={settings.autoApprove} onCheckedChange={(v) => setSettings({ ...settings, autoApprove: v })} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Notifications & System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Send email alerts for new registrations</p>
              </div>
              <Switch checked={settings.emailNotifications} onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Temporarily disable public access</p>
              </div>
              <Switch checked={settings.maintenanceMode} onCheckedChange={(v) => setSettings({ ...settings, maintenanceMode: v })} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Admin Account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p><span className="text-muted-foreground">Logged in as:</span> {user?.name}</p>
            <p><span className="text-muted-foreground">Email:</span> {user?.email}</p>
            <p><span className="text-muted-foreground">Role:</span> {user?.role}</p>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

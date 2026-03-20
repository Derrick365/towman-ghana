import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { activityLogs } from "@/lib/admin-data";
import { Search } from "lucide-react";

const typeColors: Record<string, string> = {
  approval: "bg-emerald-500",
  rejection: "bg-destructive",
  registration: "bg-blue-500",
  suspension: "bg-orange-500",
  edit: "bg-muted-foreground",
};

const typeLabels: Record<string, string> = {
  approval: "Approval",
  rejection: "Rejection",
  registration: "Registration",
  suspension: "Suspension",
  edit: "Edit",
};

const AdminActivity = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = activityLogs.filter((l) => {
    const matchType = filter === "all" || l.type === filter;
    const matchSearch =
      search === "" ||
      l.target.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Activity Log</h1>
          <p className="text-sm text-muted-foreground">Track all admin actions</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, action, or actor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["all", "approval", "rejection", "registration", "suspension", "edit"].map((t) => (
              <Button
                key={t}
                variant={filter === t ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(t)}
                className="text-xs capitalize"
              >
                {t === "all" ? "All" : typeLabels[t]}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {filtered.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${typeColors[log.type]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{log.action}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{log.target}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      by {log.actor} · {log.timestamp}
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    log.type === "approval" ? "bg-emerald-100 text-emerald-700" :
                    log.type === "rejection" ? "bg-red-100 text-red-700" :
                    log.type === "registration" ? "bg-blue-100 text-blue-700" :
                    log.type === "suspension" ? "bg-orange-100 text-orange-700" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {typeLabels[log.type]}
                  </span>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No activity found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminActivity;

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { vehicles as initialVehicles, Vehicle } from "@/lib/admin-data";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Search, CheckCircle, Ban, Eye } from "lucide-react";

const AdminVehicles = () => {
  const [vehs, setVehs] = useState<Vehicle[]>(initialVehicles);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = vehs.filter((v) => {
    const matchSearch =
      v.operatorName.toLowerCase().includes(search.toLowerCase()) ||
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: number, status: Vehicle["status"]) => {
    setVehs((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    setOpen(false);
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      suspended: "bg-red-100 text-red-700",
    };
    return (
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[status] || ""}`}>
        {status}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Vehicles</h1>
            <p className="text-sm text-muted-foreground">Manage vehicle listings</p>
          </div>
          <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 font-medium text-sm">
            {vehs.filter((v) => v.status === "pending").length} pending
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by plate, type, operator..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-1.5">
            {["all", "active", "pending", "suspended"].map((s) => (
              <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)} className="text-xs capitalize">
                {s}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead className="hidden sm:table-cell">Operator</TableHead>
                  <TableHead className="hidden md:table-cell">Plate</TableHead>
                  <TableHead className="hidden lg:table-cell">Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{v.make} {v.model} ({v.year})</p>
                        <p className="text-xs text-muted-foreground">{v.type}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{v.operatorName}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm font-mono">{v.plate}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{v.capacity}</TableCell>
                    <TableCell>{statusBadge(v.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelected(v); setOpen(true); }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {v.status === "pending" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50" onClick={() => updateStatus(v.id, "active")}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {v.status === "active" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => updateStatus(v.id, "suspended")}>
                            <Ban className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No vehicles found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{selected?.make} {selected?.model}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground block text-xs">Type</span>{selected.type}</div>
              <div><span className="text-muted-foreground block text-xs">Year</span>{selected.year}</div>
              <div><span className="text-muted-foreground block text-xs">Plate</span><span className="font-mono">{selected.plate}</span></div>
              <div><span className="text-muted-foreground block text-xs">Capacity</span>{selected.capacity}</div>
              <div><span className="text-muted-foreground block text-xs">Price</span>{selected.price}</div>
              <div><span className="text-muted-foreground block text-xs">Region</span>{selected.region}</div>
              <div><span className="text-muted-foreground block text-xs">Operator</span>{selected.operatorName}</div>
              <div><span className="text-muted-foreground block text-xs">Status</span>{statusBadge(selected.status)}</div>
            </div>
          )}
          <DialogFooter className="gap-2">
            {selected?.status !== "active" && (
              <Button size="sm" onClick={() => selected && updateStatus(selected.id, "active")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Activate
              </Button>
            )}
            {selected?.status !== "suspended" && (
              <Button size="sm" variant="destructive" onClick={() => selected && updateStatus(selected.id, "suspended")}>
                Suspend
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminVehicles;

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { operators as initialOperators, Operator } from "@/lib/admin-data";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Search, CheckCircle, XCircle, Eye, Star, Filter } from "lucide-react";

const AdminOperators = () => {
  const [ops, setOps] = useState<Operator[]>(initialOperators);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOp, setSelectedOp] = useState<Operator | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filtered = ops.filter((o) => {
    const matchSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.region.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: number, status: Operator["status"]) => {
    setOps((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setDetailOpen(false);
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      rejected: "bg-red-100 text-red-700",
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
            <h1 className="text-2xl font-bold font-display text-foreground">Operators</h1>
            <p className="text-sm text-muted-foreground">Manage tow truck operators</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 font-medium">
              {ops.filter((o) => o.status === "pending").length} pending
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search operators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1.5">
            {["all", "approved", "pending", "rejected"].map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(s)}
                className="text-xs capitalize"
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Operator</TableHead>
                  <TableHead className="hidden sm:table-cell">Region</TableHead>
                  <TableHead className="hidden md:table-cell">Vehicles</TableHead>
                  <TableHead className="hidden md:table-cell">Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((op) => (
                  <TableRow key={op.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{op.name}</p>
                        <p className="text-xs text-muted-foreground">{op.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{op.region}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm tabular-nums">{op.vehicles}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        <span className="text-sm tabular-nums">{op.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{statusBadge(op.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => { setSelectedOp(op); setDetailOpen(true); }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {op.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                              onClick={() => updateStatus(op.id, "approved")}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => updateStatus(op.id, "rejected")}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No operators found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Detail dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{selectedOp?.name}</DialogTitle>
          </DialogHeader>
          {selectedOp && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground block text-xs">Email</span>{selectedOp.email}</div>
                <div><span className="text-muted-foreground block text-xs">Phone</span>{selectedOp.phone}</div>
                <div><span className="text-muted-foreground block text-xs">Location</span>{selectedOp.location}, {selectedOp.region}</div>
                <div><span className="text-muted-foreground block text-xs">Joined</span>{selectedOp.joined}</div>
                <div><span className="text-muted-foreground block text-xs">Vehicles</span>{selectedOp.vehicles}</div>
                <div>
                  <span className="text-muted-foreground block text-xs">Rating</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-secondary text-secondary" />
                    {selectedOp.rating} ({selectedOp.reviews} reviews)
                  </span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs mb-1">Status</span>
                {statusBadge(selectedOp.status)}
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            {selectedOp?.status !== "approved" && (
              <Button size="sm" onClick={() => selectedOp && updateStatus(selectedOp.id, "approved")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Approve
              </Button>
            )}
            {selectedOp?.status !== "rejected" && (
              <Button size="sm" variant="destructive" onClick={() => selectedOp && updateStatus(selectedOp.id, "rejected")}>
                Reject
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOperators;

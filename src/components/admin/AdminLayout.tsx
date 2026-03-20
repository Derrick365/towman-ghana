import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { RequireAdmin } from "@/lib/admin-auth";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAdmin>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-muted/30">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center border-b border-border bg-background px-4 sticky top-0 z-30">
              <SidebarTrigger className="mr-4" />
              <span className="text-sm text-muted-foreground font-medium">Towman Ghana Administration</span>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </RequireAdmin>
  );
}

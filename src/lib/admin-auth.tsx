import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AdminUser {
  email: string;
  name: string;
  role: "super_admin" | "admin";
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const ADMIN_CREDENTIALS = [
  { email: "admin@towmanghana.com", password: "admin123", name: "Kwesi Mensah", role: "super_admin" as const },
  { email: "mod@towmanghana.com", password: "mod123", name: "Ama Serwaa", role: "admin" as const },
];

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const stored = sessionStorage.getItem("admin_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string): boolean => {
    const found = ADMIN_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );
    if (found) {
      const adminUser = { email: found.email, name: found.name, role: found.role };
      setUser(adminUser);
      sessionStorage.setItem("admin_user", JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("admin_user");
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login", { replace: true });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}

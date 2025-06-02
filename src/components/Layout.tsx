// src/components/Layout.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";

export default function Layout() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          <SidebarProvider>
            <AppSidebar variant="inset" side="right" />
            <SidebarInset>
              <main>
                <SiteHeader />
                <Outlet />
              </main>
            </SidebarInset>
          </SidebarProvider>
        </>
      ) : (
        <>
          <main>
            <Outlet />
          </main>
        </>
      )}
      <Toaster position="top-right" />
    </>
  );
}

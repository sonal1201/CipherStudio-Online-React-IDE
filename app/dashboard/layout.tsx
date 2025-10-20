import { SidebarProvider } from "@/components/ui/sidebar";
import DashBoardSidebar from "@/features/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <DashBoardSidebar initialPlaygroundData={[]}/>
        <main className="flex-2">{children}</main>
      </div>
    </SidebarProvider>
  );
}

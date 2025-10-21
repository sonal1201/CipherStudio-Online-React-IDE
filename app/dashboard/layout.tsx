import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllProject } from "@/features/dashboard/action";
import DashBoardSidebar from "@/features/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getAllProject();

  const formatProject =
    projects?.map((project) => ({
      id: project.id,
      name: project.title,
      description: project.description,
    })) || [];
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <DashBoardSidebar initialPlaygroundData={formatProject} />
        <main className="flex-2">{children}</main>
      </div>
    </SidebarProvider>
  );
}

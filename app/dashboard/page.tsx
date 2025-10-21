import EmptyState from "@/components/ui/empty-state";
import { getAllProject } from "@/features/dashboard/action";
import AddNewButton from "@/features/dashboard/components/add-new-button";
import ProjectTable from "@/features/dashboard/components/project-table";


const DashboardMainPage = async () => {
  const projects = await getAllProject()
  console.log(projects);
  return (
    <div className="p-4">
      <div className="flex flex-row ">
     <AddNewButton />
     </div>
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {projects && projects?.length === 0 ? (
          <EmptyState />
        ) : (
         <ProjectTable
          projects = {projects || []}
          onDeleteProject = {() =>{}}
          onUpdateProject = {() => {}}
         />
        )}
      </div>
    </div>
    </div>
  );
};

export default DashboardMainPage;
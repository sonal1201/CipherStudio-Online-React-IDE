import EmptyState from "@/components/ui/empty-state";
import { deleteProjectById, editProject, getAllProject } from "@/features/dashboard/action";
import AddNewButton from "@/features/dashboard/components/add-new-button";
import ProjectTable from "@/features/dashboard/components/project-table";


const DashboardMainPage = async () => {
  const projects = await getAllProject()
  console.log(projects);
  return (
    <div className="p-4">
      <div className="flex flex-row">
     <AddNewButton />
     </div>
         <h1 className="text-3xl font-semibold mt-5">Recent Projects</h1>
         <span className="text-gray-500">Resume your work...</span>
         
    <div className="flex flex-col justify-start items-center min-h-screen  py-5">
      <div className=" flex flex-col justify-center items-center w-full">
        {projects && projects?.length === 0 ? (
          <EmptyState />
        ) : (
         <ProjectTable
          projects = {projects || []}
          onDeleteProject = {deleteProjectById}
          onUpdateProject = {editProject}
         />
        )}
      </div>
    </div>
    </div>
  );
};

export default DashboardMainPage;
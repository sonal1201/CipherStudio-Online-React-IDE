import EmptyState from "@/components/ui/empty-state";
import AddNewButton from "@/features/dashboard/components/add-new-button";
import React from "react";

const Page = () => {
  const recentProject: any[] = []; // Replace with actual project data later

  return (
    <div className="flex flex-col items-start min-h-screen mx-auto max-w-7xl px-4 py-16">
      {/* Add New Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddNewButton />
      </div>

      {/* Recent Projects Section */}
      <div className="mt-8 w-full">
        <h1 className="text-3xl font-mono font-semibold mb-6 ">Recent</h1>

        {recentProject.length === 0 ? (
          <div className="flex flex-col items-center justify-center font-mono">

              <EmptyState />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Replace this map with your project cards */}
            {recentProject.map((project, index) => (
              <div
                key={index}
                className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-medium">{project.name}</h2>
                <p className="text-gray-500 text-sm mt-2">
                  {project.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

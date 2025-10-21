"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import CreateProjectModal from "./create-project-dialoag";
import { createPlayground } from "../action";
import { Templates } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const AddNewButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    template: Templates;
    description?: string;
  } | null>(null);
  const router = useRouter();

  const handleCreateProject = async (data: {
    title: string;
    template: Templates;
    description?: string;
  }) => {
    setSelectedProject(data);

    const formattedData = {
      title: data.title,
      templete: data.template, // 👈 renamed key
      description: data.description || "",
    };

    const res = await createPlayground(formattedData);
    console.log("New Project Created:", res);
    
    setIsOpen(false);
    router.push(`/playground/${res?.id}`);
  };

  return (
    <>
      {/* Button */}
      <div className="flex flex-row items-center gap-4">
      <h1 className="font-bold font-mono text-xl md:hidden">RunReact <span className="text-[#2682d9]">IDE</span></h1>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row items-center gap-2 bg-[#2682d9] hover:bg-[#56a9f7]  text-white px-3 py-2 rounded-md cursor-pointer font-mono font-medium transition-all duration-200 shadow-md"
      >
        
        <Plus size={20} />
        <span className="font-mono pt-0.5">Create</span>
      </button>
      </div>

      {/* Modal */}
  
      

      <CreateProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreateProject}
      />
    </>
  );
};

export default AddNewButton;

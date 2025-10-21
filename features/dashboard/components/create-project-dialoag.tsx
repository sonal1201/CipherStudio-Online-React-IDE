"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // ✅ Corrected import
import { Zap } from "lucide-react"; // ✅ Used in the features list
import { Toaster } from "@/components/ui/sonner";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: "REACT";
    description?: string;
  }) => void;
};

export default function CreateProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateProject = () => {
    setLoading(true); 
    onSubmit({
      title: projectName || "React Project",
      template: "REACT",
      description: projectDescription,
    });

    console.log(
      `Creating ${projectName || "new project"} with template: React`
    );

    
    setProjectName("");
    setProjectDescription("");
  };

  // Mock template features (you can replace this with dynamic data)
  const selectedTemplate = "REACT";
  const templates = [
    {
      id: "REACT",
      features: ["JSX Support", "Hot Reload", "Component Library"],
    },
  ];

  return (
  <>
  <Toaster position="top-right" />
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setProjectName("");
          setProjectDescription("");
        }
      }}
    >
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold  ">
            <span className="text-[#2682d9]">Configure Your Project</span>
          </DialogTitle>
          <DialogDescription>
            Configure your <strong>React</strong> project before creation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Project Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="my-awesome-project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
             <Label htmlFor="project-name">Project Description</Label>
            <Input
              id="project-descr"
              placeholder="description..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>

          {/* Template Features */}
          <div className="p-4 shadow-[0_0_0_1px_#2682d9,0_8px_20px_rgba(130,10,20,0.15)] rounded-lg border">
            <h3 className="font-mono mb-2">React Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {templates
                .find((t) => t.id === selectedTemplate)
                ?.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Zap size={14} className="" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-3 mt-4 pt-4 border-t">
          <Button
            className=" bg-[#2682d9] hover:bg-[#53a0e7]"
            onClick={handleCreateProject}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

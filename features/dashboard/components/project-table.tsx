"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "../types";
import Link from "next/link";
import { format } from "util";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProjectTableProp {
  projects: Project[];
  onDeleteProject: Function;
  onUpdateProject: Function;
}

interface EditProjectData {
  title: string;
  description: string;
}

export default function ProjectTable({
  projects,
  onDeleteProject,
  onUpdateProject,
}: ProjectTableProp) {
  //State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState<EditProjectData>({
    title: "",
    description: "",
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //deleteProject
  const handleDeleteProject = async () => {
    if (!selectedProject || !onDeleteProject) return;

    setIsLoading(true);
    try {
      await onDeleteProject(selectedProject.id);
      setDeleteDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error("Error deleting project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //updateRroject
  const handleUpdateProject = async () => {
    if (!selectedProject || !onUpdateProject) return;

    setIsLoading(true);
    try {
      await onUpdateProject(selectedProject.id, editData);
      setSelectedProject(null);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error("Failed to update project");
      console.error("Error updating project:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    

      <Table className="border-4 ">
        <TableHeader>
          <TableRow className="">
            <TableHead className="font-bold text-md">Project Name</TableHead>
            <TableHead className="font-bold text-md">Action</TableHead>
            <TableHead className="font-bold text-md">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell
                onClick={() => {}}
                className="hover:bg-gray-200 transition duration-150"
              >
                <div className="flex flex-col">
                  <Link
                    href={`/reactIde/${project.id}`}
                    className="hover:underline"
                  >
                    <span className="font-semibold font-mono">
                      {project.title}
                    </span>
                  </Link>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-row gap-2 space-x-px pl-1.5">
                  <Edit
                    className="cursor-pointer hover:text-gray-500"
                    size={19}
                    onClick={() => {
                      setSelectedProject(project);
                      handleUpdateProject();
                    }}
                  />
                  <Trash2
                    className="cursor-pointer hover:text-red-600 transition duration-200"
                    size={19}
                    onClick={() => {
                      setSelectedProject(project);
                      handleDeleteProject();
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

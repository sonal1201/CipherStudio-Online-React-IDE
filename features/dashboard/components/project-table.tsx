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
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const router = useRouter();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  //deleteProject
  const handleDeleteClick = async (project: Project) => {
    setSelectedProject(project);

    setDeleteDialogOpen(true);
  };

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
  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setEditData({
      title: project.title,
      description: project.description || "",
    });
    setEditDialogOpen(true);
  };

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
            <TableHead className="font-bold text-md pl-4">Action</TableHead>
            <TableHead className="font-bold text-md">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
              onClick={() => router.push(`/react-Ide/${project.id}`)}
            >
              <TableCell className="transition duration-150">
                <div className="flex flex-col">
                  <span className="font-semibold font-mono">
                    {project.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {project.description}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-row">
                  <button
                    className="cursor-pointer text-gray-800 px-2 py-2 hover:bg-gray-300 rounded-2xl transition-all duration-200 hover:text-[#2682d9]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      handleEditClick(project);
                    }}
                  >
                    <Edit size={19} />
                  </button>
                  <button
                    className="cursor-pointer text-gray-800 px-2 py-2 hover:bg-gray-300 rounded-2xl transition-all duration-200 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      handleDeleteClick(project);
                    }}
                  >
                    <Trash2 size={19} />
                  </button>
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
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make change to your project details here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={async () => {
                setIsLoading(true);
                try {
                  await handleUpdateProject();
                  setEditDialogOpen(false); // close the dialog after saving
                } catch (error) {
                  console.error(error);
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading || !editData.title.trim()}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProject?.title} Project"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-red-500 text-gray-100 hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

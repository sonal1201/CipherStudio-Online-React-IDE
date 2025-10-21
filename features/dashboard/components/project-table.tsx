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

interface ProjectTableProp {
  projects: Project[];
  onDeleteProject: Function;
  onUpdateProject: Function;
}

interface editProjectData {
  title: string;
  description: string;
}

export default function ProjectTable({
  projects,
  onDeleteProject,
  onUpdateProject,
}: ProjectTableProp) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell onClick={handleOpenProject} className="hover:bg-gray-200 transition duration-150">
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
                {format(new Date(project.createdAt))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

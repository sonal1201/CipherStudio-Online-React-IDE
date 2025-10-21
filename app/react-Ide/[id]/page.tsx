"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useReactIde } from "@/features/react-Ide/hooks/useReactIde";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const { reactIdeData, reactFolderData, isLoading, error, saveReactIdeData } =
    useReactIde(id);
  return (
    <TooltipProvider>
      <>{/* {File Tree} */}</>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center gap-2">
            <div className="flex flex-col flex-1 text-lg">
              {reactIdeData?.title}
            </div>
          </div>
        </header>
      </SidebarInset>
    </TooltipProvider>
  );
};

export default page;

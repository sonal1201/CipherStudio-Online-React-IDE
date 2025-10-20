"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface DashBoardSidebarProps {
  id: string;
  name: string;
  icon: string;
  starred: boolean;
}

const DashBoardSidebar = ({
  initialPlaygroundData,
}: {
  initialPlaygroundData: DashBoardSidebarProps[];
}) => {
  const pathname = usePathname();
  const [star, setStar] = useState(
    initialPlaygroundData.filter((p) => p.starred)
  );
  const [recentPlayground, setRecentPlayGround] = useState(
    initialPlaygroundData
  );
  return (
    <Sidebar variant="inset" collapsible="icon" className="border-1 border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-1 justify-center">
          <h1 className="font-bold font-mono text-xl">RunReact <span className="text-[#2682d9]">IDE</span></h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/"}
                tooltip={"Home"}
              >
                <Link
                  href="/"
                  className="flex flex-row items-center gap-3 text-lg font-mono"
                >
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashBoardSidebar;

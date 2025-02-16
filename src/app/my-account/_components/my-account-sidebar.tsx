import { AppLogo } from "@/app/_components/core/app-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { CONTACT_EMAIL, SUPPORT_EMAIL } from "@/app/_constants/app";
import { auth } from "@/server/auth";
import { LifeBuoy, Send } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { getUserById } from "../_queries/get-user-by-id";
import { MainNavigation } from "./main-navigation";

export const MyAccountSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const session = await auth();
  const user = await getUserById(session?.user?.id);

  return (
    <Sidebar variant="floating" {...props} className="w-72">
      <SidebarHeader className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem className="p-4 ">
                <AppLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <MainNavigation />

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                  <a href={`mailto:${SUPPORT_EMAIL}`}>
                    <LifeBuoy />
                    <span>Support</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <Send />
                    <span>Feedback</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

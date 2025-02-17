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
import SignOutButton from "@/app/_components/core/sign-out-button";

export const MyAccountSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {

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
                <SidebarMenuButton asChild size="sm">
                    <SignOutButton />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

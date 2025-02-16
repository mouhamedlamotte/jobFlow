import { ProfileDropdown } from "@/app/_components/core/profile-dropdown";
import { ThemeSwitcherDropdown } from "@/app/_components/core/theme-switcher-dropdown";
import { Separator } from "@/app/_components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { MyAccountSidebar } from "./_components/my-account-sidebar";
import DynamicBreadcrumb from "../_components/core/dynamic-breadcrumbs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider suppressHydrationWarning>
      <MyAccountSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex w-full items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumb />
            </div>

            <div className="space-x-2">
              <ThemeSwitcherDropdown />
              <ProfileDropdown />
            </div>
          </div>
        </header>

        <div className="px-10 pt-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { AppLogo } from "@/app/_components/core/app-logo";
import { Button } from "@/app/_components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { Separator } from "@/app/_components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/types/navigation-item";
import {
  CircleDollarSign,
  Library,
  LogOut,
  Menu,
  Sparkles,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ProfileDropdown } from "./profile-dropdown";
import { ThemeSwitcherDropdown } from "./theme-switcher-dropdown";

const mainMenuItems: NavigationItem<string>[] = [
  { title: "Product", url: "/#", icon: Sparkles },
  { title: "Pricing", url: "/#", icon: CircleDollarSign },
  { title: "Blog", url: "/#", icon: Library },
];

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const { data: session } = useSession();

  return (
    <header className={cn("border-b", className)}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <AppLogo />

          {/* Main Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="space-x-2">
              {mainMenuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link href={item.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "")}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Navigation */}
        <div className="hidden items-center space-x-4 md:flex">
          <ThemeSwitcherDropdown />
          {session ? (
            <ProfileDropdown />
          ) : (
            <Button asChild>
              <Link href="/signup">Create an account</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">Ready.js</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col space-y-4">
              <div>
                <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                  Menu
                </h2>
                {mainMenuItems.map((item, index) => (
                  <SheetClose asChild key={index}>
                    <Link
                      href={item.url}
                      className="flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.icon && <item.icon className="mr-3 h-5 w-5" />}

                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <Separator />

              <div>
                {session ? (
                  <>
                    <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                      My Account
                    </h2>
                    <SheetClose asChild>
                      <Link
                        href="/my-account"
                        className="flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <User className="mr-3 h-5 w-5" />
                        Dashboard
                      </Link>
                    </SheetClose>

                    <Button
                      onClick={() => signOut()}
                      variant="ghost"
                      className="w-full justify-start rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <Button asChild className="w-full">
                    <Link href="/signup">Create an account</Link>
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

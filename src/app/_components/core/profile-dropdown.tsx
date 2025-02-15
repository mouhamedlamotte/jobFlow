"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { LogOut, Menu, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type ProfileDropdownProps = {};

export const ProfileDropdown = ({}: ProfileDropdownProps): JSX.Element => {
  const { data: session } = useSession();

  if (!session?.user?.id) {
    return (
      <Button asChild>
        <Link href="/signup">Sign up</Link>
      </Button>
    );
  }

  const user = {
    name: session.user.name || "Anonymous",
    email: session.user.email,
    image: session.user.image || "",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full pr-1">
          <Menu className="h-5 w-5" />

          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center gap-2 py-1.5 text-left text-sm font-normal">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="rounded-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-account" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>My Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => signOut()}
          className="flex items-center text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

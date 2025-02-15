"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <span
      onClick={() => signOut()}
      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    >
      <LogOut />
      Sign Out
    </span>
  );
}

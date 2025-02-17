"use client";

import { Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut().catch(() => setIsLoading(false));
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="inline-flex w-full justify-start"
    >
      {isLoading ? <Loader className="animate-spin" /> : <LogOut />}
      Se déconnecter
    </Button>
  );
}

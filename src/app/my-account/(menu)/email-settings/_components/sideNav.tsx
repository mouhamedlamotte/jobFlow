"use client";

import { ResendIcon } from "@/app/_components/icons/resend-icon";
import { cn } from "@/lib/utils";
import { LockKeyhole, User, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiAmazonsimpleemailservice } from "react-icons/si";


const Links: { name: string; href: string; icon?: any; is_master?: boolean }[] =
  [
    {
      icon: ResendIcon,
      name: "Resend",
      href: "/my-account/email-settings/resend",
      is_master: false,
    },
    {
      icon: SiAmazonsimpleemailservice,
      name: "SMTP",
      href: "/my-account/email-settings/smtp",
      is_master: true,
    }
  ];

export const SettingsNav = () => {
  const pathname = usePathname();
  return (
    <nav
        key={"settings-nav"}
      className="grid gap-4 text-sm text-muted-foreground"
    >
      {Links.map((link) => (
            <Link
              key={Math.random()}
              href={link.href as "/"}
              className={cn(
                "lex flex w-full items-center gap-4 rounded-md px-2.5 py-2 text-muted-foreground hover:text-foreground",
                link.href === pathname && "bg-muted-foreground text-background hover:text-background",
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
      ))}
    </nav>
  );
};

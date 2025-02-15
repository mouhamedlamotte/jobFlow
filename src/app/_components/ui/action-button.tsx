"use client";

import { Button, ButtonProps } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  pending?: boolean;
  className?: string;
} & ButtonProps;

export function ActionButton({
  children,
  disabled,
  className,
  pending,
  ...props
}: Props) {
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      className={cn("", className)}
      {...props}
    >
      {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </Button>
  );
}

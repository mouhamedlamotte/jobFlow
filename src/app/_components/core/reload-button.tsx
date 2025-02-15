"use client";

import { Button, ButtonProps } from "@/app/_components/ui/button";
import { RotateCcw } from "lucide-react";
import React from "react";

interface ReloadButtonProps extends ButtonProps {}

const ReloadButton = React.forwardRef<HTMLButtonElement, ReloadButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={className}
        onClick={(e) => {
          if (props.onClick) props.onClick(e);
          window.location.reload();
        }}
        {...props}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        {props.children || "Reload"}
      </Button>
    );
  }
);

ReloadButton.displayName = "ReloadButton";

export default ReloadButton;

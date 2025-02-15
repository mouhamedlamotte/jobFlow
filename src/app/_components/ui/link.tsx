import { VariantProps, cva } from "class-variance-authority";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

const linkVariants = cva("text-primary underline-offset-4 hover:underline", {
  variants: {
    variant: {
      default: "",
      button:
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    },
    size: {
      default: "",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Internal Link Component
export interface LinkProps<T = {}>
  extends NextLinkProps<T>,
    VariantProps<typeof linkVariants> {
  children: React.ReactNode;
  className?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, variant, size, ...props }, ref) => {
    return (
      <NextLink
        className={linkVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = "Link";

// External Link Component
export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  children: React.ReactNode;
  className?: string;
}

const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, className, variant, size, ...props }, ref) => {
    return (
      <a
        className={linkVariants({ variant, size, className })}
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
);

ExternalLink.displayName = "ExternalLink";

export { ExternalLink, Link };

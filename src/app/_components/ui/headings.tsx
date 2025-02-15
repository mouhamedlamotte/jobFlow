import { cn } from "@/lib/utils";

type H1Props = React.ComponentPropsWithoutRef<"h1">;

export function H1({ children, className, ...props }: H1Props) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold max-w-screen-md mb-4 leading-tight md:text-5xl lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

type H2Props = React.ComponentPropsWithoutRef<"h2">;

export function H2({ children, className, ...props }: H2Props) {
  return (
    <h2
      className={cn(
        "text-4xl font-bold max-w-screen-md mb-3 leading-tight md:text-5xl lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

type H3Props = React.ComponentPropsWithoutRef<"h3">;

export function H3({ children, className, ...props }: H3Props) {
  return (
    <h3
      className={cn(
        "text-3xl font-semibold max-w-screen-md mb-2 leading-tight md:text-4xl lg:text-4xl",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

type H4Props = React.ComponentPropsWithoutRef<"h4">;

export function H4({ children, className, ...props }: H4Props) {
  return (
    <h4
      className={cn(
        "text-2xl font-medium max-w-screen-md mb-2 leading-tight md:text-3xl lg:text-3xl",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

type H5Props = React.ComponentPropsWithoutRef<"h5">;

export function H5({ children, className, ...props }: H5Props) {
  return (
    <h5
      className={cn(
        "text-xl font-medium max-w-screen-md mb-1 leading-tight md:text-2xl lg:text-2xl",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
}

type H6Props = React.ComponentPropsWithoutRef<"h6">;

export function H6({ children, className, ...props }: H6Props) {
  return (
    <h6
      className={cn(
        "text-lg font-medium max-w-screen-md mb-1 leading-tight md:text-xl lg:text-xl",
        className
      )}
      {...props}
    >
      {children}
    </h6>
  );
}

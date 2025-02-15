import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<"section"> & {
  containerClasseName?: string;
};

export const Section = ({
  children,
  className,
  containerClasseName,
  ...props
}: Props) => {
  return (
    <section className={cn("w-full py-16 md:py-32", className)} {...props}>
      <div
        className={cn(
          "container h-full flex items-center flex-col",
          containerClasseName
        )}
      >
        {children}
      </div>
    </section>
  );
};

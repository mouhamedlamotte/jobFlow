import { SITE_NAME } from "@/app/_constants/seo";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import appLogo from "/public/assets/logo.png";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  className?: string;
  iconClassName?: string;
};

export const AppLogo = ({ className, iconClassName, ...props }: Props) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center text-2xl lg:text-3xl", className)}
      {...props}
    >
      <Image
        src={appLogo}
        alt={`${SITE_NAME} logo`}
        height={32}
        width={32}
        className="mr-1"
      />

      <span className="font-bold">
        Ready<small className="text-base font-bold">.js</small>
      </span>
    </Link>
  );
};

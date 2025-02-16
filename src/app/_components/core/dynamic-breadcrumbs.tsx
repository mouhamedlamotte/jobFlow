"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";

export const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const breadcrumbs = pathname?.split("/")?.filter((crumb) => crumb !== "");
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className="capitalize">{crumb?.split("-")?.join(" ")}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                    href={`/${breadcrumbs.slice(0, index + 1).join("/")}` as "/"}
                    className="hover:text-foreground cursor-pointer capitalize"
                >
                    {crumb?.split("-")?.join(" ")}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
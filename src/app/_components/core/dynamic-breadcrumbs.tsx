"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import {
  Breadcrumb as BreadcrumbType,
  NavigationItem,
} from "@/types/navigation-item";
import { usePathname } from "next/navigation";

type DynamicBreadcrumbsProps<T extends string> = {
  navigationItems: NavigationItem<T>[];
};

export const DynamicBreadcrumbs = <T extends string>({
  navigationItems,
}: DynamicBreadcrumbsProps<T>) => {
  const pathname = usePathname();

  const findBreadcrumbs = (
    items: Pick<NavigationItem<T>, "breadcrumbs" | "items" | "title" | "url">[]
  ): BreadcrumbType<T>[] => {
    for (const item of items) {
      if (item.url === pathname) {
        return item.breadcrumbs || [];
      }
      if (item.items) {
        const subItemBreadcrumbs = findBreadcrumbs(item.items);
        if (subItemBreadcrumbs.length > 0) {
          return subItemBreadcrumbs;
        }
      }
    }
    return [];
  };

  const breadcrumbs = findBreadcrumbs(navigationItems);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <BreadcrumbItem key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              {isLast ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : breadcrumb.link ? (
                <BreadcrumbLink href={breadcrumb.link}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbItem>{breadcrumb.label}</BreadcrumbItem>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

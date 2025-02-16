import { LucideProps } from "lucide-react";
import { Route } from "next";
import { ComponentType } from "react";

export type Breadcrumb<T extends string> = {
  label: string;
  link?: Route<T> | URL;
};

export type NavigationItem<T extends string> = {
  title: string;
  url: Route<T> | URL;
  icon?: ComponentType<LucideProps | any >;
  breadcrumbs?: Breadcrumb<T>[];
  isActive?: boolean;
  items?: {
    title: string;
    url: Route<T> | URL;
    breadcrumbs: Breadcrumb<T>[];
  }[];
};

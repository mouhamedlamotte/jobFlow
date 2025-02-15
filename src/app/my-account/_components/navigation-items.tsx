"use client";

import { NavigationItem } from "@/types/navigation-item";
import { LayoutDashboard, Shield, SquareUser } from "lucide-react";

export const mainNavigationItems: NavigationItem<string>[] = [
  {
    title: "Dashboard",
    url: "/my-account",
    icon: LayoutDashboard,
    breadcrumbs: [{ label: "Dashboard", link: "/my-account" }],
  },
  {
    title: "Personal Details",
    url: "/my-account/personal-details",
    icon: SquareUser,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Personal Details", link: "/my-account/personal-details" },
    ],
  },
  {
    title: "Password & Security",
    url: "/my-account/password-and-security",
    icon: Shield,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      {
        label: "Password & Security",
        link: "/my-account/password-and-security",
      },
    ],
  },
];

export const navigationItems = [...mainNavigationItems];

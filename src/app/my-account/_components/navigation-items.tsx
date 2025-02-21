"use client";

import { NavigationItem } from "@/types/navigation-item";
import { Bot, FileText, Folder, LayoutDashboard, Mailbox, Shield, SquareUser } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

export const mainNavigationItems : NavigationItem<string>[] = [
  {
    disabled: true,
    title: "Tableau de bord",
    url: "/my-account",
    icon: LayoutDashboard,
    breadcrumbs: [{ label: "Dashboard", link: "/my-account" }],
  },
  {
    disabled: true,
    title: "Mon profil",
    url: "/my-account/personal-details",
    icon: SquareUser,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Mon profil", link: "/my-account/personal-details" },
    ],
  },
  {
    title: "Apply flow",
    url: "/my-account/aplyflow",
    icon: SquareUser,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Apply flow", link: "/my-account/aplyflow" },
    ],
  },
  {
    disabled: true,
    title: "IA",
    url: "/my-account/ai",
    icon: Bot,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "IA", link: "/my-account/ai" },
    ],
  },
  {
    title: "Mes CV",
    url: "/my-account/cvs",
    icon: FaFilePdf,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Mes CV", link: "/my-account/cvs" },
    ],
  },
  {
    disabled: true,
    title: "Candidatures",
    url: "/my-account/applications",
    icon: Folder,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Candidatures", link: "/my-account/applications" },
    ],
  },
  {
    disabled: true,
    title: "Modèles de lettres",
    url: "/my-account/templates",
    icon: FileText,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Modèles de lettres", link: "/my-account/templates" },
    ],
  },
  {
    title: "Paramètres SMTP / Envoi",
    url: "/my-account/email-settings/resend",
    icon: Mailbox,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Paramètres SMTP / Envoi", link: "/my-account/email-settings/resend" },
    ],
  }
];

export const navigationItems = [...mainNavigationItems];

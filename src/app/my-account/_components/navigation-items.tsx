"use client";

import { NavigationItem } from "@/types/navigation-item";
import { Bot, FileText, Folder, LayoutDashboard, Mailbox, Shield, SquareUser } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

export const mainNavigationItems : NavigationItem<string>[] = [
  {
    title: "Tableau de bord",
    url: "/my-account",
    icon: LayoutDashboard,
    breadcrumbs: [{ label: "Dashboard", link: "/my-account" }],
  },
  {
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
    url: "/my-account/email-settings",
    icon: Mailbox,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      { label: "Paramètres SMTP / Envoi", link: "/my-account/email-settings" },
    ],
  },
  {
    title: "Mot de passe & Securité",
    url: "/my-account/password-and-security",
    icon: Shield,
    isActive: true,
    breadcrumbs: [
      { label: "Dashboard", link: "/my-account" },
      {
        label: "Mot de passe & Securité",
        link: "/my-account/password-and-security",
      },
    ],
  },
];

export const navigationItems = [...mainNavigationItems];

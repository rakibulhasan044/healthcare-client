import { UserRole } from "@/lib/auth-utils";
import { UserInfo } from "./user.interface";

export interface IDashboardNavbarContent {
  userInfo: UserInfo;
}

export interface NavItem {
  title: string | "link";
  href: string | "href";
  icon: string;
  badge: string | number;
  description: string;
  role: UserRole[];
}

export interface NavSection {
  title?: string | 'title';
  items: NavItem[];
}

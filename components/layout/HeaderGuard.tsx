"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderGuard() {
  const pathname = usePathname() || "/";
  const isAdminRoute = pathname.startsWith("/admin");
  return isAdminRoute ? null : <Header />;
}

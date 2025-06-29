"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterGuard() {
  const pathname = usePathname() || "/";
  const isAdminRoute = pathname.startsWith("/admin");
  return isAdminRoute ? null : <Footer />;
}

"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();

  // probles with routes 
  const routes = [
    {
      href: `/store/${params.storeId}`,
      label: "Overview",
      active: pathname === `/store/${params.storeId}`,
    },
    {
      href: `/store/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/store/${params.storeId}/billboards`,
    },
    {
      href: `/store/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/store/${params.storeId}/categories`,
    },
    {
      href: `/store/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/store/${params.storeId}/products`,
    },
    {
      href: `/store/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/store/${params.storeId}/orders`,
    },
    {
      href: `/store/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/store/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={"flex items-center space-x-4 lg:space-x-6 mx-6"}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;

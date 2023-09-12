"use client";

import React from "react";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { ModeToggle } from "../mode-toggle";
import { UserAvatar } from "../input/user-avatar";
import { Store, User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface NavbarProps {
  user: User;
  stores: Store[];
}

export const Navbar: React.FC<NavbarProps> = ({ stores, user }) => {

  return (
    <div className="border-b ">
      <div className="flex h-20 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <div onClick={() => signOut()}>
            <UserAvatar userImage={user.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

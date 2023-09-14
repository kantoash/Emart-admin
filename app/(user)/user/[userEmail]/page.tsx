
import { UserAvatar } from "@/components/input/user-avatar";
import { Heading } from "@/components/input/heading";
import StoreSwitcher from "@/components/navbar/store-switcher";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React from "react";
import getCurrentUser from "@/actions/getCurrentUser";

const SetupPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  return (
    <div className="h-full flex flex-col items-center justify-center ">
      <div className="flex items-center gap-x-5 mb-5">
        <UserAvatar userImage={currentUser.image} isLarge />
        <Heading title={currentUser.name!} description={"your's user layout"} />
      </div>
      <StoreSwitcher items={stores} />
    </div>
  );
};

export default SetupPage;


import getCurrentUser from "@/actions/getCurrentUser";
import { Navbar } from "@/components/navbar/navbar";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <>
      <Navbar user={currentUser} stores={stores} />
      {children}
    </>
  );
}

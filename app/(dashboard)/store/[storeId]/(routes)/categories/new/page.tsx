import prismadb from "@/lib/prismadb";
import { CategoryForm } from "../[categoryId]/components/category-form";


const CategoryAddPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={null} />
      </div>
    </div>
  );
};

export default CategoryAddPage;

import prismadb from "@/lib/prismadb";
import ProductForm from "../[productId]/components/product-form";



const ProductAddPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={categories} initialData={null} />
      </div>
    </div>
  );
};

export default ProductAddPage;

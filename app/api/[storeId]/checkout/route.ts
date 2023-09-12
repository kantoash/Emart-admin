import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds, userId } = await req.json();

  if (!userId) {
    return new NextResponse("userId id is required", { status: 401 })
  }

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  const order = await prismadb.order.create({
    data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
            create: productIds.map((productId: string) => ({
                product: {
                    userId: userId,
                    connect: {
                        id: productId
                    }
                }
            }))
        }
    }
  });

 
  return NextResponse.json({ order });
};
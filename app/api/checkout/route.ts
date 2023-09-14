import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


export async function POST(
  req: Request,
) {
  const { productIds, userId, phone, address } = await req.json();

  if (!userId) {
    return new NextResponse("user Id is required", { status: 401 })
  }

  if (!phone || !address) {
    return new  NextResponse("order details is required", { status: 402 })
  }

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const order = await prismadb.order.create({
    data: {
        userId: userId,
        phone: phone,
        address: address,
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
  })

 
  return NextResponse.json({ productIds, userId, phone, address });
};
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
) {
    try {
        const products = await prismadb.product.findMany({
            include: {
                reviews: true,
                store: true,
                category: true,
                images: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products);
    } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const currentUser = await getCurrentUser();
    const { name } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId: currentUser.id
      }
    })

    return NextResponse.json(store);

  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

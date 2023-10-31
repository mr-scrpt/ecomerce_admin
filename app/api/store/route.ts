import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismaDB from "@/lib/prismadb";
import { slugGenerator } from "@/lib/slugGenerator";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 403 });
    }
    const slug = slugGenerator(name);

    // if (!slug) {
    //   return new NextResponse("Slug not be genetrated", { status: 403 });
    // }

    const isUnique = await prismaDB.store.findFirst({ where: { name } });

    if (!!isUnique) {
      return new NextResponse("Duplicate store name", { status: 403 });
    }

    const store = await prismaDB.store.create({
      data: {
        name,
        userId,
        slug,
      },
    });

    return NextResponse.json(store);
  } catch (e) {
    console.log("[STORE_POST]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

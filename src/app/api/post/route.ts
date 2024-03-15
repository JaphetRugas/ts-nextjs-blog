import { NextRequest, NextResponse } from "next/server"; 
import { db } from "@/lib/db"; 
import { postSchema } from "@/lib/validationSchemas"; 

export async function GET(request: NextRequest) {
  const userPosts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { 
      postUser: true,
      postComments: {
        include: {
          commentUser: true,  
        },
      },
    },
  });

  const response = new NextResponse(JSON.stringify(userPosts));
  response.headers.set("Cache-Control", "no-store");

  return response;
}
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Props {
  params: { postId: number };
}

export async function GET(request: NextRequest, { params }: Props) {
  const postId = params.postId;

  try {
    const post = await db.post.findUnique({
      where: { id: Number(postId) },
      include: {
        postUser: true,
        postComments: {
          include: {
            commentUser: true,
          },
        },
        postReactions: true,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

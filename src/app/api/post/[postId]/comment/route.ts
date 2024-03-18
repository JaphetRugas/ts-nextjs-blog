import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Props {
  params: { postId: string };
}

export async function POST(request: NextRequest, { params }: Props) {
  const postId = Number(params.postId);

  const body = await request.json();
  const { content, userId } = body;

  try {
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const comment = await db.comment.create({
      data: {
        content,
        commentUserId: userId,
        commentPostId: postId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const postId = Number(params.postId);

  try { 
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
 
    await db.comment.deleteMany({
      where: { commentPostId: postId },
    });

    return NextResponse.json({ message: "All comments deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

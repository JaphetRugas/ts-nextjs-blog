import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Props {
  params: { postId: string; userId: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const postId = Number(params.postId);
  const userId = params.userId;

  try {
    const reaction = await db.reaction.findFirst({
      where: {
        reactionPostId: postId,
        reactionUserId: userId,
      },
    });

    const isReacted = !!reaction?.isLiked;

    const postData = await db.post.findUnique({
      where: {
        id: postId,
      },
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
    return NextResponse.json(
      { ...postData, isLiked: isReacted },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking reaction:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const postId = Number(params.postId);
    const userId = params.userId;

    if (!postId || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.reaction.create({
      data: {
        isLiked: true,
        reactionUserId: userId,
        reactionPostId: postId,
      },
    });

    return NextResponse.json(
      { message: "Post liked successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const postId = Number(params.postId);
    const userId = params.userId;

    if (!postId || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingReaction = await db.reaction.findFirst({
      where: {
        reactionPostId: postId,
        reactionUserId: userId,
      },
    });

    // If no reaction found, return error
    if (!existingReaction) {
      return NextResponse.json(
        { message: "You have not liked this post" },
        { status: 400 }
      );
    }

    // Delete the reaction
    await db.reaction.delete({
      where: {
        id: existingReaction.id,
      },
    });

    return NextResponse.json(
      { message: "Post unliked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unliking post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

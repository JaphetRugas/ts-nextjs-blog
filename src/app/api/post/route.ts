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
      postReactions: true,
    },
  });

  const response = new NextResponse(JSON.stringify(userPosts));
  response.headers.set("Cache-Control", "no-store");

  return response;
}

export async function POST(request: NextRequest) {
  try {
      const body = await request.json();
      const { title, content, postUserId } = body;

      
      const validation = postSchema.safeParse(body);

      if (!validation.success) {
          const errorMessage = validation.error.errors[0].message;
          return NextResponse.json({ message: errorMessage }, { status: 400 });
      }

      const newPost = await db.post.create({
          data: {
              title,
              content,
              postUserId
          }
      });

      return NextResponse.json({ post: newPost, message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
      console.error('Error creating post:', error);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Delete all reactions
    await db.post.deleteMany({});

    return NextResponse.json(
      { message: 'All post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting reactions:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

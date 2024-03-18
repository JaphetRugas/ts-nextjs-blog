"use client";
import { usePostListStore } from "@/app/store/postStore";
import { Skeleton } from "@mui/material";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PostPage({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const {
    setPost,
    loading,
    post,
    setLoading,
    handleReaction,
    handleCommentSubmit,
  } = usePostListStore();

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/post/${params.postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          console.error("Failed to fetch post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [params.postId, setPost, setLoading]);

  const { data: session } = useSession();

  if (loading || !post) {
    return (
      <div className="relative bg-gray-900 text-white min-h-screen mt-10 py-12 px-4 sm:px-6 lg:px-8">
        {[1].map((index) => (
          <div key={index} className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <Skeleton
                    key={index}
                    variant="text"
                    width="100%"
                    height={40}
                  />
                  <Skeleton
                    key={index + 1}
                    variant="text"
                    width="100%"
                    height={20}
                  />
                  <Skeleton
                    key={index + 2}
                    variant="rectangular"
                    width="100%"
                    height={200}
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <Skeleton
                    key={index + 3}
                    variant="text"
                    width="100%"
                    height={40}
                  />
                  <Skeleton
                    key={index + 4}
                    variant="text"
                    width="100%"
                    height={20}
                  />
                  <Skeleton
                    key={index + 5}
                    variant="text"
                    width="100%"
                    height={20}
                  />
                  <Skeleton
                    key={index + 6}
                    variant="text"
                    width="100%"
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900 text-white min-h-screen mt-10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
              <div className="flex items-center mb-2">
                <button
                  onClick={() => handleReaction(post.id)}
                  className="text-white"
                >
                  {post.isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
                </button>

                {post && post.postReactions && (
                  <span className="mr-4">
                    (
                    {
                      post.postReactions.filter((reaction) => reaction.isLiked)
                        .length
                    }
                    )
                  </span>
                )}

                <p className="text-gray-400">
                  Posted by: {post.postUser?.firstName}{" "}
                  {post.postUser?.lastName}
                </p>
                <p className="text-gray-400 ml-4">
                  Created at: {formatDate(post.createdAt)}
                </p>
              </div>
              <p className="text-lg">{post.content}</p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <form
                className="mb-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(
                    post.id,
                    e.target.comment.value,
                    session?.user?.id,
                    session?.user?.firstName,
                    session?.user?.lastName
                  );
                  e.target.comment.value = "";
                }}
              >
                <h2 className="text-xl font-semibold mb-4">Add Comment</h2>
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    className="mt-1 bg-gray-700 text-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Comments <small>({post.postComments.length}) </small>
                </h2>
                {post.postComments.map((comment, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                    <p className="text-gray-300">{comment.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-gray-400">
                        <p>
                          Commented by:{" "}
                          {comment.commentUser?.firstName
                            ? comment.commentUser.firstName
                            : "Unknown"}{" "}
                          {comment.commentUser?.lastName
                            ? comment.commentUser.lastName
                            : ""}
                        </p>
                        <p>Created at: {formatDate(comment.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

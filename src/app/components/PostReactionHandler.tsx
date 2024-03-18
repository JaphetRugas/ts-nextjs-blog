"use client";
import React, { useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { usePostListStore } from "../store/postStore";
import { Post } from "../types/store.types";
import { useSession } from "next-auth/react";

interface PostReactionHandlerProps {
  post: Post;
}

const PostReactionHandler = ({ post }: PostReactionHandlerProps) => {
  const { handleReaction } = usePostListStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const { id } = session.user;

  useEffect(() => {
    const fetchIsLiked = async () => {
      setIsLoading(true);
      try {
        const userId = id;
        const response = await fetch(`/api/post/${post.id}/react/${userId}`);
        if (response.ok) {
          const { isLiked } = await response.json();
          setIsLiked(isLiked);
        } else {
          console.error("Failed to fetch isLiked for post:", post.id);
        }
      } catch (error) {
        console.error("Error fetching isLiked:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIsLiked();
  }, [post.id]);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <button
            onClick={() => handleReaction(post.id)}
            className="text-white"
          >
            {isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
          </button>
          <span className="mr-4">({post.postReactions.length})</span>
        </>
      )}
    </div>
  );
};

export default PostReactionHandler;

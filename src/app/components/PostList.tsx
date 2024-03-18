"use client";
import React, { useEffect, useState } from "react";
import { usePostListStore } from "../store/postStore";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";
import Link from "next/link"; 
import PostReactionHandler from "./PostReactionHandler";

const MAX_CONTENT_LENGTH = 300;

const PostList = () => {
  const { posts, setPosts, toggleExpand } = usePostListStore();

  const [isLoading, setLoading] = useState<boolean>(true);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content: string | any[], expanded: boolean) => {
    if (expanded || content.length <= MAX_CONTENT_LENGTH) {
      return content;
    }
    return `${content.slice(0, MAX_CONTENT_LENGTH)}...`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);  

  return (
    <div className="w-full">
      {isLoading ? (
        <>
          {[1, 2, 3].map((index) => (
            <div key={index} className="mb-8">
              <Skeleton variant="rectangular" width="100%" height={50} />
              <Typography variant="h4">
                <Skeleton variant="text" />
              </Typography>
              <Typography variant="subtitle1">
                <Skeleton variant="text" />
              </Typography>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </div>
          ))}
        </>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-400 mb-2">
              Posted by: {post.postUser?.firstName} {post.postUser?.lastName}
            </p>
            <p className="text-gray-400 mb-4">
              Created at: {formatDate(post.createdAt)}
            </p>
            <p className="text-lg">
              {truncateContent(post.content, post.expanded)}
            </p>
            {post.content.length > MAX_CONTENT_LENGTH && (
              <button
                className="text-white mt-2"
                onClick={() => toggleExpand(post.id)}
              >
                {post.expanded ? "Show Less" : "Load More"}
              </button>
            )}
            <div className="flex items-center mt-4">
            <PostReactionHandler post={post} />
              {"  "}
              <Link href={`/dashboard/${post.id}`} className="text-white">
                View Comments ({post.postComments.length})
              </Link>
            </div>
            <hr className="my-8 border-t border-gray-700" />
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;

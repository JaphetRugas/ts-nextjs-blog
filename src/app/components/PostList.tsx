"use client";
import React from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  expanded: boolean;
  postUser: {
    firstName: string;
    lastName: string;
  };
  postComments: any[];
  isLiked: boolean;
};

type PostListProps = {
  posts: Post[];
  handleReaction: (postId: number) => void;
  toggleExpand: (postId: number) => void;
  handleViewComments: (post: Post) => void;
};

const MAX_CONTENT_LENGTH = 300;

const PostList = ({
  posts,
  handleReaction,
  toggleExpand,
  handleViewComments,
}: PostListProps) => {
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

  return (
    <div className="w-full">
      {posts.map((post) => (
        <div key={post.id} className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-400 mb-2">
            Posted by: {post.postUser.firstName} {post.postUser.lastName}
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
            <button
              onClick={() => handleReaction(post.id)}
              className="text-white mr-4"
            >
              {post.isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
            </button>
            <button
              onClick={() => handleViewComments(post)}
              className="text-white"
            >
              View Comments ({post.postComments.length})
            </button>
          </div>
          <hr className="my-8 border-t border-gray-700" />
        </div>
      ))}
    </div>
  );
};

export default PostList;

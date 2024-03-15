"use client";
import React, { useState, useEffect } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import Modal from "../components/PostModalDemo";
import { useRouter } from "next/navigation";

const MAX_CONTENT_LENGTH = 300;

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleReaction = (postId) => {};

  const handleViewComments = async (post) => {
    setSelectedPost(post);
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`);
      if (response.ok) {
        const data = await response.json();
        setSelectedPostComments(data.comments);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    // Implement logic to submit the comment
    console.log("Comment submitted:", newComment);
    setNewComment(""); // Clear the input field after submitting
  };

  const toggleExpand = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, expanded: !post.expanded } : post
      )
    );
  };

  const truncateContent = (content, expanded) => {
    if (expanded || content.length <= MAX_CONTENT_LENGTH) {
      return content;
    }
    return `${content.slice(0, MAX_CONTENT_LENGTH)}...`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-green-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">{post.title}</h1>
            <p className="text-gray-400 mb-2 text-white">
              Posted by: {post.postUser.firstName} {post.postUser.lastName}
            </p>
            <p className="text-gray-400 mb-4 text-white">
              Created at: {formatDate(post.createdAt)}
            </p>
            <p className="text-lg text-white">
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
      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Comments</h2>
             
            <ul className="w-full text-white">
              {selectedPostComments.map((comment) => (
                <li key={comment.id} className="mb-4">
                  <p className="text-gray-400 mb-1">
                    {comment.user.firstName} {comment.user.lastName} -{" "}
                    {comment.createdAt}
                  </p>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

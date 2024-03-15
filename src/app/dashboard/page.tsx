"use client";
import React, { useState, useEffect } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import Modal from "../components/PostModalDemo";
import { useRouter } from "next/navigation";
import PostList from "../components/PostList";

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);

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
      }
    };
    fetchPosts();
  }, []);

  const handleReaction = (postId) => {};

  const handlePostSubmit = async () => {
    // Implement logic to submit the post
    console.log("New post submitted:", newPostTitle, newPostContent);
    setNewPostTitle(""); // Clear the input field after submitting
    setNewPostContent(""); // Clear the input field after submitting
    setShowPostModal(false); // Close the post modal after submitting
  };

  const toggleExpand = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, expanded: !post.expanded } : post
      )
    );
  };

  const handleViewComments = (post) => { 
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-900 min-h-screen overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-3xl w-full">
        <div className="min-h-screen bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <button
              className="text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-4 mb-4"
              onClick={() => setShowPostModal(true)}
            >
              Create New Post
            </button>
            <PostList
              posts={posts}
              handleReaction={handleReaction}
              toggleExpand={toggleExpand}
              handleViewComments={handleViewComments}
            />
          </div>
          {showPostModal && (
            <Modal onClose={() => setShowPostModal(false)}>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Enter title"
                  className="bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 mb-4 w-full"
                />
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Enter content"
                  rows={4}
                  className="bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 mb-4 w-full resize-none"
                />
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-4"
                  onClick={handlePostSubmit}
                >
                  Submit
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

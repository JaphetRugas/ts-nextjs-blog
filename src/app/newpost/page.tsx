"use client";
import React from "react";
import { usePostListStore } from "../store/postStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();
  const {
    newPostTitle,
    newPostContent,
    setNewPostTitle,
    setNewPostContent,
    handlePostSubmit,
  } = usePostListStore();
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const { id } = session.user;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await handlePostSubmit(id);
    setTimeout(() => {
      setNewPostTitle("");
      setNewPostContent("");
      router.push("/dashboard");
      router.refresh();
    }, 3000);
  };

  return (
    <div className="relative flex flex-col justify-center bg-gray-900 min-h-screen overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <div className="min-h-screen bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto ml-4">
            <h1 className="text-4xl font-bold mb-8">Create New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-lg font-medium mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 resize-none"
                  rows={6}
                  placeholder="Enter content"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

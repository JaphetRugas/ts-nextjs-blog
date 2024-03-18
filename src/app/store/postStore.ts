import { ReactNode } from "react";
import { create } from "zustand";

type Post = {
  length: ReactNode;
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

type PostListState = {
  posts: Post[];
  post: Post | null;
  newPostTitle: string;
  newPostContent: string;
  userId: string | undefined;
  loading: boolean;
  setPost: (post: Post | null) => void;
  setPosts: (posts: Post[]) => void;
  setNewPostTitle: (title: string) => void;
  setNewPostContent: (content: string) => void;
  setUserId: (userId: string | undefined) => void;
  setLoading: (loading: boolean) => void;
  handleReaction: (postId: number) => void;
  toggleExpand: (postId: number) => void;
  handlePostSubmit: (userId: string | undefined) => void;
  handleCommentSubmit: (
    postId: number,
    content: string,
    userId: string | undefined
  ) => void;
};

export const usePostListStore = create<PostListState>((set) => ({
  posts: [],
  post: null,
  newPostTitle: "",
  newPostContent: "",
  userId: undefined,
  loading: true,
  setPost: (post) => set({ post }),
  setPosts: (posts) => set({ posts }),
  setNewPostTitle: (title) => set({ newPostTitle: title }),
  setNewPostContent: (content) => set({ newPostContent: content }),
  setUserId: (userId) => set({ userId }),
  setLoading: (loading) => set({ loading }),
  handleReaction: (postId) => {},
  toggleExpand: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, expanded: !post.expanded } : post
      ),
    }));
  },
  handlePostSubmit: async (userId) => {
    try {
      set({ loading: true });
      const { newPostTitle, newPostContent } = usePostListStore.getState();

      const body = {
        title: newPostTitle,
        content: newPostContent,
        postUserId: userId,
      };

      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Failed to create post");
      }
      set({ loading: false });
    } catch (error) {
      console.error("Error creating post:", error);
      set({ loading: false });
    }
  },
  handleCommentSubmit: async (postId, content, userId) => {
    try {
      const response = await fetch(`/api/post/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, userId }),
      });

      if (response.ok) {
        const data = await response.json(); 
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, postComments: [...post.postComments, data] }
              : post
          ),
        }));
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },
}));

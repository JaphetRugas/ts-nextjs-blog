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
  newPostTitle: string;
  newPostContent: string;
  userId: string | undefined;
  loading: boolean;
  setPosts: (posts: Post[]) => void; 
  setNewPostTitle: (title: string) => void;
  setNewPostContent: (content: string) => void;
  setUserId: (userId: string | undefined) => void;  
  setLoading: (loading: boolean) => void;
  handleReaction: (postId: number) => void;
  toggleExpand: (postId: number) => void;
  handleViewComments: (post: Post) => void;
  handlePostSubmit: (userId: string | undefined) => void; 
};

export const usePostListStore = create<PostListState>((set) => ({
  posts: [],
  newPostTitle: "",
  newPostContent: "",
  userId: undefined, 
  loading: false,
  setPosts: (posts) => set({ posts }),
  setNewPostTitle: (title) => set({ newPostTitle: title }),
  setNewPostContent: (content) => set({ newPostContent: content }),
  setUserId: (userId) => set({ userId }), 
  setLoading: (loading) => set({ loading }),
  handleReaction: (postId) => {},
  toggleExpand: (postId) => {},
  handleViewComments: (post) => {},
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
}));

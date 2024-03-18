import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      birthday?: DateTime;
      bio?: string;
      profilePic?: string;
      createdAt?: DateTime;
    };
  }
}

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
  postReactions: any[];
  isLiked: boolean;
}
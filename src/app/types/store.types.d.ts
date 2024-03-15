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

type User = {
  id: string;
  firstName: string;
  lastName: string;
}

type Image = {
  id: number;
  name: string;
}

type Post = {
  id: number;
  title: string;
  content: string;
  comments?: Comment[];
  postUser?: User;
  postImage?: Image[];
}

type Comment = {
  id: number;
  content: string;
  createdAt: string;
}

type Props = {
  searchParams: { page: string };
}

type UserPostsProps = {
  userId: string | undefined;
}

type PostImage = {
  id: number;
  image_name: string;
}; 
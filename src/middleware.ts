export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard/:path*', '/dashboard/[postId]','/posts/list', '/posts/new', '/profile']  };
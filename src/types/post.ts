import type { PaginationInfo } from './pagination';

export interface Post {
  id: string;
  type: string;
  title: string;
  content: string;
  date: string;
  view: number;
  likes: Array<string>;
  dislikes: Array<string>;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface PostListResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

export interface PostDetailResponse {
  prev: number | null;
  post: Post;
  next: number | null;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

export interface ReplyPostRequest {
  content: string;
}

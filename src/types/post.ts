import type { PaginationInfo } from './pagination';

export interface Post {
  id: string;
  type: string;
  title: string;
  content: string;
  board: string;
  userId: string;
  parentId: string;
  likes: [];
  dislikes: [];
  replies: string[];
  view: number;
  date: string;
  comment: null;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  isDeleted: boolean;
}

export interface PostListResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

export interface PostDetailResponse {
  prev: Post;
  post: Post;
  next: Post;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface CreatePostResponse {
  post: Post;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

export interface ReplyPostRequest {
  content: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  user: {
    email: string;
    name: string;
  };
}

export interface PostListResponse {
  posts: Post[];
  total: number;
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

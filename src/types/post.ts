export interface Post {
  id: string;
  type: string;
  title: string;
  content: string;
  userId: string;
  likes: [];
  dislikes: [];
  replies: string[];
  view: number;
  parentId: string | null;
  data: Date;
}

export interface PostParams {
  page: number;
  size: number;
  type: string;
  keyword: string;
}

export interface PostResponse {
  isSuccess: Boolean;
  message: string;
  data: {
    posts: [];
  };
}

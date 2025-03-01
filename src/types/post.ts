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

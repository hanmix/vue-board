export interface Comment {
  id: string;
  postId: string;
  content: string;
  userId: string;
  to: string | null;
  date: Date;
}

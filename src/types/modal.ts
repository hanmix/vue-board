import type { Post } from './post';

export type ModalType = 'post' | 'reply';

export interface ModalPayload {
  title?: string;
  message?: string;
  content?: Post;
  onConfirm?: () => void;
  onCancel?: () => void;
}

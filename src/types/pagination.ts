import { BoardType } from './navigate';

export interface PaginationParams {
  board?: BoardType;
  page: number;
  size: number;
  type?: string;
  keyword?: string;
}

export interface PaginationInfo {
  total: number;
  size: number;
  page: string;
  lastPage: number;
}

export type SearchType = 'title' | 'content' | 'title_content' | 'user';

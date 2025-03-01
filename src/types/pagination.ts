export interface PaginationParams {
  page: number;
  size: number;
  type?: SearchType;
  keyword?: string;
}

export interface PageInfo {
  total: number;
  size: number;
  page: number;
  lastPage: number;
}

export type SearchType = 'title' | 'content' | 'title_content' | 'user';

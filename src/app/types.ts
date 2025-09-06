export interface Author {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export interface IPost {
  id: number;
  cover: string;
  title: string;
  slug: string;
  body: string;
  markdown: string;
  author: Author;
}

export interface PaginatedPost {
  page: number;
  prev: number | null;
  next: number | null;
  data: IPost[];
}

export interface PostsData {
  posts: IPost[];
}

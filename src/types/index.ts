export interface Author {
    id: number;
    name: string;
    avatar: string;
}

export interface Comment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: null | number;
    likes: number;
}

export interface Pagination {
    page: number;
    size: number;
    total_pages: number;
}

export interface IPagination {
    pagination: Pagination;
    data: Comment[];
}

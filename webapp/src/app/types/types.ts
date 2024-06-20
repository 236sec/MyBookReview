export interface Author {
    name: string;
}
  
export interface Book {
    id: number;
    title: string;
    authorId: number;
    publishedDate: string | null;
    isbn: string;
    pageAmount: number;
    pictureUrl: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    author: Author;
}
  
export interface BooksResponse {
    books: Book[];
}

export interface TableProjection {
    headers: string[];
    rows: string[][];
}

export interface Review {
    id: number;
    bookId: number;
    userId: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
    book: Book;

}

export interface ReviewsResponse {
    reviews: Review[];
}
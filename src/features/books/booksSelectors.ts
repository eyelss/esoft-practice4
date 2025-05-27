import type { RootState } from "../../store";
import type { BookType } from "./booksApi";

export const selectBooks = (state: RootState): BookType[] => state.books.items;
export const selectBook = (state: RootState, wrapId: Pick<BookType, 'id'>): BookType => state.books.items.filter((book: BookType) => book.id === wrapId.id)[0];
export const selectAuthors = (state: RootState): string[] => {
  const bookAuthors: (string | undefined)[] = state.books.items
    .map((book: BookType) => book.author);
  
  const authors = bookAuthors.filter(author => author !== undefined);

  return [...new Set(authors)];
}
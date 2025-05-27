import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getBooks, type BookType } from "./booksApi";

type BooksState = {
  items: BookType[]
};

const initialBooks: BooksState = {
  items: getBooks(),
} satisfies BooksState as BooksState;

const booksSlice = createSlice({
  name: 'books',
  initialState: initialBooks,
  reducers: {
    addBook(state, action: PayloadAction<BookType>) {
      state.items.push(action.payload);
    },

    removeBook(state, action: PayloadAction<Pick<BookType, 'id'>>) {
      state.items = state.items.filter(book => book.id !== action.payload.id);
    },
  },
});

export const { reducer, actions } = booksSlice;
export default booksSlice.reducer;
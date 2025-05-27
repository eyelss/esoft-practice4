import type { Reducer } from "@reduxjs/toolkit";
import booksReducer from "./books/booksSlice";
import themeReducer from "./theme/themeSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import filterReducer from "./filter/filterSlice";
import searchReducer from "./search/searchSlice";

type ReducersDict = { 
  [name: string]: Reducer 
};

const reducers: ReducersDict = {
  'books': booksReducer,
  'theme': themeReducer,
  'filter': filterReducer,
  'search': searchReducer,
  'favorites': favoritesReducer,
};

export default reducers;
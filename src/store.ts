import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import reducers from "./features";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: reducers,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

/**
 * states!:
 * theme = dark | light
 * books = array
 * favorities = array<id>
 * searchQuery = string
 * filters = object
 * 
 * methods!:
 * toggleTheme()
 * addBook(book)
 * removeBook(id)
 * toggleFavorite(id)
 * setSearchQuery(query)
 * setFilters(filters)
 * 
 * bookContext!:
 * states!:
 * textSettings = object
 * color = string
 * size = small | medium | large
 * bold = boolean
 * 
 * methods!:
 * setTextColor(color)
 */
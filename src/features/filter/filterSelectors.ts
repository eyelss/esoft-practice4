import type { RootState } from "../../store";
import type { FilterState } from "./filterSlice";

export const selectFilterYearsRange = (state: RootState): [number, number] | undefined => state.filter.yearRange;
export const selectFilterAuthors = (state: RootState): string[] | undefined => state.filter.authors;
export const selectFilterOnlyFavs = (state: RootState): boolean | undefined => state.filter.onlyFavorites;
export const selectFilter = (state: RootState): FilterState => state.filter;

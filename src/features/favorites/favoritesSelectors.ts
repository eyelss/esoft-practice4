import type { RootState } from "../../store";

export const selectFavorites = (state: RootState): string[] => state.favorites.items;
export const selectIsFavorite = (state: RootState, id: string): boolean => state.fafavorites.items.includes(id);
export const selectFavoritesCount = (state: RootState): number => state.favorites.items.length;
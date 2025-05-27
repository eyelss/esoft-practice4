import type { RootState } from "../../store";

export const selectSearch = (state: RootState): string | undefined => state.search.query;
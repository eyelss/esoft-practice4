import type { RootState } from "../../store";
import type { ThemeType } from "./themeSlice";

export const selectTheme = (state: RootState): ThemeType => state.theme.current;
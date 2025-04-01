import { createContext, FC, useContext, useMemo, useState } from "react";
import { createTheme, PaletteMode, Theme } from "@mui/material";
import { getDesignTokens } from "../../theming/theme";
import {
  IAppContext,
  IAppContextModalData,
} from "./AppContextProvider.interfaces";

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => useContext(AppContext) as IAppContext;

export const AppContextProvider: FC = ({ children }) => {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const [modalData, setModalData] = useState<IAppContextModalData | null>(null);

  const theme = useMemo<Theme>(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode],
  );

  const value = {
    setThemeMode,
    theme,
    modalData,
    setModalData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

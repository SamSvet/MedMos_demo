import { ModalType } from "../../constants/modals";
import { Dispatch } from "react";
import { PaletteMode, Theme } from "@mui/material";

export interface IAppContext {
  setThemeMode: Dispatch<PaletteMode>;
  theme: Theme;
  modalData: IAppContextModalData | null;
  setModalData: Dispatch<IAppContextModalData | null>;
}

export interface IAppContextModalData {
  modalType: ModalType;
}

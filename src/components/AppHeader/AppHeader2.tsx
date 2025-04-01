import {
  AppBar,
  Toolbar,
  MenuList,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { AppMenu2 } from "../AppMenu/AppMenu2";

export const AppHeader2 = () => {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{ top: "auto", bottom: 0 }}
    >
      <Toolbar>
        <AppMenu2 />
      </Toolbar>
    </AppBar>
  );
};

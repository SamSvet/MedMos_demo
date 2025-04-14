import React from "react";
import {
  Tabs,
  Tab,
  Toolbar,
  AppBar,
  Box,
  Typography,
  useScrollTrigger,
  ListItemText,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { matchPath, useLocation } from "react-router-dom";
import AppHeaderMenu from "./AppHeaderMenu";
import { AppHeader2 } from "./AppHeader2";
import { AppMenu2 } from "../AppMenu/AppMenu2";
import RussianLogo from "../LanguageSelect/RussiaFlag";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const AppHeader = () => {
  const location = useLocation();

  let currentPath = "/";
  if (!!matchPath("/long-list/*", location.pathname)) {
    currentPath = "/long-list";
  } else if (!!matchPath("/orders/*", location.pathname)) {
    currentPath = "/orders";
  } else if (!!matchPath("/cd/*", location.pathname)) {
    currentPath = "/orders";
  }

  return (
    // <Box component="nav" sx={{ flexGrow: 1 }}>
    <ElevationScroll>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Box flex={1} display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                sx={{ marginRight: "1em", height: 50 }}
                src={`${process.env.PUBLIC_URL}/medmos.jpeg`}
                alt="Bosch Logo"
              />
            </Box>
            <Box>
              <AppMenu2 />
            </Box>
            <Box display="flex">
              {/* <TextField
                id="filled-select-currency"
                select
                defaultValue="EUR"
                fullWidth
                variant="outlined"
                sx={{ "& fieldset": { border: "none" } }}
              >
                <MenuItem value="RU">
                  <RussianLogo />

                  <ListItemText primary="RU" />
                </MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </TextField> */}
              <LanguageSelect />
              <AppHeaderMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    // </Box>
  );
};

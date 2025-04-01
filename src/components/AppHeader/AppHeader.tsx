import React from "react";
import {
  Tabs,
  Tab,
  Toolbar,
  AppBar,
  Box,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { Link, matchPath, useLocation } from "react-router-dom";
import AppHeaderMenu from "./AppHeaderMenu";
import { AppHeader2 } from "./AppHeader2";
import { AppMenu2 } from "../AppMenu/AppMenu2";

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
              {/* <Typography component="span" variant="h5">
                Приходы ВСС
              </Typography> */}
            </Box>
            <Box>
              {/* <Tabs
                value={currentPath}
                aria-label="Navigation Tabs"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab
                  label={"Заказы"}
                  component={Link}
                  to="/orders"
                  value="/orders"
                />
                <Tab
                  label={"Календарь"}
                  component={Link}
                  to="/long-list"
                  value="/long-list"
                />
              </Tabs> */}

              <AppMenu2 />
            </Box>
            <Box display="flex">
              <AppHeaderMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    // </Box>
  );
};

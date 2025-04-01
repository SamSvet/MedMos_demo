import { PaletteMode, ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";
import { fontsOverrides } from "./fonts";
import { amber, deepOrange } from "@mui/material/colors";

export const getDesignTokens2 = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode,
    // text: {
    //   menu: "#ececec",
    // },
    // border: {
    //   light: mode === "dark" ? grey[800] : grey[100],
    //   main: mode === "dark" ? grey[700] : grey[200],
    //   dark: mode === "dark" ? grey[800] : grey[500],
    // },
    // background: {
    //   secondary: mode === "dark" ? grey[800] : grey[100],
    //   pinnedCell: mode === "dark" ? grey[700] : grey[50],
    //   rowCollapse: mode === "dark" ? grey[500] : grey[500],
    //   sidepanel: mode === "dark" ? grey[900] : "#233044",
    // },
  },
  typography: {
    fontFamily: "SBSansUI, Arial, sans-serif",
    h1: { fontSize: 32 },
    h2: { fontSize: 20 },
    h3: { fontSize: 16 },
    h4: { fontSize: 15 },
    h5: { fontSize: 14 },
    h6: { fontSize: 11 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: fontsOverrides,
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      variants: [
        {
          props: { size: "small" },
          style: {},
        },
      ],
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
      variants: [
        {
          props: { readOnly: true },
          style: {
            pointerEvents: "none",
            backgroundColor: "transparent",
          },
        },
      ],
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "white" : "transparent",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          pointerEvents: "none",
        },
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
      },
      variants: [
        {
          props: {
            open: false,
            freeSolo: true,
            disableClearable: true,
          },
          style: {
            pointerEvents: "none",
          },
        },
      ],
      styleOverrides: {
        tag: {
          height: "fit-content",
          "> .MuiChip-label": {
            whiteSpace: "normal",
            textOverflow: "unset",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
        },
      },
    },
  },
});

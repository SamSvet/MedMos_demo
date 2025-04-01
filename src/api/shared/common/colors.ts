import { DataItem } from "./response-data";
import { blue, grey, red, yellow, green } from "@mui/material/colors";

const order_colors = {
  black: grey[900],
  white: grey[50],
  blue: blue["A700"],
  yellow: yellow["A700"],
  red: red[900],
  green: green["A700"],
};

// type keys = keyof typeof colors;
// type values = (typeof colors)[keys];
export type ColorItem = {
  id: string;
  value: (typeof order_colors)[keyof typeof order_colors];
};

export type ColorsData = {
  colors?: DataItem<ColorItem>;
};

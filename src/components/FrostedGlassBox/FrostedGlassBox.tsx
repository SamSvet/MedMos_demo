import { Backdrop, BackdropProps } from "@mui/material";
import { FC } from "react";

export const FrostedGlass: FC<BackdropProps> = (props) => {
  return (
    <Backdrop
      sx={{
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        inset: 0,
        backdropFilter: "blur(1px)",
        zIndex: (theme) => theme.zIndex.modal + 1,
        transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1) 500ms !important",
      }}
      open={props.open}
    >
      {props.children}
    </Backdrop>
  );
};

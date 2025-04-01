import { FC, ReactNode } from "react";
import {
  DialogTitle,
  DialogTitleProps as MuiDialogTitleProps,
  Grid,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface DialogTitleProps extends MuiDialogTitleProps {
  children?: ReactNode;
  onClose?: () => void;
}

export const DialogHeaderTitle: FC<DialogTitleProps> = ({
  children,
  onClose,
  ...other
}) => {
  return (
    <DialogTitle {...other} sx={{ ...other.sx, fontSize: 20 }}>
      <Grid
        container
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Grid item xs={11}>
          {children}
        </Grid>
        <Grid item xs={1}>
          {onClose ? (
            <IconButton onClick={onClose} data-testid="icon-close-btn">
              <Close />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </DialogTitle>
  );
};

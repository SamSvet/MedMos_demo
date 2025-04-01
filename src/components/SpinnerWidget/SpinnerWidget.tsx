import { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { getIsInProgress } from "../../selectors/global-indicator-selectors";
import { useOrdersSelector } from "../../store/orders-store";

export const SpinnerWidget: FC = () => {
  const isInProgress = useOrdersSelector(getIsInProgress);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
        transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1) 500ms !important",
      }}
      open={isInProgress || false}
      data-testid="spinner-widget"
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

import { FC, useCallback } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useOrdersSelector } from "../../../store/orders-store";
import { getPopupList } from "../../../selectors/notification-selectors";
import { useNotificationModalLogic } from "../NotificationModal.logic";
import { SELENIUM_TEST_IDS } from "../../../constants/selenium-test-ids";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

export const NotificationPopup: FC = (props) => {
  const theme = useTheme();
  const popup = useOrdersSelector(getPopupList);
  const { title, message, actions, onClosePopup } = useNotificationModalLogic(
    popup,
    "popup",
  );

  const handleClose = useCallback(
    (_: unknown, reason: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }
      onClosePopup();
    },
    [onClosePopup],
  );

  return (
    <Snackbar
      open={Boolean(popup)}
      autoHideDuration={6000}
      data-testid="notification-popup"
      TransitionComponent={TransitionRight}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={handleClose}
      data-test-id={SELENIUM_TEST_IDS.notifications.popup}
      {...props}
      sx={{ maxWidth: 500 }}
    >
      <Alert
        action={
          <IconButton
            onClick={onClosePopup}
            key="close_popup"
            data-testid="notification-close-popup-btn"
          >
            <Close />
          </IconButton>
        }
        elevation={6}
        severity="warning"
        sx={{ width: "100%" }}
      >
        <AlertTitle data-test-id={SELENIUM_TEST_IDS.notifications.title}>
          {title}
        </AlertTitle>
        <span data-test-id={SELENIUM_TEST_IDS.notifications.message}>
          {message}
        </span>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "& .MuiButton-root": {
              padding: theme.spacing(0, 1),
              color: "rgb(102, 60, 0)",
              textTransform: "none",
              borderColor: theme.palette.warning.light,
              "&:not(:first-of-type)": {
                ml: theme.spacing(1),
              },
            },
          }}
        >
          {actions}
        </Box>
      </Alert>
    </Snackbar>
  );
};

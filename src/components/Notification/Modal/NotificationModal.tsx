import { FC } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { DialogHeaderTitle } from "../../DialogHeaderTitle/DialogHeaderTitle";
import { getModalList } from "../../../selectors/notification-selectors";
import { useOrdersSelector } from "../../../store/orders-store";
import { useNotificationModalLogic } from "../NotificationModal.logic";
import { SELENIUM_TEST_IDS } from "../../../constants/selenium-test-ids";

export const NotificationModal: FC = (props) => {
  const modal = useOrdersSelector(getModalList);
  const { title, icon, message, actions, onClose } =
    useNotificationModalLogic(modal);

  return (
    <Dialog
      open={Boolean(modal)}
      data-testid="notification-modal"
      data-test-id={SELENIUM_TEST_IDS.notifications.modal}
      {...props}
    >
      <DialogHeaderTitle
        onClose={onClose}
        data-test-id={SELENIUM_TEST_IDS.notifications.title}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              marginRight: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </div>
          <div>{title}</div>
        </div>
      </DialogHeaderTitle>
      <DialogContent dividers>
        <DialogContentText
          data-test-id={SELENIUM_TEST_IDS.notifications.message}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

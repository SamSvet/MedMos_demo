import { FunctionComponent, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { DialogHeaderTitle } from "../DialogHeaderTitle/DialogHeaderTitle";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  SlideProps,
} from "@mui/material";
import { SELENIUM_TEST_IDS } from "../../constants/selenium-test-ids";

export interface ConfirmDialogProps {
  confirmTitle?: string;
  confirmBody: string;
  handleNo(): void;
  handleYes(): void;
}

export const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({
  confirmBody,
  confirmTitle,
  handleNo,
  handleYes,
}) => {
  const { t } = useTranslation();

  const Transition = forwardRef<HTMLElement, SlideProps>((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
  ));

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      data-testid="confirm-dialog"
      data-test-id={SELENIUM_TEST_IDS.confirmDialog.modal}
    >
      <DialogHeaderTitle
        onClose={handleNo}
        data-test-id={SELENIUM_TEST_IDS.confirmDialog.title}
      >
        {confirmTitle}
      </DialogHeaderTitle>

      <DialogContent dividers>
        <DialogContentText
          data-test-id={SELENIUM_TEST_IDS.confirmDialog.message}
        >
          {confirmBody}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <ButtonGroup
          variant="outlined"
          sx={{ display: "grid", gridTemplateColumns: "50% 50%" }}
        >
          <Button
            onClick={handleYes}
            data-testid="confirm-dialog-ok-btn"
            data-test-id={SELENIUM_TEST_IDS.confirmDialog.approveBtn}
          >
            {t("buttons.yes")}
          </Button>
          <Button
            onClick={handleNo}
            color="warning"
            data-testid="confirm-dialog-no-btn"
            data-test-id={SELENIUM_TEST_IDS.confirmDialog.cancelBtn}
          >
            {t("buttons.no")}
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

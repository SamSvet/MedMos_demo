import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import { useCreatedOrderData } from "./hooks/useCreatedOrderData";
import {
  useOrderCreateAttributes,
  useOrderCreateToolBarElements,
} from "./OrderCreate.models";
import { useOrdersSelector } from "../../../store/orders-store";
import { getAdditionalOrderCreateData } from "../../../selectors/orders/order-create-selectors";
import { useOrderCreateActions } from "./hooks/useOrderCreateActions";
import { useOrderValidation } from "../common/hooks/useOrderValidation";
import { blue } from "@mui/material/colors";
import { Box, Divider } from "@mui/material";
import { PaperComponent } from "../common/components/PaperComponent/PaperComponent";
import InputFileUpload from "../../../components/InputFileUpload/InputFileUploadBox";
import InputFileUploadButton from "../../../components/InputFileUpload/InputFileUploadButton";
import { useTranslation } from "react-i18next";

export const OrderCreateFile = () => {
  const { t } = useTranslation();
  const { bad_attributes } = useOrdersSelector(getAdditionalOrderCreateData);

  const { orderErrors, unsetOrderError } = useOrderValidation(bad_attributes);

  const [open, setOpen] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const { order: currOrder, updateOrderInfo } = useCreatedOrderData();
  const {
    save: handleSave,
    close,
    saveFile,
  } = useOrderCreateActions(currOrder, file);

  //   const onChangeHandler = useCallback(
  //     (event: React.ChangeEvent<HTMLInputElement>) => {
  //       if (!event.target.files) return;
  //       setFile(event.target.files[0]);
  //     },
  //     [],
  //   );
  const onChangeHandler = useCallback(
    (file: File) => {
      if (!file) return;
      setFile(file);
      unsetOrderError("file");
    },
    [unsetOrderError],
  );

  return (
    <Dialog
      open={open}
      fullWidth={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {t("order.create.title")}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <InputFileUpload
          onChangeHandler={onChangeHandler}
          overlay={true}
          file={file}
          orderErrors={orderErrors}
        />
        {/* <InputFileUploadButton onChangeHandler={onChangeHandler} /> */}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button autoFocus onClick={close}>
          {t("common.cancelBtn")}
        </Button>
        <Button disabled={Boolean(!file)} onClick={saveFile}>
          {t("common.saveBtn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

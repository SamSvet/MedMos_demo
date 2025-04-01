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

export const OrderCreateFile = () => {
  const { bad_attributes } = useOrdersSelector(getAdditionalOrderCreateData);
  useEffect(() => {
    console.log(bad_attributes);
  }, [bad_attributes]);
  const { orderErrors, unsetOrderError } = useOrderValidation(bad_attributes);

  useEffect(() => {
    console.log(orderErrors);
  }, [orderErrors]);

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
        Новый заказ
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
          Отмена
        </Button>
        <Button disabled={Boolean(!file)} onClick={saveFile}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

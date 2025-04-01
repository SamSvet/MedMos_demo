import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import { useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useCreatedOrderData } from "./hooks/useCreatedOrderData";
import {
  useOrderCreateAttributes,
  useOrderCreateToolBarElements,
} from "./OrderCreate.models";
import { useOrdersSelector } from "../../../store/orders-store";
import { getAdditionalOrderCreateData } from "../../../selectors/orders/order-create-selectors";
import { useOrderCreateActions } from "./hooks/useOrderCreateActions";
import { useOrderValidation } from "../common/hooks/useOrderValidation";
import { FieldElement } from "../common/components/OrderAttributes/OrderAttributes";
import { Divider } from "@mui/material";
import { PaperComponent } from "../common/components/PaperComponent/PaperComponent";

export default function OrderCreate() {
  const [open, setOpen] = useState(true);
  const { order: currOrder, updateOrderInfo } = useCreatedOrderData();
  const { save: handleSave, close } = useOrderCreateActions(currOrder);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const toolBarElements = useOrderCreateToolBarElements(
    handleSave,
    handleCancel,
  );

  const { bad_attributes } = useOrdersSelector(getAdditionalOrderCreateData);
  const { orderErrors, unsetOrderError } = useOrderValidation(bad_attributes);

  const { attributesModel } = useOrderCreateAttributes(
    updateOrderInfo,
    currOrder,
    orderErrors,
    unsetOrderError,
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
        <Grid container spacing={2}>
          <FieldElement attr={attributesModel.get("order_name")!} />

          <FieldElement attr={attributesModel.get("order_manager")!} />

          <FieldElement attr={attributesModel.get("description")!} />
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button autoFocus onClick={close}>
          Отмена
        </Button>
        <Button onClick={handleSave}>Создать</Button>
      </DialogActions>
    </Dialog>
  );
}

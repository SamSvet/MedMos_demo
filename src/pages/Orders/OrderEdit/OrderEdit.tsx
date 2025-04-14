import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useOrdersSelector } from "../../../store/orders-store";
import {
  getAdditionalOrderEditData,
  getOrderEdit,
} from "../../../selectors/orders/order-edit-selectors";
import { useEditedOrderData } from "./hooks/useOrderEdit";
import { useBackToList } from "../common/hooks/useBackToList";
import {
  useOrderEditAttributes,
  useOrderEditToolBarElements,
} from "./OrderEdit.models";
import { OrderDataViewModel } from "../../../api/shared/order-data";
import { OrderInfoViewModel } from "../../../api/shared/order-info";
import { useOrderEditActions } from "./hooks/useOrderEditActions";
import { useCallback, useState } from "react";
import { useOrderValidation } from "../common/hooks/useOrderValidation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { PaperComponent } from "../common/components/PaperComponent/PaperComponent";
import { FieldElement } from "../common/components/OrderAttributes/OrderAttributes";
import { useTranslation } from "react-i18next";

export default function OrderEdit() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [cancelDlg, setCancelDlg] = useState(false);
  const { bad_attributes } = useOrdersSelector(getAdditionalOrderEditData);

  const { order, updateOrderInfo } = useEditedOrderData();

  const { orderErrors, unsetOrderError } = useOrderValidation(bad_attributes);

  const { save: handleOrderSave, close: handleOrderClose } =
    useOrderEditActions(order, []);

  const { attributesModel } = useOrderEditAttributes(
    updateOrderInfo,
    order,
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
        {t("order.edit.title")}
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
        <Button autoFocus onClick={handleOrderClose}>
          {t("common.cancelBtn")}
        </Button>
        <Button onClick={handleOrderSave}>{t("common.editBtn")}</Button>
      </DialogActions>
    </Dialog>
  );
}

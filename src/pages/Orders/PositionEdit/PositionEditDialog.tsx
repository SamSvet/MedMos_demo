import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getAdditionalPositionsEditData,
  getPositionEdit,
} from "../../../selectors/orders/position-edit-selectors";
import { useOrdersSelector } from "../../../store/orders-store";
import { useDraftPositionData } from "../common/hooks/useDraftPositionData";
import { usePositionEditActions } from "./hooks/usePositionEditActions";
import { usePositionValidation } from "../common/hooks/usePositionValidation";
import { usePositionAttrModel } from "./PositionEdit.models";
import { getOrderView } from "../../../selectors/orders/order-view-selectors";
import { PaperComponent } from "../common/components/PaperComponent/PaperComponent";
import { FieldElement } from "../common/components/PositionAttributes/PositionAttributes";

export const PositionEditDialog = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [cancelDlg, setCancelDlg] = useState(false);

  const { positions } = useOrdersSelector(getPositionEdit);
  const { orders } = useOrdersSelector(getOrderView);

  const { position, updatePositionInfo } = useDraftPositionData(positions?.[0]);

  const { save, cancel } = usePositionEditActions(orders[0], position);
  const { bad_attributes } = useOrdersSelector(getAdditionalPositionsEditData);
  const { positionErrors, unsetPositionError } =
    usePositionValidation(bad_attributes);

  const { positionAttributes } = usePositionAttrModel(
    updatePositionInfo,
    position,
    positionErrors,
    unsetPositionError,
    positions?.[0],
  );
  const handleCancel = useCallback(() => setCancelDlg(true), []);
  const handleConfirm = useCallback(() => {
    setCancelDlg(false);
    cancel();
  }, [cancel]);
  const handleNoConfirm = useCallback(() => setCancelDlg(false), []);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {t("order.split.title")}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FieldElement attr={positionAttributes.get("position_name")!} />
          </Grid>
          <Grid item xs={6}>
            <FieldElement attr={positionAttributes.get("color")!} />
          </Grid>
          <Grid item xs={6}>
            <FieldElement attr={positionAttributes.get("model_id")!} />
          </Grid>
          <Grid item xs={12}>
            <FieldElement
              attr={positionAttributes.get("position_description")!}
            />
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <FieldElement attr={positionAttributes.get("container")!} />
          </Grid>
          <Grid item xs={6}>
            <FieldElement attr={positionAttributes.get("status")!} />
          </Grid>
          <Grid item xs={6}>
            <FieldElement attr={positionAttributes.get("count")!} />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button autoFocus onClick={cancel}>
          {t("common.cancelBtn")}
        </Button>
        <Button onClick={save}>{t("common.editBtn")}</Button>
      </DialogActions>
    </Dialog>
  );
};

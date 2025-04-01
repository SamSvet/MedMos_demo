import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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
import { OrderAside } from "../common/components/OrderAside/OrderAside";
import {
  getAdditionalOrderViewData,
  getOrderView,
} from "../../../selectors/orders/order-view-selectors";
import { useOrderShowActions } from "../OrderShow/hooks/useOrderShowActions";
import { useOrderValidation } from "../common/hooks/useOrderValidation";
import { useOrderViewAttributes } from "../OrderShow/OrderShow.models";
import { PositionIteratorInfo2 } from "../OrderShow/PositionIterator";
import { PositionEditAccordion } from "./PositionEditAccordion";
import { PaperComponent } from "../common/components/PaperComponent/PaperComponent";
import { FieldElement } from "../common/components/PositionAttributes/PositionAttributes";

export const PositionEdit = () => {
  const [cancelDlg, setCancelDlg] = useState(false);

  const { t } = useTranslation();

  const { positions } = useOrdersSelector(getPositionEdit);
  const { orders } = useOrdersSelector(getOrderView);
  const { bad_attributes: orderBadAttributes } = useOrdersSelector(
    getAdditionalOrderViewData,
  );
  const { showEdit: linkHandler } = useOrderShowActions(
    orders[0],
    positions || [],
  );
  const { orderErrors } = useOrderValidation(orderBadAttributes);
  const orderModel = useOrderViewAttributes(orders[0], orderErrors);

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
  );

  const handleCancel = useCallback(() => setCancelDlg(true), []);
  const handleConfirm = useCallback(() => {
    setCancelDlg(false);
    cancel();
  }, [cancel]);
  const handleNoConfirm = useCallback(() => setCancelDlg(false), []);

  useEffect(() => {
    console.log(positions);
  }, [positions]);

  return (
    <Box mt={2} display="flex">
      <Box flex={1}>
        <Card>
          <CardHeader
            title={PositionIteratorInfo2(position)}
            subheader={
              <Typography variant="subtitle2">
                {position.position_description}
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            {positions?.map((pos, idx) => <PositionEditAccordion key={idx} />)}
          </CardContent>
        </Card>
      </Box>
      <OrderAside model={orderModel} linkHandler={linkHandler} link="edit" />
    </Box>
  );
};

// export const PositionEditDialog = () => {
//   const { t } = useTranslation();
//   const [open, setOpen] = useState(true);
//   const [cancelDlg, setCancelDlg] = useState(false);

//   const { positions } = useOrdersSelector(getPositionEdit);
//   const { orders } = useOrdersSelector(getOrderView);

//   const { position, updatePositionInfo } = useDraftPositionData(positions?.[0]);

//   const { save, cancel } = usePositionEditActions(orders[0], position);
//   const { bad_attributes } = useOrdersSelector(getAdditionalPositionsEditData);
//   const { positionErrors, unsetPositionError } =
//     usePositionValidation(bad_attributes);

//   const { positionAttributes } = usePositionAttrModel(
//     updatePositionInfo,
//     position,
//     positionErrors,
//     unsetPositionError,
//     positions?.[0],
//   );
//   const handleCancel = useCallback(() => setCancelDlg(true), []);
//   const handleConfirm = useCallback(() => {
//     setCancelDlg(false);
//     cancel();
//   }, [cancel]);
//   const handleNoConfirm = useCallback(() => setCancelDlg(false), []);

//   return (
//     <Dialog
//       open={open}
//       fullWidth={true}
//       PaperComponent={PaperComponent}
//       aria-labelledby="draggable-dialog-title"
//     >
//       <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
//         Создание новой группы позиций
//       </DialogTitle>
//       <Divider />
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <FieldElement attr={positionAttributes.get("position_name")!} />
//           </Grid>
//           <Grid item xs={6}>
//             <FieldElement attr={positionAttributes.get("color")!} />
//           </Grid>
//           <Grid item xs={6}>
//             <FieldElement attr={positionAttributes.get("model_id")!} />
//           </Grid>
//           <Grid item xs={12}>
//             <FieldElement
//               attr={positionAttributes.get("position_description")!}
//             />
//             <Divider />
//           </Grid>
//           <Grid item xs={6}>
//             <FieldElement attr={positionAttributes.get("container")!} />
//           </Grid>
//           <Grid item xs={6}>
//             <FieldElement attr={positionAttributes.get("status")!} />
//           </Grid>
//           <Grid item xs={6}>
//             <FieldElement attr={positionAttributes.get("count")!} />
//           </Grid>
//           {/* <Grid item xs={6}>
//             <FieldElement attr={positionAttributes.get("plan_delivery_dt")!} />
//           </Grid> */}
//         </Grid>
//       </DialogContent>
//       <Divider />
//       <DialogActions>
//         <Button autoFocus onClick={cancel}>
//           Отмена
//         </Button>
//         <Button onClick={save}>Редактировать</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default function OrderEdit() {
//   const [open, setOpen] = useState(true);
//   const [cancelDlg, setCancelDlg] = useState(false);
//   const { bad_attributes } = useOrdersSelector(getAdditionalOrderEditData);

//   const { order, updateOrderInfo } = useEditedOrderData();

//   const { orderErrors, unsetOrderError } = useOrderValidation(bad_attributes);

//   const { save: handleOrderSave, close: handleOrderClose } =
//     useOrderEditActions(order, []);

//   const { attributesModel } = useOrderEditAttributes(
//     updateOrderInfo,
//     order,
//     orderErrors,
//     unsetOrderError,
//   );

//   return (
//     <Dialog
//       open={open}
//       fullWidth={true}
//       PaperComponent={PaperComponent}
//       aria-labelledby="draggable-dialog-title"
//     >
//       <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
//         Редактирование заказа
//       </DialogTitle>
//       <Divider />
//       <DialogContent>
//         <Grid container spacing={2}>
//           <FieldElement attr={attributesModel.get("order_name")!} />

//           <FieldElement attr={attributesModel.get("order_manager")!} />

//           <FieldElement attr={attributesModel.get("description")!} />
//         </Grid>
//       </DialogContent>
//       <Divider />
//       <DialogActions>
//         <Button autoFocus onClick={handleOrderClose}>
//           Отмена
//         </Button>
//         <Button onClick={handleOrderSave}>Редактировать</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

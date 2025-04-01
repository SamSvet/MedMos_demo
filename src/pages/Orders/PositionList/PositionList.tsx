import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useOrdersSelector } from "../../../store/orders-store";
import {
  getAdditionalPositionListData,
  getPositionList,
  getPositionListView,
  getPositionListViewSingle,
} from "../../../selectors/orders/position-list-selectors";
import {
  getAdditionalOrderViewData,
  getOrderView,
} from "../../../selectors/orders/order-view-selectors";
import { useDraftPositionData } from "../common/hooks/useDraftPositionData";
import { useOrderValidation } from "../common/hooks/useOrderValidation";
import { useOrderViewAttributes } from "../OrderShow/OrderShow.models";
import { OrderAside } from "../common/components/OrderAside/OrderAside";
import { useOrderShowActions } from "../OrderShow/hooks/useOrderShowActions";
import { getPositionEdit } from "../../../selectors/orders/position-edit-selectors";
import { PositionInfoModel } from "../../../api/shared/position-info";
import { ColorBox } from "../../../components/ColorBox/ColorBox";
import { PositionIteratorInfo2 } from "../OrderShow/PositionIterator";
import { useGetOrderDictionaries } from "../common/hooks/useGetOrderDictionaries";
import { PositionTable } from "./PositionTable";
import { useEffect } from "react";

export const PositionList = () => {
  const { positions } = useOrdersSelector(getPositionList);

  const { positions: positionsView } = useOrdersSelector(
    getPositionListViewSingle,
  );

  const { orders } = useOrdersSelector(getOrderView);
  const { filter_data, screen_data } = useOrdersSelector(
    getAdditionalPositionListData,
  );
  const { bad_attributes: orderBadAttributes } = useOrdersSelector(
    getAdditionalOrderViewData,
  );
  const { showEdit: linkHandler } = useOrderShowActions(
    orders[0],
    positionsView || [],
  );
  const { orderErrors } = useOrderValidation(orderBadAttributes);
  const orderModel = useOrderViewAttributes(orders[0], orderErrors);

  return (
    <Box mt={2} display="flex">
      <Box flex={1}>
        <PositionTable positions={positions} />
      </Box>
      <OrderAside model={orderModel} linkHandler={linkHandler} link="edit" />
    </Box>
  );
};

// <Card>
//   <CardHeader
//     title={PositionIteratorInfo2(positionsView?.[0])}
//     subheader={
//       <Typography variant="subtitle2">
//         {positionsView?.[0].position_description}
//       </Typography>
//     }
//   />
//   <Divider />
//   <CardContent></CardContent>
// </Card>;

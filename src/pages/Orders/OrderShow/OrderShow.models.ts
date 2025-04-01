import { useMemo, useCallback } from "react";
import { ListItem } from "../../../api/shared/common/list-item";
import {
  PositionInfo,
  PositionInfoViewModel,
} from "../../../api/shared/position-info";
import { getCurrentRefBooks } from "../../../selectors/orders/common-order-selectors";
import { useOrdersSelector } from "../../../store/orders-store";
import { ValueType } from "../common/components/PositionAttributes/PositionAttributes.interfaces";
import { PositionAttrError } from "../common/interfaces/position-errors";
import { usePositionAttributesModel } from "../common/models/position-attributes-model";
import { OrderInfo, OrderInfoViewModel } from "../../../api/shared/order-info";
import { OrderAttrError } from "../common/interfaces/order-errors";
import { useOrderAttributesModel } from "../common/models/order-attributes-model";

// export const usePositionAttrModel = (
//   updatePositionInfo: (
//     updatedPosition: Partial<PositionInfo<ListItem>>,
//   ) => void,
//   position: PositionInfoViewModel,
//   positionErrors: PositionAttrError | null,
//   unsetPositionError: (fieldName: keyof PositionInfo<ListItem>) => void,
// ) => {
//   const { dct_container } = useOrdersSelector(getCurrentRefBooks);

//   const notDeletableOptions = useMemo(() => {
//     return {
//       dct_container: dct_container?.filter((x) =>
//         position.container?.map((c) => c.id).includes(x.internal_code),
//       ),
//     };
//   }, [dct_container, position.container]);

//   const getUpdateFunction = useCallback(
//     (attrName: keyof PositionInfo) => (val: ValueType) => {
//       unsetPositionError(attrName);
//       return updatePositionInfo({
//         [attrName]: val,
//       });
//     },
//     [unsetPositionError, updatePositionInfo],
//   );

//   const fieldsConstraints = useMemo(() => {
//     return {
//       position_name: { readOnly: false, required: false },
//       color: { required: true, readOnly: true },
//       description: { required: true, readOnly: false },
//       model_id: { required: true, readOnly: true },
//       count: { required: true, readOnly: true },
//       container: { required: false, readOnly: true },
//       status: { required: true, readOnly: true },
//     };
//   }, []);

//   const positionAttributes = usePositionAttributesModel(
//     position,
//     positionErrors,
//     fieldsConstraints,
//     getUpdateFunction,
//     notDeletableOptions,
//   );

//   const positionAttrModel = useMemo(() => {
//     return [
//       [
//         positionAttributes.get("position_name")!,
//         positionAttributes.get("color")!,
//         positionAttributes.get("status")!,
//         positionAttributes.get("count")!,
//         positionAttributes.get("model_id")!,
//         positionAttributes.get("container")!,
//       ],
//       [positionAttributes.get("position_description")!],
//     ];
//   }, [positionAttributes]);

//   return { positionAttrModel, positionAttributes };
// };

export const useOrderViewAttributes = (
  order: OrderInfoViewModel,
  orderErrors: OrderAttrError | null,
) => {
  const fieldsConstraints = useMemo<{
    [key in keyof OrderInfo]: {
      required: boolean;
      readOnly: boolean;
    };
  }>(() => {
    return {
      order_name: { required: false, readOnly: true },
      order_manager: { required: false, readOnly: true },
      description: { required: false, readOnly: true },
    };
  }, []);

  const attributesModel = useOrderAttributesModel(
    order,
    orderErrors,
    fieldsConstraints,
  );

  return attributesModel;
};

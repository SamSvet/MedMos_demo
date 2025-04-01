import { useMemo, useCallback } from "react";
import { ListItem } from "../../../api/shared/common/list-item";
import {
  PositionInfo,
  PositionInfoViewModel,
} from "../../../api/shared/position-info";
import { getCurrentRefBooks } from "../../../selectors/orders/common-order-selectors";
import { useOrdersSelector } from "../../../store/orders-store";
import {
  IPositionAttrBase,
  ValueType,
} from "../common/components/PositionAttributes/PositionAttributes.interfaces";
import { PositionAttrError } from "../common/interfaces/position-errors";
import { usePositionAttributesModel } from "../common/models/position-attributes-model";
import { ContainerItem } from "../../../api/shared/common/container";

export const usePositionCreateAttributes = (
  updatePositionInfo: (
    updatedPosition: Partial<PositionInfo<ListItem>>,
  ) => void,
  position: PositionInfoViewModel,
  positionErrors: PositionAttrError | null,
  unsetPositionError: (fieldName: keyof PositionInfo<ListItem>) => void,
) => {
  const getUpdateFunction = useCallback(
    (attrName: keyof PositionInfo) => (val: ValueType) => {
      if (attrName === "container") {
        unsetPositionError(attrName);
        return updatePositionInfo({
          [attrName]: val !== null ? [val as ContainerItem] : [],
        });
      }
      unsetPositionError(attrName);
      return updatePositionInfo({
        [attrName]: val,
      });
    },
    [unsetPositionError, updatePositionInfo],
  );

  // const getUpdateFunction = useCallback(
  //   (attrName: keyof PositionInfo) => (val: ValueType) => {
  //     if (attrName === "container") {
  //       unsetPositionError(attrName);
  //       return updatePositionInfo({
  //         [attrName]: val !== null ? [val as ListItem] : [],
  //       });
  //     }
  //   if (attrName === "is_model") {
  //     unsetScenarioError("is_model");
  //     updateScenarioInfo({
  //       is_model: Boolean(val),
  //       model_cd: [],
  //     });
  //     return;
  //   }
  //     unsetPositionError(attrName);
  //     return updatePositionInfo({
  //       [attrName]: val,
  //     });
  //   },
  //   [unsetPositionError, updatePositionInfo],
  // );

  const fieldsConstraints = useMemo(() => {
    return {
      position_name: { required: true, readOnly: false, variant: "filled" },
      color: { required: true, readOnly: false, variant: "filled" },
      position_description: {
        required: true,
        readOnly: false,
        variant: "filled",
      },
      model_id: { required: true, readOnly: false, variant: "filled" },
      count: {
        required: true,
        minValue: 1,
        maxValue: 10000,
        variant: "filled",
      },
      container: {
        required: false,
        variant: "filled",
      },
      status: {
        required: false,
        readOnly: true,
        disabled: true,
        variant: "filled",
        errorText: "Не доступно для выбора",
      },
      plan_delivery_dt: { required: false, variant: "filled" },
    };
  }, []);

  const positionAttributes = usePositionAttributesModel(
    position,
    positionErrors,
    fieldsConstraints,
    getUpdateFunction,
  );

  const positionAttrModel = useMemo<IPositionAttrBase[][]>(() => {
    return [
      [
        positionAttributes.get("position_name")!,
        positionAttributes.get("color")!,
        positionAttributes.get("model_id")!,
        positionAttributes.get("count")!,
        positionAttributes.get("container")!,
        positionAttributes.get("status")!,
      ],
      [positionAttributes.get("position_description")!],
    ];
  }, [positionAttributes]);

  return { positionAttrModel, positionAttributes };
};

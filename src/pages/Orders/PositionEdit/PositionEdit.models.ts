import { useMemo, useCallback, useEffect } from "react";
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
import { ContainerItem } from "../../../api/shared/common/container";

export const usePositionAttrModel = (
  updatePositionInfo: (
    updatedPosition: Partial<PositionInfo<ListItem>>,
  ) => void,
  position: PositionInfoViewModel,
  positionErrors: PositionAttrError | null,
  unsetPositionError: (fieldName: keyof PositionInfo<ListItem>) => void,
  basePosition?: PositionInfoViewModel,
) => {
  const { dct_color, dct_model, dct_status } =
    useOrdersSelector(getCurrentRefBooks);

  // const notDeletableOptions = useMemo(() => {
  //   return {
  //     dct_color: dct_color?.filter(
  //       (x) => position.color?.internal_code === x.internal_code,
  //     ),
  //      dct_container: dct_container?.filter((x) =>
  //        position.container?.map((x) => x.id).includes(x.internal_code),
  //      ),
  //     dct_model: dct_model?.filter(
  //       (x) => position.model_id?.internal_code === x.internal_code,
  //     ),
  //     dct_status: dct_status?.filter(
  //       (x) => position.status?.internal_code === x.internal_code,
  //     ),
  //   };
  // }, [dct_color, dct_model, dct_status, position.color?.internal_code, position.model_id?.internal_code, position.status?.internal_code]);

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
  //     unsetPositionError("is_model");
  //     updatePositionInfo({
  //       is_model: val as boolean,
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
      position_name: {
        readOnly: true,
        required: false,
        variant: "filled",
        disabled: true,
      },
      color: {
        readOnly: true,
        required: false,
        variant: "filled",
        disabled: true,
      },
      position_description: {
        readOnly: true,
        required: false,
        disabled: true,
        variant: "filled",
      },
      model_id: {
        readOnly: true,
        required: false,
        disabled: true,
        variant: "filled",
      },
      count: {
        readOnly: false,
        required: false,
        variant: "filled",
        minValue: 1,
        maxValue: basePosition?.count,
      },

      container: { readOnly: false, required: false, variant: "filled" },
      status: { readOnly: false, required: false, variant: "filled" },
    };
  }, [basePosition?.count]);

  const positionAttributes = usePositionAttributesModel(
    position,
    positionErrors,
    fieldsConstraints,
    getUpdateFunction,
    basePosition,
  );

  // (val: ValueType) => {
  //   unsetScenarioError("is_model");
  //   updateScenarioInfo({
  //     is_model: val as boolean,
  //     model_cd: [],
  //   });
  // }

  const positionsAttrModel = useMemo(() => {
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

  return { positionsAttrModel, positionAttributes };
};

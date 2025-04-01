import { useMemo, useCallback } from "react";
import { ListItem } from "../../../api/shared/common/list-item";
import {
  PositionInfo,
  PositionInfoViewModel,
} from "../../../api/shared/position-info";
import {
  AttrType,
  ValueType,
} from "../common/components/PositionAttributes/PositionAttributes.interfaces";
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
        readOnly: true,
        required: false,
        variant: "filled",
        disabled: true,
        minValue: 1,
        maxValue: basePosition?.count,
      },
      reserved_count: {
        required: true,
        variant: "filled",
        minValue: 1,
        maxValue: basePosition?.count || 0,
      },

      container: {
        required: false,
        variant: "filled",
        disabled: true,
      },
      status: {
        readOnly: true,
        required: false,
        variant: "filled",
        disabled: true,
        type: AttrType.TextStatic,
      },
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

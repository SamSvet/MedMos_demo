import { PositionField } from "../../../../api/shared/mappers/orders-interfaces";

export type PositionAttrError = {
  [key in PositionField]?: { isError: boolean; errorText?: string };
};

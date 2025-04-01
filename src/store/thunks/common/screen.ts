import { NavigateFunction } from "react-router-dom";
import { screenSlice } from "../../slices/common/screen-slice";
import { ScreenCode } from "../../../api/shared/common/screen-code.enum";
import { SCREEN_MAPPING } from "../../../api/shared/common/screen-mapping";
import { OrdersDispatch } from "../../orders-store";
import { ScreenAdditionParam } from "./dispatch-utils";
import {
  OrdersField,
  PositionField,
} from "../../../api/shared/mappers/orders-interfaces";

export const setScreen =
  (
    screenCode: ScreenCode | null,
    navigate?: NavigateFunction | null,
    replacement?: ScreenAdditionParam,
  ) =>
  (dispatch: OrdersDispatch) => {
    dispatch(screenSlice.actions.setScreenCode(screenCode));
    if (screenCode && navigate) {
      const screenCodeResolved = replacement
        ? SCREEN_MAPPING[screenCode].replace(/\${(\w+)}/g, (match, p1) => {
            return replacement[p1 as OrdersField | PositionField] || match;
          })
        : SCREEN_MAPPING[screenCode];
      navigate(screenCodeResolved, { replace: true });
    }
  };

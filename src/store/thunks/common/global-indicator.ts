import { globalIndicator } from "../../slices/common/global-indicator";
import { OrdersDispatch } from "../../orders-store";

export interface Indicator {
  showIndicator(): void;

  hideIndicator(): void;
}

export interface IndicatorFactory {
  create(dispatch: OrdersDispatch): Indicator;
}

export const globalIndicatorFactory: IndicatorFactory = {
  create(dispatch: OrdersDispatch) {
    let isShowed: boolean = false;

    const showIndicator = () => {
      dispatch(globalIndicator.actions.show(""));
      isShowed = true;
    };
    const hideIndicator = () => {
      if (isShowed) {
        dispatch(globalIndicator.actions.hide(""));
      }
    };
    return { showIndicator, hideIndicator };
  },
};

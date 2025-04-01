import { getScreenCode } from "../../../selectors/screen-selectors";
import { ApiResponse } from "../../../api/shared/common/api-response";
import { MainLayoutData } from "../../../api/shared/common/main-layout-data";
import { ScreenCode } from "../../../api/shared/common/screen-code.enum";
import { DeltaAction } from "../../../api/shared/common/delta-action.enum";
import { BadAttributesMap } from "../../../api/shared/common/bad-attributes-map";
import {
  CommonDataSlice,
  CommonDataState,
} from "../../slices/common/common-data";
import {
  CommonDeltaSlice,
  CommonDeltaState,
} from "../../slices/common/common-delta";
import { OrdersDispatch, OrdersRootState } from "../../orders-store";
import { orderListData } from "../../slices/order-list-data";
import { orderListDelta } from "../../slices/order-list-delta";
import { positionsListData } from "../../slices/positions-list-data";
import { positionsListDelta } from "../../slices/positions-list-delta";
import { orderCreateData } from "../../slices/order-create-data";
import { orderCreateDelta } from "../../slices/order-create-delta";
import { orderEditData } from "../../slices/order-edit-data";
import { orderEditDelta } from "../../slices/order-edit-delta";
import { orderViewData } from "../../slices/order-view-data";
import { orderViewDelta } from "../../slices/order-view-delta";
import { positionsCreateData } from "../../slices/positions-create-data";
import { positionsCreateDelta } from "../../slices/positions-create-delta";
import { positionsEditData } from "../../slices/positions-edit-data";
import { positionsEditDelta } from "../../slices/positions-edit-delta";
import { positionsReserveData } from "../../slices/positions-reserve-data";
import { positionsReserveDelta } from "../../slices/positions-reserve-delta";

interface Slices<A extends CommonDataState, B extends CommonDeltaState> {
  data: CommonDataSlice<A>;
  delta: CommonDeltaSlice<B>;
}

const createMapEntry = <A extends CommonDataState, B extends CommonDeltaState>(
  screen: ScreenCode,
  data: CommonDataSlice<A>,
  delta: CommonDeltaSlice<B>,
): [ScreenCode, Slices<CommonDataState, CommonDeltaState>] => [
  screen,
  { data, delta } as unknown as Slices<CommonDataState, CommonDeltaState>,
];

const SCREEN_SLICE_MAP: Map<
  ScreenCode,
  Slices<CommonDataState, CommonDeltaState>
> = new Map<ScreenCode, Slices<CommonDataState, CommonDeltaState>>([
  createMapEntry(ScreenCode.ORDERS_LIST, orderListData, orderListDelta),
  createMapEntry(ScreenCode.ORDERS_CREATE, orderCreateData, orderCreateDelta),
  createMapEntry(ScreenCode.ORDERS_EDIT, orderEditData, orderEditDelta),
  createMapEntry(ScreenCode.ORDERS_VIEW, orderViewData, orderViewDelta),
  createMapEntry(ScreenCode.ORDERS_SHOW, orderViewData, orderViewDelta),
  createMapEntry(
    ScreenCode.POSITIONS_LIST,
    positionsListData,
    positionsListDelta,
  ),
  createMapEntry(
    ScreenCode.POSITIONS_CREATE,
    positionsCreateData,
    positionsCreateDelta,
  ),
  createMapEntry(
    ScreenCode.POSITIONS_EDIT,
    positionsEditData,
    positionsEditDelta,
  ),
  createMapEntry(
    ScreenCode.POSITIONS_RESERVE,
    positionsReserveData,
    positionsReserveDelta,
  ),
]);

export const updateData =
  (response: ApiResponse<MainLayoutData>) =>
  (dispatch: OrdersDispatch, getStore: () => OrdersRootState) => {
    const screen = getScreenCode(getStore());

    const actions =
      (screen && SCREEN_SLICE_MAP.get(screen)?.data?.actions) || undefined;

    if (actions) {
      dispatch(actions.fill(response));
    }
  };

export const updateDelta =
  (response: ApiResponse<MainLayoutData>) =>
  (dispatch: OrdersDispatch, getStore: () => OrdersRootState) => {
    const { delta_action } = response;

    if (!delta_action) {
      return;
    }

    const screen = getScreenCode(getStore());
    const actions =
      (screen && SCREEN_SLICE_MAP.get(screen)?.delta?.actions) || undefined;

    const { override, merge } = actions || {};

    if (delta_action === DeltaAction.override && override) {
      dispatch(override(response));
    }

    if (delta_action === DeltaAction.merge && merge) {
      dispatch(merge(response));
    }
  };

export const setBadAttributes =
  (bad_attributes: BadAttributesMap) =>
  (dispatch: OrdersDispatch, getStore: () => OrdersRootState) => {
    const screen = getScreenCode(getStore());
    const actions =
      (screen && SCREEN_SLICE_MAP.get(screen)?.data?.actions) || undefined;

    if (actions) {
      dispatch(actions.setBadAttributes(bad_attributes));
    }
  };

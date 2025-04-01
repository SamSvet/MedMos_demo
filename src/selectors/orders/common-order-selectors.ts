import { ScreenCode } from "../../api/shared/common/screen-code.enum";
import { TagItem } from "../../api/shared/common/tags";
import { TeamItem } from "../../api/shared/common/teams";
import { UserItem } from "../../api/shared/common/users";
import { OrdersRootState } from "../../store/orders-store";
import {
  getOrderCreateDataState,
  getAdditionalOrderCreateData,
  getOrderCreate,
} from "./order-create-selectors";
import {
  getOrderEditDataState,
  getAdditionalOrderEditData,
  getOrderEdit,
} from "./order-edit-selectors";
import { getOrderListDataState } from "./order-list-selectors";
import {
  getOrderViewDataState,
  getAdditionalOrderViewData,
  getOrderView,
} from "./order-view-selectors";
import {
  getAdditionalPositionsCreateData,
  getPositionCreate,
} from "./position-create-selectors";
import {
  getPositionsEditDataState,
  getAdditionalPositionsEditData,
  getPositionEdit,
} from "./position-edit-selectors";
import { getOrdersApprovalDataState } from "./orders-approval-selectors";
import { getRefbooks } from "./order-selectors-helpers";
import { ContainerItem } from "../../api/shared/common/container";

export const getCurrentRefBooks = (state: OrdersRootState) => {
  switch (state.screen.code) {
    case ScreenCode.ORDERS_LIST:
      return getRefbooks(getOrderListDataState(state).data);
    case ScreenCode.ORDERS_CREATE:
      return getRefbooks(getOrderCreateDataState(state).data);
    case ScreenCode.ORDERS_EDIT:
      return getRefbooks(getOrderEditDataState(state).data);
    case ScreenCode.ORDERS_SHOW:
      return getRefbooks(getOrderViewDataState(state).data);
    case ScreenCode.ORDERS_VIEW:
      return getRefbooks(getOrderViewDataState(state).data);
    case ScreenCode.POSITIONS_LIST:
      return getRefbooks(getPositionsEditDataState(state).data);
    case ScreenCode.POSITIONS_EDIT:
      return getRefbooks(getOrderViewDataState(state).data);
    case ScreenCode.POSITIONS_RESERVE:
      return getRefbooks(getOrderViewDataState(state).data);
    default:
      return {};
  }
};

// export const getCurrentTags = (
//   state: OrdersRootState,
// ): TagItem[] | undefined => {
//   switch (state.screen.code) {
//     case ScreenCode.ORDERS_LIST:
//       return getOrderListDataState(state).data.tags;
//     case ScreenCode.ORDERS_CREATE:
//       return getOrderCreateDataState(state).data.tags;
//     case ScreenCode.POSITIONS_LIST:
//     case ScreenCode.ORDERS_EDIT:
//       return getOrderEditDataState(state).data.tags;
//     case ScreenCode.ORDERS_VIEW:
//       return getOrderViewDataState(state).data.tags;
//     default:
//       return [];
//   }
// };

export const getCurrentUsers = (
  state: OrdersRootState,
): UserItem[] | undefined => {
  switch (state.screen.code) {
    case ScreenCode.ORDERS_LIST:
      return getOrderListDataState(state).data.users;
    case ScreenCode.ORDERS_CREATE:
      return getOrderCreateDataState(state).data.users;
    case ScreenCode.ORDERS_EDIT:
      return getOrderEditDataState(state).data.users;
    case ScreenCode.ORDERS_VIEW:
      return getOrderViewDataState(state).data.users;
    case ScreenCode.POSITIONS_LIST:
      return getPositionsEditDataState(state).data.users;
    default:
      return [];
  }
};

export const getCurrentContainers = (
  state: OrdersRootState,
): ContainerItem[] | undefined => {
  switch (state.screen.code) {
    case ScreenCode.ORDERS_LIST:
      return getOrderListDataState(state).data.containers;
    case ScreenCode.ORDERS_CREATE:
      return getOrderCreateDataState(state).data.containers;
    case ScreenCode.ORDERS_EDIT:
      return getOrderEditDataState(state).data.containers;
    case ScreenCode.ORDERS_VIEW:
      return getOrderViewDataState(state).data.containers;
    case ScreenCode.POSITIONS_LIST:
      return getPositionsEditDataState(state).data.containers;
    default:
      return [];
  }
};

// export const getCurrentTeams = (
//   state: OrdersRootState,
// ): TeamItem[] | undefined => {
//   switch (state.screen.code) {
//     case ScreenCode.ORDERS_LIST:
//       return getOrderListDataState(state).data.teams;
//     case ScreenCode.ORDERS_CREATE:
//       return getOrderCreateDataState(state).data.teams;
//     case ScreenCode.ORDERS_EDIT:
//       return getOrderEditDataState(state).data.teams;
//     case ScreenCode.ORDERS_VIEW:
//       return getOrderViewDataState(state).data.teams;
//     case ScreenCode.POSITIONS_LIST:
//       return getPositionsEditDataState(state).data.teams;
//     default:
//       return [];
//   }
// };

export const getAdditionalPositionsData = (screenCode: ScreenCode) => {
  switch (screenCode) {
    case ScreenCode.POSITIONS_LIST:
      return getAdditionalPositionsCreateData;
    default:
      return getAdditionalPositionsEditData;
  }
};

export const getAdditionalOrderData = (screenCode: ScreenCode) => {
  switch (screenCode) {
    case ScreenCode.ORDERS_EDIT:
      return getAdditionalOrderEditData;
    case ScreenCode.ORDERS_CREATE:
      return getAdditionalOrderCreateData;
    default:
      // ScreenCode.CAMPAIGNS_VIEW
      return getAdditionalOrderViewData;
  }
};

export const getOrder = (screenCode: ScreenCode) => {
  switch (screenCode) {
    case ScreenCode.ORDERS_CREATE:
      return getOrderCreate;
    case ScreenCode.ORDERS_EDIT:
      return getOrderEdit;
    case ScreenCode.ORDERS_VIEW:
    default:
      return getOrderView;
  }
};

export const getPosition = (screenCode: ScreenCode) => {
  switch (screenCode) {
    case ScreenCode.POSITIONS_LIST:
      return getPositionCreate;
    case ScreenCode.ORDERS_EDIT:
    default:
      return getPositionEdit;
  }
};

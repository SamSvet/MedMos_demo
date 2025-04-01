import { OrderRefBooks } from "../order-ref-books";
import { DataItem } from "../common/response-data";
import { UserItem } from "../common/users";
import { dateToStr, strToDate } from "../../../utils/date-utils";
import {
  OrdersFilterDataModel,
  OrdersFilterDataViewModel,
} from "../orders-filter-data";
import {
  OrderInfo,
  OrderInfoModel,
  TableModel,
  OrderPosModel,
} from "../order-info";
import {
  PositionInfo,
  PositionInfoModel,
  PositionInfoViewModel,
} from "../position-info";
import { OrdersSortDataModel, OrdersSortDataModel2 } from "../orders-sort-data";
import { MRT_SortingState } from "material-react-table";
import { NestedKeyOf } from "../../../utils/generic-types";
import { positionModelToViewModel } from "./order-mappers";
import { ContainerItem } from "../common/container";

const orderSingleModelToModel = (
  order: OrderInfoModel,
  users?: DataItem<UserItem>,
): OrderInfoModel => ({
  ...order,

  order_manager: (() => {
    const foundUser = users?.find((item) => order.order_manager === item.id);
    return foundUser
      ? [foundUser.last_name, foundUser.first_name, foundUser.middle_name]
          .filter(Boolean)
          .join(" ")
      : null;
  })(),
  created_by: (() => {
    const foundUser = users?.find((item) => order.created_by === item.id);
    return foundUser
      ? [foundUser.last_name, foundUser.first_name, foundUser.middle_name]
          .filter(Boolean)
          .join(" ")
      : null;
  })(),
  updated_by: (() => {
    const foundUser = users?.find((item) => order.updated_by === item.id);
    return foundUser
      ? [foundUser.last_name, foundUser.first_name, foundUser.middle_name]
          .filter(Boolean)
          .join(" ")
      : null;
  })(),
});

const positionModelToModel = <T extends Partial<PositionInfoModel>>(
  position: T,
  refBooks: OrderRefBooks,
  containers?: DataItem<ContainerItem>,
): PositionInfoModel => ({
  position_id: position.position_id || undefined,
  order_id: position.order_id || null,
  position_name: position.position_name || null,
  color:
    refBooks.dct_color?.find((item) =>
      position.color?.includes(item.internal_code),
    )?.name || null,
  position_description: position.position_description || null,
  model_id:
    refBooks.dct_model?.find((item) =>
      position.model_id?.includes(item.internal_code),
    )?.name || null,
  count: position.count || null,
  reserved_count: position.reserved_count || null,
  status:
    refBooks.dct_status?.find((item) =>
      position.status?.includes(item.internal_code),
    )?.name || null,

  container:
    containers
      ?.filter((c) => position.container?.includes(c.id))
      .map((c) => c.name) || [],
  // container:
  //   refBooks.dct_container
  //     ?.filter((item) => position.container?.includes(item.internal_code))
  //     .map((container) => container.name) || [],
  position_item_id: position.position_item_id || null,
  //plan_delivery_dt: position.plan_delivery_dt,
});

// const containerModelToTableModel = <T extends Partial<PositionInfoModel>>(
//   position: T,
//   containers?: DataItem<ContainerItem>,
// ): ContainerItem => ({
//   id: (() => {
//     const foundUser = users?.find((item) => order.updated_by === item.id);
//     return foundUser
//       ? [foundUser.last_name, foundUser.first_name, foundUser.middle_name]
//           .filter(Boolean)
//           .join(" ")
//       : null;
//   })(),
// });

export const positionListModelToModel = (
  positionList: PositionInfoModel[] = [],
  refBooks: OrderRefBooks,
): PositionInfoModel[] =>
  positionList.map((pos) => positionModelToModel(pos, refBooks));

export const positionListModelToViewModel = (
  positionList: PositionInfoModel[] = [],
  refBooks: OrderRefBooks,
): PositionInfoViewModel[] =>
  positionList.map((pos) => positionModelToViewModel(pos, refBooks));

export const orderListModelToViewModel = (
  orderList: OrderInfoModel[] = [],
  users?: DataItem<UserItem>,
): OrderInfoModel[] =>
  orderList.map((order) => orderSingleModelToModel(order, users));

export const orderListPosModelToViewModel = (
  orderList: OrderPosModel[] = [],
  refBooks: OrderRefBooks,
  users?: DataItem<UserItem>,
  containers?: DataItem<ContainerItem>,
): OrderPosModel[] => {
  return orderList.flatMap((el) => ({
    order: { ...orderSingleModelToModel(el.order, users) },
    position: { ...positionModelToModel(el.position, refBooks, containers) },
  }));
};

export const orderListPosModelToTableModel = (
  orderList: OrderPosModel[] = [],
  refBooks: OrderRefBooks,
  users?: DataItem<UserItem>,
  containers?: DataItem<ContainerItem>,
): TableModel[] => {
  return orderList.flatMap((el) => ({
    order: { ...orderSingleModelToModel(el.order, users) },
    position: { ...positionModelToModel(el.position, refBooks, containers) },
    // container: { ...containerModelToTableModel(el.position, containers) },
    container: containers?.find((cont) =>
      el.position.container?.includes(cont.id),
    ) || { id: "", plan_delivery_dt: "", name: "" },
  }));
};

export const orderListPosModelToViewModelOld = (
  orderList: OrderInfoModel[] = [],
  positionList: PositionInfoModel[] = [],
  refBooks: OrderRefBooks,
  users?: DataItem<UserItem>,
  containers?: DataItem<ContainerItem>,
): OrderPosModel[] => {
  return orderList.flatMap((order) =>
    positionList
      .filter((pos) => pos.order_id === order.order_id)
      .map((position) => ({
        order: {
          ...orderSingleModelToModel(order, users),
        },
        position: {
          ...position,
          order_id: position.order_id!,
          status:
            refBooks?.dct_status?.find(
              (item) => position.status === item.internal_code,
            )?.name || null,
          container:
            containers
              ?.filter((c) => position.container?.includes(c.id))
              .map((c) => c.name) || [],
          model_id:
            refBooks.dct_model?.find(
              (model) => position.model_id === model.internal_code,
            )?.name || null,
          color:
            refBooks.dct_color?.find(
              (item) => position.color === item.internal_code,
            )?.name || null,
          count: position.count,
        },
      })),
  );
};

// export const orderListPosModelToViewModel2 = (
//   orderList: OrderInfoModel[] = [],
//   positionList: PositionInfoModel[] = [],
//   refBooks: OrderRefBooks,
//   users?: DataItem<UserItem>,
// ): (OrderInfoModel & PositionInfoModel)[] => {
//   return orderList.flatMap((order) =>
//     positionList
//       .filter((pos) => pos.order_id === order.order_id)
//       .map((position) => ({
//         ...position,
//         ...orderSingleModelToViewModel(order, users),
//         order_id: position.order_id!,
//         status:
//           refBooks?.dct_status?.find(
//             (item) => position.status === item.internal_code,
//           )?.name || null,
//         container:
//           refBooks.dct_container
//             ?.filter((item) => position.container?.includes(item.internal_code))
//             .map((container) => container.name) || [],
//         model_id:
//           refBooks.dct_model?.find(
//             (model) => position.model_id === model.internal_code,
//           )?.name || null,
//         color:
//           refBooks.dct_color?.find(
//             (item) => position.color === item.internal_code,
//           )?.name || null,
//         count: position.count,
//       })),
//   );
// };

export const ordersFiltersModelToViewModel = (
  filters: OrdersFilterDataModel,
  refBooks: OrderRefBooks,
  users?: DataItem<UserItem>,
  containers?: DataItem<ContainerItem>,
): OrdersFilterDataViewModel => {
  return {
    ...filters,
    orders: {
      order_name: filters.orders?.order_name,
      order_manager:
        users?.find &&
        users.find((item) => filters.orders?.order_manager === item.id),
      created: strToDate(filters.orders?.created),
      updated: strToDate(filters.orders?.updated),
    },
    positions: {
      position_name: filters.positions?.position_name,
      color: refBooks.dct_color?.find(
        (item) => filters.positions?.color === item.internal_code,
      ),
      model_id: refBooks.dct_model?.find(
        (item) => filters.positions?.model_id === item.internal_code,
      ),
      status: refBooks.dct_status?.find(
        (item) => filters.positions?.status === item.internal_code,
      ),
      container:
        containers?.find &&
        containers.find((c) => filters.positions?.container === c.id),
      // container: refBooks.dct_container?.find(
      //   (item) => filters.positions?.container === item.internal_code,
      // ),
      // start_plan_delivery_dt:
      //   strToDate(filters?.positions?.start_plan_delivery_dt) || undefined,
      // end_plan_delivery_dt:
      //   strToDate(filters?.positions?.end_plan_delivery_dt) || undefined,
    },
    containers: {
      start_plan_delivery_dt:
        strToDate(filters?.containers?.start_plan_delivery_dt) || undefined,
      end_plan_delivery_dt:
        strToDate(filters?.containers?.end_plan_delivery_dt) || undefined,
    },
  };
};

export const orderFiltersViewModelToModel = (
  filters: OrdersFilterDataViewModel,
): OrdersFilterDataModel => {
  return {
    ...filters,
    orders: {
      order_name: filters.orders?.order_name,
      order_manager: filters.orders?.order_manager?.id,
      created: dateToStr(filters?.orders?.created),
      updated: dateToStr(filters?.orders?.updated),
    },

    positions: {
      position_name: filters.positions?.position_name,
      color: filters.positions?.color?.internal_code,
      container: filters.positions?.container?.id,
      model_id: filters.positions?.model_id?.internal_code,
      status: filters.positions?.status?.internal_code,
    },
    containers: {
      start_plan_delivery_dt: dateToStr(
        filters.containers?.start_plan_delivery_dt,
      ),
      end_plan_delivery_dt: dateToStr(filters.containers?.end_plan_delivery_dt),
    },
  };
};

export const orderSortViewModelToModel = (
  sort: MRT_SortingState,
): OrdersSortDataModel => {
  return sort.map((el) => ({
    desc: el.desc,
    id: el.id as NestedKeyOf<OrderPosModel>,
  }));
};

export const orderSortViewModelToModel2 = (
  sort: MRT_SortingState,
): OrdersSortDataModel2 => {
  return sort.reduce((group, el, index) => {
    const [entity, key] = el.id.split(".");
    group[entity as keyof OrdersSortDataModel2] =
      group[entity as keyof OrdersSortDataModel2] ?? [];

    group[entity as keyof OrdersSortDataModel2].push({
      [key as keyof (OrderInfo & PositionInfo)]: {
        index: index,
        desc: el.desc,
      },
    });
    return group;
  }, {} as OrdersSortDataModel2);
};

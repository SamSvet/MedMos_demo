import { dateToStr, strToDate } from "../../../utils/date-utils";
import { OrderInfoModel, OrderInfoViewModel } from "../order-info";
import {
  PositionInfo,
  PositionInfoModel,
  PositionInfoViewModel,
} from "../position-info";
import { OrderRefBooks } from "../order-ref-books";
import { OrderDataViewModel } from "../order-data";
import { UserItem } from "../common/users";
import { DataItem } from "../common/response-data";
import { ContainerItem } from "../common/container";

export const positionViewModelToModel = <
  T extends Partial<PositionInfo> = Partial<PositionInfo>,
>(
  position: T,
) => ({
  position_id: position.position_id || undefined,
  order_id: position.order_id || null,
  position_name: position.position_name || null,
  color: position.color?.internal_code || null,
  position_description: position.position_description || null,
  model_id: position.model_id?.internal_code || null,
  count: position.count || null,
  reserved_count: position.reserved_count || null,
  container: position.container?.map((c) => c.id) || [],
  // plan_delivery_dt: dateToStr(position.plan_delivery_dt, true),
  status: position.status?.internal_code || null,
  position_item_id: position.position_item_id || null,
});

export const positionModelToViewModel = <T extends Partial<PositionInfoModel>>(
  position: T,
  refBooks: OrderRefBooks,
  containers?: DataItem<ContainerItem>,
): PositionInfoViewModel => {
  return {
    position_id: position.position_id || undefined,
    order_id: position.order_id || null,
    position_name: position.position_name || null,
    color:
      refBooks.dct_color?.find(
        (item) => position.color === item.internal_code,
      ) || null,
    position_description: position.position_description || null,
    model_id:
      refBooks.dct_model?.find(
        (item) => position.model_id === item.internal_code,
      ) || null,
    count: position.count || null,
    reserved_count: position.reserved_count || null,
    status: refBooks.dct_status?.find(
      (item) => position.status === item.internal_code,
    ),
    container:
      containers?.filter((item) => position.container?.includes(item.id)) || [],
    position_item_id: position.position_item_id || null,
    // plan_delivery_dt: strToDate(position.plan_delivery_dt)!,
  };
};

export const orderModelToViewModel = (
  order: OrderInfoModel,
  positions: PositionInfo<string, string>[],
  refBooks: OrderRefBooks,
  users?: DataItem<UserItem>,
  containers?: DataItem<ContainerItem>,
): OrderDataViewModel => {
  const orderInfo: OrderInfoViewModel = {
    ...order,

    order_manager:
      users?.find((item) => order.order_manager === item.id) || null,
    created: strToDate(order.created),
    updated: strToDate(order.updated),
    locked_till: strToDate(order.locked_till),
  };

  const positionsInfo: PositionInfo[] = positions.map((position) =>
    positionModelToViewModel(position, refBooks, containers),
  );

  return {
    orders: [orderInfo],
    positions: positionsInfo,
  };
};

export const orderOneViewModelToModel = <
  T extends OrderInfoViewModel = OrderInfoViewModel,
>(
  order: Partial<T>,
) => {
  return {
    order_id: order.order_id,
    order_name: order.order_name || null,
    order_manager: order.order_manager?.id || null,
    description: order.description || null,
    created: dateToStr(order.created) || null,
    created_by: order.created_by || null,
    updated: dateToStr(order.updated) || null,
    updated_by: order.updated_by || null,
  };
};

export const orderViewModelToModel = (
  order: OrderInfoViewModel,
  positions?: PositionInfo[],
): {
  order: OrderInfoModel;
  positions: PositionInfo<string, string>[] | undefined;
} => {
  const orderInfo: OrderInfoModel = {
    order_id: order.order_id,
    order_name: order.order_name,
    order_manager: order.order_manager?.id || null,
    description: order.description,
    created: dateToStr(order.created),
    created_by: order.created_by,
    updated: dateToStr(order.updated),
    updated_by: order.updated_by,
  };

  const positionsInfo: PositionInfo<string, string>[] | undefined =
    positions?.map((position) => ({
      position_id: position.position_id,
      order_id: position.order_id || null,
      position_name: position.position_name || null,
      color: position.color?.internal_code || null,
      position_description: position.position_description || null,
      model_id: position.model_id?.internal_code || null,
      count: position.count || null,
      reserved_count: position.reserved_count || null,
      container: position.container?.map((el) => el.id) || [],
      status: position.status?.internal_code,
      position_item_id: position.position_item_id || null,
      // plan_delivery_dt: dateToStr(position.plan_delivery_dt!),
    }));

  return {
    order: orderInfo,
    positions: positionsInfo,
  };
};

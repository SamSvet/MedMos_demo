import { OrderInfoModel } from "../../api/shared/order-info";
import { OrderRefBooks } from "../../api/shared/order-ref-books";
import { MainLayoutData } from "../../api/shared/common/main-layout-data";
import { Directory } from "../../api/shared/directory.enum";
import { orderModelToViewModel } from "../../api/shared/mappers/order-mappers";
import { PositionInfo } from "../../api/shared/position-info";
import { OrderCreateDataState } from "../../store/slices/order-create-data";
import { OrderEditDataState } from "../../store/slices/order-edit-data";
import { OrderViewDataState } from "../../store/slices/order-view-data";
import { PositionsCreateDataState } from "../../store/slices/positions-create-data";
import { PositionsEditDataState } from "../../store/slices/positions-edit-data";

export const additionalOrderData = (
  state: OrderCreateDataState | OrderEditDataState | OrderViewDataState,
) => ({
  screen_data: state.screen_data,
  filter_data: state.filter_data,
  bad_attributes: state.bad_attributes,
});

export const additionalPositionData = (
  state: PositionsCreateDataState | PositionsEditDataState,
) => ({
  screen_data: null,
  filter_data: null,
  bad_attributes: state.bad_attributes,
});

export const getRefbooks = (data: MainLayoutData): OrderRefBooks => {
  return {
    [Directory.COLOR]: data[Directory.COLOR],
    // [Directory.CONTAINER]: data[Directory.CONTAINER],
    [Directory.MODEL]: data[Directory.MODEL],
    [Directory.STATUS]: data[Directory.STATUS],
  };
};

export const mergeOrder = (data: MainLayoutData, delta: MainLayoutData) => {
  const [orderData] = data.orders || [];
  const [orderDelta] = delta.orders || [];
  const positionsData = data.positions || [];
  const positionsDelta = delta.positions || [];

  const order: OrderInfoModel = {
    ...(orderData || {}),
    ...(orderDelta || {}),
  };
  const positions: PositionInfo<string, string>[] = positionsDelta.length
    ? positionsDelta
    : positionsData;

  const deltaRefBooks = getRefbooks(delta);
  const refBooks = Object.values(deltaRefBooks).some(Boolean)
    ? deltaRefBooks
    : getRefbooks(data);

  const users = delta.users?.length ? delta.users : data.users;
  const containers = delta.containers?.length
    ? delta.containers
    : data.containers;

  return orderModelToViewModel(order, positions, refBooks, users, containers);
};

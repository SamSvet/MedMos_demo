import { useMemo } from "react";
import { OrderInfoModel } from "../../../../api/shared/order-info";
import { OrdersFilterDataModel } from "../../../../api/shared/orders-filter-data";
import { SortOrder } from "../../../../components/Table/interfaces";

export const useSorting = (filter_data?: OrdersFilterDataModel | null) => {
  return useMemo(() => {
    const isDesc = filter_data?.ordering?.[0] === "-";
    const dataField = isDesc
      ? filter_data?.ordering?.slice(1)
      : filter_data?.ordering;
    return {
      dataField: dataField as keyof OrderInfoModel,
      order: (isDesc ? "desc" : "asc") as SortOrder,
    };
  }, [filter_data]);
};

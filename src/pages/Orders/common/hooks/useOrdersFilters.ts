import { useCallback, useEffect } from "react";
import { OrdersFilterDataModel } from "../../../../api/shared/orders-filter-data";
import { FilterData } from "../../../../api/shared/common/filter-data";
import { ordersFiltersModelToViewModel } from "../../../../api/shared/mappers/order-list-mappers";
import { useComputedDataUpdate } from "../../../../hooks/useComputedDataUpdate";
import {
  getCurrentContainers,
  getCurrentRefBooks,
  getCurrentUsers,
} from "../../../../selectors/orders/common-order-selectors";
import { useOrdersSelector } from "../../../../store/orders-store";
import { useCurrentFilters } from "./useCurrentFilters";
import { LIST_FILTER_REF_OPTIONS_DEFAULT } from "../../../../constants/sd-fd";
import { useGetInitialOptions } from "./useGetInitialOptions";

export const useOrdersFilters = <T extends FilterData>(filter_data: T) => {
  const refBooks = useOrdersSelector(getCurrentRefBooks);

  const users = useOrdersSelector(getCurrentUsers);
  const containers = useOrdersSelector(getCurrentContainers);

  const formatFilterData = useCallback(
    (fd: OrdersFilterDataModel) =>
      ordersFiltersModelToViewModel(fd, refBooks, users, containers),
    [refBooks, users, containers],
  );
  const { lastData: lastFilterData, lastComputedData: filterDataView } =
    useComputedDataUpdate(filter_data, formatFilterData);

  const { filterOptions, fetchFilterOptions } = useGetInitialOptions(
    LIST_FILTER_REF_OPTIONS_DEFAULT,
  );

  const { filters: currFilters, handleFiltersChange } =
    useCurrentFilters(filterDataView);

  return {
    lastFilterData,
    currFilters,
    handleFiltersChange,
    filterOptions,
    fetchFilterOptions,
  };
};

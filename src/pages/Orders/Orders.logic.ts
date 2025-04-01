import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrdersDispatch, useOrdersSelector } from "../../store/orders-store";
import {
  getAdditionalOrderListData,
  getOrderPosList,
  getTableList,
} from "../../selectors/orders/order-list-selectors";
import {
  MRT_TableInstance,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import {
  LIST_FILTER_DATA_DEFAULT,
  SCREEN_DATA_DEFAULT,
} from "../../constants/sd-fd";
import { useOrdersFilters } from "./common/hooks/useOrdersFilters";

import { OrdersFilterDataViewModel } from "../../api/shared/orders-filter-data";
import { ordersDispatcher } from "../../store/thunks/orders-dispatcher";
import {
  orderFiltersViewModelToModel,
  orderSortViewModelToModel,
} from "../../api/shared/mappers/order-list-mappers";
import { OrderPosModel, TableModel } from "../../api/shared/order-info";
import usePrevious from "../../hooks/usePrevious";
import isEqual from "lodash.isequal";
import { fileProceedData } from "../../utils/file";

export const useOrderListLogic = () => {
  const dispatch = useOrdersDispatch();
  const navigate = useNavigate();
  const hasMounted = useRef(false);

  // const { viewdata } = useOrdersSelector(getOrderPosList);
  const { viewdata } = useOrdersSelector(getTableList);
  // useEffect(() => {
  //   console.log(viewdata);
  // }, [viewdata]);

  const { filter_data, screen_data } = useOrdersSelector(
    getAdditionalOrderListData,
  );

  const {
    currFilters: filters,
    handleFiltersChange,
    lastFilterData,
    filterOptions,
    fetchFilterOptions,
  } = useOrdersFilters(filter_data || LIST_FILTER_DATA_DEFAULT);

  const [mrtFilters, setMRTColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  // const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRefetching, setIsRefetching] = useState(false);

  const [mrtsorting, setMRTSorting] = useState<MRT_SortingState>([]);
  const mrtsortingPrev = usePrevious(mrtsorting);

  const [mrtpagination, setMRTPagination] = useState<MRT_PaginationState>({
    pageIndex: SCREEN_DATA_DEFAULT.page,
    pageSize: SCREEN_DATA_DEFAULT.count,
  });
  const mrtpaginationPrev = usePrevious(mrtpagination);

  // const { pagination, setRowsPerPage } = usePagination(screen_data);

  const downloadPdf = useCallback(async () => {
    return await dispatch(
      ordersDispatcher.withNavigate(navigate).exportOrderAll(fileProceedData),
    );
  }, [dispatch, navigate]);

  const handleSearch = useCallback(
    (filters: OrdersFilterDataViewModel) => {
      dispatch(
        ordersDispatcher
          .withNavigate(navigate)
          .withScreenData({
            page:
              mrtpagination.pageIndex + 1 ||
              screen_data?.page ||
              SCREEN_DATA_DEFAULT.page,
            count:
              mrtpagination.pageSize ||
              screen_data?.count ||
              SCREEN_DATA_DEFAULT.count,
          })
          .withFilterData({
            ...(filters &&
              orderFiltersViewModelToModel({
                ...filters,
                ordering: filter_data?.ordering || "-",
              })),
          })
          .withSortData(orderSortViewModelToModel(mrtsorting))
          .list(),
      );
    },
    [
      dispatch,
      navigate,
      mrtpagination.pageIndex,
      mrtpagination.pageSize,
      screen_data?.page,
      screen_data?.count,
      filter_data?.ordering,
      mrtsorting,
    ],
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (
      isEqual(mrtpagination, mrtpaginationPrev) &&
      isEqual(mrtsorting, mrtsortingPrev)
    )
      return;

    handleSearch(filters);
  }, [mrtsorting, mrtpagination]);

  const clearFilters = (table: MRT_TableInstance<TableModel>) => {
    table.resetColumnFilters();
    handleFiltersChange(LIST_FILTER_DATA_DEFAULT);
  };
  const clearSorting = (table: MRT_TableInstance<TableModel>) => {
    table.resetSorting();
  };

  return {
    viewdata,
    handleFiltersChange,
    handleSearch,
    filters,
    setMRTColumnFilters,
    filterOptions,
    fetchFilterOptions,
    setMRTSorting,
    mrtsorting,
    clearSorting,
    clearFilters,
    mrtpagination,
    setMRTPagination,
    total: screen_data?.total || 0,
    downloadPdf,
  };
};

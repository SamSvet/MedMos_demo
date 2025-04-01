import { useEffect, useMemo, useState } from "react";
import { ScreenData } from "../../../../api/shared/common/screen-data";
import {
  DEFAULT_ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "../../../../constants/order-list";
import { getValueFromRange } from "../../../../utils/value-from-range";

export const useRowsPerPage = (count?: number) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    setRowsPerPage(
      count
        ? getValueFromRange(count, ROWS_PER_PAGE_OPTIONS)
        : DEFAULT_ROWS_PER_PAGE,
    );
  }, [count]);

  return { rowsPerPage, setRowsPerPage };
};

export const usePagination = (screen_data?: ScreenData) => {
  const { rowsPerPage, setRowsPerPage } = useRowsPerPage(screen_data?.count);

  const pagination = useMemo(() => {
    return {
      page: screen_data?.page || 1,
      pages: screen_data?.pages,
      count: rowsPerPage,
    };
  }, [rowsPerPage, screen_data?.page, screen_data?.pages]);

  return {
    pagination,
    setRowsPerPage,
  };
};

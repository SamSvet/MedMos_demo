import { useState, useEffect, useCallback } from "react";
import { FilterData } from "../../../../api/shared/common/filter-data";

export const useCurrentFilters = <T extends FilterData>(filters: T) => {
  const [currFilters, setCurrFilters] = useState<T>(filters);
  //table state

  useEffect(() => {
    setCurrFilters(filters);
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: T) => {
    setCurrFilters(newFilters);
  }, []);

  return {
    filters: currFilters,
    handleFiltersChange,
  };
};

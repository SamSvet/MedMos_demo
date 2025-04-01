import { useCallback, useState } from "react";
import { useGetOptionsInRefBox } from "./useGetOptionInRefBox";
import { Directory } from "../../../../api/shared/directory.enum";
import { UserItem } from "../../../../api/shared/common/users";
import { ListItem } from "../../../../api/shared/common/list-item";
import { DataItem } from "../../../../api/shared/common/response-data";
import { ContainerItem } from "../../../../api/shared/common/container";

export type FilterOptions<T extends ListItem | UserItem | ContainerItem> = {
  [key in Directory]: DataItem<T>;
};
export const useGetInitialOptions = <
  T extends ListItem | UserItem | ContainerItem,
>(
  initialOptions: FilterOptions<T>,
) => {
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions<T>>(initialOptions);
  const { getDirectoryOptions } = useGetOptionsInRefBox();

  const fetchFilterOptions = useCallback(
    async (filterKey: keyof FilterOptions<T>) => {
      const response = await getDirectoryOptions(filterKey, "");
      setFilterOptions((prevValue) => ({
        ...prevValue,
        [filterKey]: response,
      }));
    },
    [getDirectoryOptions],
  );

  return { filterOptions, fetchFilterOptions };
};

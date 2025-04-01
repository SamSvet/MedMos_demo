import { useCallback } from "react";
import { OrderRefBooks } from "../../../../api/shared/order-ref-books";
import { ListItem } from "../../../../api/shared/common/list-item";
import { Directory } from "../../../../api/shared/directory.enum";
import {
  PositionInfo,
  PositionInfoViewModel,
} from "../../../../api/shared/position-info";
import { ContainersData } from "../../../../api/shared/common/container";

export const useGetPositionDictionaries = () => {
  const valuesRefBook = useCallback(
    (attr: keyof Partial<PositionInfo>, position: PositionInfoViewModel) => {
      const values: ListItem[] = [];
      if (Array.isArray(position[attr])) {
        (position[attr] as unknown as ListItem[])?.forEach((sc) =>
          values.push(sc),
        );
      } else {
        position[attr] && values.push(position[attr] as ListItem);
      }
      return values;
    },
    [],
  );

  const getPositionRefBooks = useCallback(
    (position: PositionInfoViewModel): OrderRefBooks => {
      return {
        [Directory.COLOR]: valuesRefBook("color", position),
        // [Directory.CONTAINER]: valuesRefBook("container", position),
        [Directory.MODEL]: valuesRefBook("model_id", position),
        [Directory.STATUS]: valuesRefBook("status", position),
      };
    },
    [valuesRefBook],
  );

  const getContainers = useCallback(
    (position: PositionInfoViewModel): ContainersData => {
      return {
        containers: position.container ? position.container : [],
      };
    },
    [],
  );

  const getPositionDictionaries = useCallback(
    (position: PositionInfoViewModel) => {
      return { ...getContainers(position), ...getPositionRefBooks(position) };
    },
    [getContainers, getPositionRefBooks],
  );

  return getPositionDictionaries;
};

import { useCallback } from "react";
import { OrderInfoViewModel } from "../../../../api/shared/order-info";
import { Directory } from "../../../../api/shared/directory.enum";
import {
  PositionInfo,
  PositionInfoViewModel,
} from "../../../../api/shared/position-info";
import { ListItem } from "../../../../api/shared/common/list-item";
import { UsersData } from "../../../../api/shared/common/users";

export const useGetOrderDictionaries = () => {
  // const getRefBooks = useCallback(
  //   (order: OrderInfoViewModel): OrderRefBooks => {
  //     return {
  //       [Directory.COLOR]: order.
  //         ? [order.order_kind_cd]
  //         : [],
  //       [Directory.MODEL]: order.activity_group_cd
  //         ? [order.activity_group_cd]
  //         : [],
  //       [Directory.STATUS]: order.
  //         ? [order.order_status_cd]
  //         : [],
  //     };
  //   },
  //   [],
  // );

  const getPositionsRefBooks = useCallback(
    (positions: PositionInfoViewModel[]) => {
      const valuesRefBook = (
        attr: keyof Partial<PositionInfo>,
        positions: PositionInfoViewModel[],
      ) => {
        const values: ListItem[] = [];

        positions
          .filter((ps) => ps[attr])
          ?.forEach((ps) => {
            if (Array.isArray(ps[attr])) {
              (ps[attr] as unknown as ListItem[])?.forEach(
                (scVal) =>
                  !values.find(
                    (v) => v.internal_code === scVal.internal_code,
                  ) && values.push(scVal),
              );
            } else {
              values.push(ps[attr] as ListItem);
            }
          });

        return values;
      };

      return {
        [Directory.COLOR]: valuesRefBook("color", positions),
        [Directory.MODEL]: valuesRefBook("model_id", positions),
        [Directory.STATUS]: valuesRefBook("status", positions),
      };
    },
    [],
  );

  const getUsers = useCallback((order: OrderInfoViewModel): UsersData => {
    return {
      users: order.order_manager ? [order.order_manager] : [],
    };
  }, []);

  //   const getTeams = useCallback((order: OrderInfoViewModel): TeamsData => {
  //     return {
  //       teams: order.team_cd ? [order.team_cd] : [],
  //     };
  //   }, []);

  const getOrderDictionaries = useCallback(
    (order: OrderInfoViewModel, positions: PositionInfoViewModel[]) => {
      return {
        ...getUsers(order),
        ...getPositionsRefBooks(positions),
      };
    },
    [getPositionsRefBooks, getUsers],
  );

  return getOrderDictionaries;
};

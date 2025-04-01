import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ContainerFilters,
  OrderFilters,
  OrdersFilterableEntities,
  PositionFilters,
} from "../../../api/shared/orders-filter-data";
import { Directory } from "../../../api/shared/directory.enum";
import { useGetOptionsInRefBox } from "../common/hooks/useGetOptionInRefBox";
import { DataItem } from "../../../api/shared/common/response-data";
import { ListItem } from "../../../api/shared/common/list-item";
import { UserItem } from "../../../api/shared/common/users";
import { ContainerItem } from "../../../api/shared/common/container";

export enum FilterType {
  Text = "text",
  Date = "date",
  Ref = "ref",
  RefMulti = "refMulti",
  Tag = "tag",
  User = "user",
  Container = "container",
}

export interface IFilter {
  label: string;
  type: FilterType;
  fieldName: keyof (OrderFilters<Date, UserItem> &
    PositionFilters<ListItem, ContainerItem> &
    ContainerFilters<Date>);
  getRef?: (
    substring: string,
  ) => Promise<
    DataItem<ListItem> | DataItem<UserItem> | DataItem<ContainerItem>
  >;
  disabled?: boolean;
  entity: OrdersFilterableEntities;
}

export const useFiltersModel = () => {
  const { t } = useTranslation();
  const { getDirectoryOptions, getUsersOptions, getContainersOptions } =
    useGetOptionsInRefBox();

  const filtersMap = useMemo(
    () =>
      new Map<
        keyof (OrderFilters<Date, UserItem> &
          PositionFilters<ListItem, ContainerItem> &
          ContainerFilters<Date>),
        IFilter
      >([
        [
          "order_name",
          {
            label: "",
            type: FilterType.Text,
            fieldName: "order_name",
            entity: "orders",
          },
        ],
        [
          "order_manager",
          {
            label: "order_manager",
            type: FilterType.User,
            fieldName: "order_manager",
            getRef: getUsersOptions,
            entity: "orders",
          },
        ],
        [
          "created",
          {
            label: "created",
            type: FilterType.Date,
            fieldName: "created",
            entity: "orders",
          },
        ],
        [
          "updated",
          {
            label: "updated",
            type: FilterType.Date,
            fieldName: "updated",
            entity: "orders",
          },
        ],

        [
          "position_name",
          {
            label: "",
            type: FilterType.Text,
            fieldName: "position_name",
            entity: "positions",
          },
        ],
        [
          "color",
          {
            label: "",
            type: FilterType.Ref,
            fieldName: "color",
            getRef: (substring: string) =>
              getDirectoryOptions(Directory.COLOR, substring),
            entity: "positions",
          },
        ],
        [
          "container",
          {
            label: "",
            type: FilterType.Container,
            fieldName: "container",
            getRef: getContainersOptions,
            entity: "positions",
          },
        ],
        [
          "model_id",
          {
            label: "",
            type: FilterType.Ref,
            fieldName: "model_id",
            getRef: (substring: string) =>
              getDirectoryOptions(Directory.MODEL, substring),
            entity: "positions",
          },
        ],
        [
          "status",
          {
            label: "",
            type: FilterType.Ref,
            fieldName: "status",
            getRef: (substring: string) =>
              getDirectoryOptions(Directory.STATUS, substring),
            entity: "positions",
          },
        ],
        [
          "start_plan_delivery_dt",
          {
            label: "",
            type: FilterType.Date,
            fieldName: "start_plan_delivery_dt",
            entity: "containers",
          },
        ],
        [
          "end_plan_delivery_dt",
          {
            label: "",
            type: FilterType.Date,
            fieldName: "end_plan_delivery_dt",
            entity: "containers",
          },
        ],
      ]),
    [getContainersOptions, getDirectoryOptions, getUsersOptions],
  );

  const filtersModel: IFilter[][] = useMemo(
    () => [
      [
        filtersMap.get("order_name")!,
        filtersMap.get("order_manager")!,
        filtersMap.get("created")!,
        filtersMap.get("updated")!,
      ],
      [
        filtersMap.get("position_name")!,
        filtersMap.get("color")!,
        filtersMap.get("container")!,
      ],
    ],
    [filtersMap],
  );

  return { filtersModel, filtersMap };
};

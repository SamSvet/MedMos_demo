import { type MRT_ColumnDef } from "material-react-table";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ColorBox } from "../../components/ColorBox/ColorBox";
import {
  FilterContainerField,
  FilterDateField,
  FilterDateRangeField,
  FilterRefField,
  FilterTextField,
} from "./OrderFilters/OrderFilters.fields";
import { ListItem } from "../../api/shared/common/list-item";
import { useFiltersModel } from "./OrderFilters/OrderFilters.models";
import {
  OrdersFilterDataViewModel,
  OrdersFilterableEntities,
} from "../../api/shared/orders-filter-data";
import { UserItem } from "../../api/shared/common/users";
import { FilterOptions } from "./common/hooks/useGetInitialOptions";
import { Directory } from "../../api/shared/directory.enum";
import Tooltip from "@mui/material/Tooltip";
import { OrderPosModel, TableModel } from "../../api/shared/order-info";
import { Link, Stack } from "@mui/material";
import { ContainerItem } from "../../api/shared/common/container";
import { DateRange } from "../../components/DateRange/DateRange.types";

interface IFiltersProps<T extends ListItem | UserItem | ContainerItem> {
  filters: OrdersFilterDataViewModel;
  onFiltersChange: (filters: OrdersFilterDataViewModel) => void;
  fetchFilterOptions: (value: Directory) => void;
  filterOptions: FilterOptions<T>;
  viewOrder: (id: string) => Promise<unknown>;
  // onClear: () => void;
  // onSearch: () => void;
}

export const useOrdersColumns = <
  T extends ListItem | UserItem | ContainerItem,
>({
  filters,
  onFiltersChange,
  filterOptions,
  fetchFilterOptions,
  viewOrder,
}: IFiltersProps<T>) => {
  const { t } = useTranslation();

  const { filtersMap } = useFiltersModel();
  const orderName = filtersMap.get("order_name")!;
  const positionName = filtersMap.get("position_name")!;
  const modelId = filtersMap.get("model_id")!;
  const statusFilter = filtersMap.get("status")!;
  const colorFilter = filtersMap.get("color")!;
  const containerFilter = filtersMap.get("container")!;
  const start_plan_delivery_dt = filtersMap.get("start_plan_delivery_dt")!;
  const end_plan_delivery_dt = filtersMap.get("end_plan_delivery_dt")!;
  // const orderName = filtersMap.get("order_name")!;

  const handleChange = useCallback(
    (
      fieldName: string,
      entity: OrdersFilterableEntities,
      value:
        | string
        | Date
        | ListItem[]
        | ListItem
        | UserItem
        | UserItem[]
        | ContainerItem
        | ContainerItem[]
        | null,
    ) => {
      onFiltersChange({
        ...filters,
        [entity]: { ...filters?.[entity], [fieldName]: value },
      });
    },
    [filters, onFiltersChange],
  );

  const handleChangeDateRange = useCallback(
    (
      fieldNameStart: string,
      fieldNameEnd: string,
      entity: OrdersFilterableEntities,
      value: DateRange | null,
    ) => {
      onFiltersChange({
        ...filters,
        [entity]: {
          ...filters?.[entity],
          [fieldNameStart]: value?.startDate,
          [fieldNameEnd]: value?.endDate,
        },
      });
    },
    [filters, onFiltersChange],
  );

  const columns = useMemo<MRT_ColumnDef<TableModel>[]>(
    () => [
      // {
      //   accessorKey: "action",
      //   header: "",
      //   size: 20,
      //   enableResizing: false,
      //   enableHiding: false,
      //   enableColumnFilter: false,
      //   enableColumnActions: false,
      //   enableSorting: false,
      //   Cell: ({ row }) => (
      //     <Tooltip
      //       title={<>Редактировать {row.original.order.order_name}</>}
      //       disableInteractive
      //     >
      //       <IconButton
      //         color="primary"
      //         size="small"
      //         // onClick={() => console.log(row.original)}
      //         onClick={() => viewOrder(row.original.order.order_id!)}
      //       >
      //         <EditIcon fontSize="inherit" />
      //       </IconButton>
      //     </Tooltip>
      //   ),
      // },
      {
        accessorKey: "order.order_name",
        header: "Заказ",
        size: 150,
        minSize: 120,
        maxSize: 300,
        enableHiding: false,
        enableClickToCopy: false,
        // Filter: ({ column }) => (
        //   <TextField
        //     onChange={(e) => {
        //       const entity = column.id.split(
        //         ".",
        //       )[0] as OrdersFilterableEntities;
        //       const fieldName = column.id.split(".")[1];
        //       const value = (e.target as HTMLTextAreaElement).value;
        //       onFiltersChange({
        //         ...filters,
        //         [entity]: {
        //           ...filters?.[entity],
        //           [fieldName]: value,
        //         },
        //       });
        //     }}
        //     value={
        //       (filters?.["orders"] as { [key: string]: string })?.["order_name"]
        //     }
        //     fullWidth
        //     variant="standard"
        //   />
        // ),

        // Filter: () => (
        //   <FilterTextField
        //     {...orderName}
        //     value={
        //       (filters?.[orderName.entity] as { [key: string]: string })?.[
        //         orderName.fieldName
        //       ]
        //     }
        //     onChange={handleChange}
        //   />
        // ),
        // Cell: ({ cell }) => {
        //   return (
        //     <span
        //       style={{
        //         whiteSpace: "nowrap",
        //         overflow: "hidden",
        //         textOverflow: "ellipsis",
        //       }}
        //     >
        //       {cell.getValue<string>()}
        //     </span>
        //   );
        // },
        Cell: ({ row, cell }) => {
          return (
            <Tooltip
              title={<>Просмотр заказа {row.original.order.order_name}</>}
              disableInteractive
            >
              <Link
                href="#"
                onClick={() => viewOrder(row.original.order.order_id!)}
              >
                {cell.getValue<string>()}
              </Link>
            </Tooltip>
          );
        },
        Filter: () => (
          <FilterTextField
            {...orderName}
            value={
              (filters?.[orderName.entity] as { [key: string]: string })?.[
                orderName.fieldName
              ] || ""
            }
            onChange={handleChange}
          />
        ),

        // muiFilterTextFieldProps: ({ column }) => ({
        //   onLoadedData: () => {
        //     console.log("order name");
        //   },
        //   onChange: (event) => {
        //     const entity = column.id.split(".")[0] as OrdersFilterableEntities;
        //     const fieldName = column.id.split(".")[1];
        //     const value = event.target.value;

        //     onFiltersChange({
        //       ...filters,
        //       [entity]: {
        //         ...filters?.[entity],
        //         [fieldName]: value,
        //       },
        //     });
        //   },
        // }),
      },

      {
        accessorKey: "order.description",
        header: "Описание",
        size: 300,
        enableGrouping: false,
      },
      {
        accessorKey: "position.position_name",
        header: "Артикул по РУ",
        size: 150,
        Filter: () => (
          <FilterTextField
            {...positionName}
            value={
              (filters?.[positionName.entity] as { [key: string]: string })?.[
                positionName.fieldName
              ] || ""
            }
            onChange={handleChange}
          />
        ),
      },
      {
        accessorKey: "position.model_id",
        header: "Модельный номер",
        size: 150,
        Filter: () => (
          <FilterRefField
            {...modelId}
            value={
              (filters?.[modelId.entity] as { [key: string]: ListItem })?.[
                modelId.fieldName
              ] as ListItem
            }
            onChange={handleChange}
          />
        ),
      },

      {
        accessorKey: "position.color",
        header: "Цвет",
        size: 150,
        Cell: ({ cell }) => {
          return (
            <>
              {cell.getValue<string>()}
              <ColorBox color={cell.getValue<string>()} />
            </>
          );
        },
        Filter: () => (
          <FilterRefField
            {...colorFilter}
            value={
              (filters?.[colorFilter.entity] as { [key: string]: ListItem })?.[
                colorFilter.fieldName
              ] as ListItem
            }
            onChange={handleChange}
          />
        ),
      },
      {
        accessorKey: "position.container",
        // accessorFn: (originalRow) => "qweasd",
        header: "Контейнер",
        size: 150,
        filterVariant: "select",
        // filterSelectOptions: (
        //   filterOptions as FilterOptions<ListItem>
        // ).dct_container.map((el) => ({
        //   label: el.name,
        //   value: el.name,
        // })),
        Cell: ({ cell }) => {
          return (
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {cell.getValue<string>()}
            </span>
          );
        },
        Filter: () => (
          <FilterContainerField
            {...containerFilter}
            value={
              (
                filters?.[containerFilter.entity] as {
                  [key: string]: ContainerItem;
                }
              )?.[containerFilter.fieldName] as ContainerItem
            }
            onChange={handleChange}
          />
        ),
      },
      {
        accessorKey: "container.plan_delivery_dt",
        // accessorFn: (originalRow) =>
        //   originalRow.container
        //     ? originalRow.container.plan_delivery_dt?.split("T")[0]
        //     : "",
        header: "Дата доставки",
        size: 280,
        enableGrouping: false,
        enableResizing: false,
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ cell }) =>
          cell.getValue()
            ? cell
                .getValue<string>()
                .split("T")[0]
                .split("-")
                .reverse()
                .join(".")
            : "",
        Filter: () => (
          <FilterDateRangeField
            onChange={handleChangeDateRange}
            start_dt={{
              ...start_plan_delivery_dt,
              value: (
                filters?.[start_plan_delivery_dt.entity] as {
                  [key: string]: Date;
                }
              )?.[start_plan_delivery_dt.fieldName],
              onChange: () => {
                return true;
              },
            }}
            end_dt={{
              ...end_plan_delivery_dt,
              value: (
                filters?.[end_plan_delivery_dt.entity] as {
                  [key: string]: Date;
                }
              )?.[end_plan_delivery_dt.fieldName],
              onChange: () => {
                return true;
              },
            }}
          />
          //   <Stack
          //     direction="row"
          //     justifyContent="flex-start"
          //     alignItems="center"
          //     spacing={2}
          //   >
          //     <FilterDateField
          //       {...start_plan_delivery_dt}
          //       value={
          //         (
          //           filters?.[start_plan_delivery_dt.entity] as {
          //             [key: string]: Date;
          //           }
          //         )?.[start_plan_delivery_dt.fieldName]
          //       }
          //       onChange={handleChange}
          //     />
          //     <FilterDateField
          //       {...end_plan_delivery_dt}
          //       value={
          //         (
          //           filters?.[end_plan_delivery_dt.entity] as {
          //             [key: string]: Date;
          //           }
          //         )?.[end_plan_delivery_dt.fieldName]
          //       }
          //       onChange={handleChange}
          //     />
          //   </Stack>
        ),
      },

      // {
      //   accessorKey: "positions.container",
      //   header: "Container",
      //   size: 150,
      //   filterVariant: "select",
      //   filterSelectOptions: (
      //     filterOptions as FilterOptions<ListItem>
      //   ).dct_container.map((el) => ({
      //     label: el.name,
      //     value: el.name,
      //   })),
      //   muiFilterTextFieldProps: ({ column }) => ({
      //     onChange: (event) => {
      //       const entity = column.id.split(".")[0] as OrdersFilterableEntities;
      //       const fieldName = column.id.split(".")[1];
      //       const value = (event.target as HTMLTextAreaElement).value;
      //       onFiltersChange({
      //         ...filters,
      //         [entity]: {
      //           ...filters?.[entity],
      //           [fieldName]: {
      //             ...(filterOptions.dct_container as DataItem<ListItem>).find(
      //               (el) => el.name === value,
      //             ),
      //           },
      //         },
      //       });
      //     },
      //     onFocus: (event) => {
      //       fetchFilterOptions(Directory.CONTAINER);
      //     },
      //   }),
      //   Cell: ({ cell }) => {
      //     return (
      //       <span
      //         style={{
      //           whiteSpace: "nowrap",
      //           overflow: "hidden",
      //           textOverflow: "ellipsis",
      //         }}
      //       >
      //         {cell.getValue<string>()}
      //       </span>
      //     );
      //   },
      // },
      {
        accessorKey: "position.status",
        header: "Статус",
        size: 150,
        Filter: () => (
          <FilterRefField
            {...statusFilter}
            value={
              (filters?.[statusFilter.entity] as { [key: string]: ListItem })?.[
                statusFilter.fieldName
              ] as ListItem
            }
            onChange={handleChange}
          />
        ),
      },
      {
        accessorKey: "position.count",
        header: "Всего",
        size: 110,
        minSize: 60,
        maxSize: 120,
        enableColumnFilter: false,
        enableResizing: false,
        muiTableBodyCellProps: {
          align: "center",
        },
        enableColumnActions: false,
      },
      {
        accessorKey: "position.reserved_count",
        header: "В резерве",
        size: 120,
        minSize: 60,
        maxSize: 120,
        enableColumnFilter: false,
        enableResizing: false,
        muiTableBodyCellProps: {
          align: "center",
        },
        enableColumnActions: false,
      },
    ],
    [
      viewOrder,
      orderName,
      filters,
      handleChange,
      positionName,
      modelId,
      colorFilter,
      containerFilter,
      handleChangeDateRange,
      start_plan_delivery_dt,
      end_plan_delivery_dt,
      statusFilter,
    ],
  );

  return columns;
};

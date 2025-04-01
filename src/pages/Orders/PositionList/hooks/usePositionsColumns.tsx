import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { PositionInfoModel } from "../../../../api/shared/position-info";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const usePositionsColumns = () => {
  const columns = useMemo<MRT_ColumnDef<PositionInfoModel>[]>(
    () => [
      {
        accessorKey: "action",
        header: "",
        size: 20,
        enableResizing: false,
        enableHiding: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <Tooltip
            title={<>Редактировать {row.original.position_item_id}</>}
            disableInteractive
          >
            <IconButton
              color="primary"
              size="small"
              // onClick={() => console.log(row.original)}
              // onClick={() => viewOrder(row.original.order.order_id!)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ),
      },
      // {
      //   accessorKey: "position_item_id",
      //   header: "ID позиции",
      //   size: 300,
      //   minSize: 120,
      //   maxSize: 300,
      //   enableHiding: false,
      // },
      {
        accessorKey: "container",
        header: "Контейнер",
        size: 300,
        minSize: 120,
        maxSize: 300,
        enableHiding: true,
      },
      {
        accessorKey: "status",
        header: "Статус",
        size: 300,
        minSize: 120,
        maxSize: 300,
        enableHiding: true,
      },
    ],
    [],
  );
  return columns;
};

// position_id?: string;
// order_id: string | null;
// position_name: string | null;
// color: ITEM | null;
// position_description: string | null;
// model_id: ITEM | null;
// count: number | null;
// container?: ITEM[] | null;
// status?: ITEM | null;
// position_item_id?: string[] | null;

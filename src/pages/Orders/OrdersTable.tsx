/* eslint-disable react/jsx-pascal-case */
import {
  MRT_Localization,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useOrderListLogic } from "./Orders.logic";
import { useOrdersColumns } from "./OrdersColumns.models";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback } from "react";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { LIST_FILTER_DATA_DEFAULT } from "../../constants/sd-fd";
import { useOrderScreensLogic } from "./OrdersScreen.logic";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useTranslation } from "react-i18next";

interface LocaleDict {
  [locale_code: string]: MRT_Localization;
}
const OrdersTable = () => {
  const { t, i18n } = useTranslation();
  const {
    viewdata,
    filters,
    setMRTColumnFilters,
    handleFiltersChange: onFiltersChange,
    filterOptions,
    fetchFilterOptions,
    handleSearch,
    mrtsorting,
    setMRTSorting,
    clearSorting,
    clearFilters,
    mrtpagination,
    setMRTPagination,
    total,
    downloadPdf,
  } = useOrderListLogic();

  const tableLocale: LocaleDict = {
    ru: MRT_Localization_RU,
    us: MRT_Localization_EN,
  };

  const { showCreateOrder, viewOrder } = useOrderScreensLogic(
    { page: mrtpagination.pageIndex, count: mrtpagination.pageSize },
    filters,
  );

  const columns = useOrdersColumns({
    filters,
    onFiltersChange,
    filterOptions,
    fetchFilterOptions,
    viewOrder,
  });

  const handleSearchClick = useCallback(
    () => handleSearch(filters),
    [filters, handleSearch],
  );

  const table = useMaterialReactTable({
    columns,
    data: viewdata,
    enableStickyHeader: true,
    muiTableContainerProps: {
      sx: { maxHeight: "500px" },
    },

    enableColumnResizing: true,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    maxMultiSortColCount: 3,
    onSortingChange: setMRTSorting,
    onColumnFiltersChange: setMRTColumnFilters,
    onPaginationChange: setMRTPagination,
    muiPaginationProps: {
      showFirstButton: true,
      showLastButton: true,
    },
    rowCount: total,
    initialState: {
      density: "compact",
      showColumnFilters: true,
      columnPinning: {
        left: ["action", "order.order_name"],
      },
      columnVisibility: {
        "order.description": false,
      },
    },

    // paginateExpandedRows: false,
    enableRowVirtualization: true,
    muiTableBodyCellProps: () => ({
      sx: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    }),
    localization: { ...(tableLocale[i18n.language] || MRT_Localization_RU) },

    muiTablePaperProps: ({ table }) => ({
      style: {
        zIndex: table.getState().isFullScreen ? 1201 : undefined,
      },
    }),
    renderToolbarInternalActions: ({ table }) => (
      <Box sx={{ width: "100%" }}>
        <Tooltip title={t("table.toolbar.searchBtn")}>
          <IconButton onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Tooltip>

        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            "& > :first-of-type": {
              mr: 5,
            },
          }}
        >
          <Tooltip title={t("table.toolbar.addNewOrderBtn")}>
            <IconButton color="primary" onClick={showCreateOrder}>
              <AddCircleOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("table.toolbar.clearSortBtn")}>
            <IconButton onClick={() => clearSorting(table)}>
              <SyncAltIcon sx={{ transform: "rotate(-90deg)" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("table.toolbar.clearFilterBtn")}>
            <IconButton
              onClick={() => {
                clearFilters(table);
                handleSearch(LIST_FILTER_DATA_DEFAULT);
              }}
            >
              <FilterAltOffIcon />
            </IconButton>
          </Tooltip>

          <Box ml={5}>
            <Tooltip title={t("table.toolbar.downloadOrderBtn")}>
              <IconButton onClick={downloadPdf} color="success">
                <InsertDriveFileIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      );
    },

    state: { sorting: mrtsorting, pagination: mrtpagination },
  });

  return <MaterialReactTable table={table} />;
};

export default OrdersTable;

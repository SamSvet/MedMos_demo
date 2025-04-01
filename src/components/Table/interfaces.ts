/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from "react";
import {
  LabelDisplayedRowsArgs as MuiLabelDisplayedRowsArgs,
  TableCellProps as MuiTableCellProps,
  TableProps as MuiTableProps,
} from "@mui/material";

export enum EmptyKeys {}

export type TableField<DATATYPE, ADDITIONAL_KEYS = EmptyKeys> =
  | keyof DATATYPE
  | ADDITIONAL_KEYS;

export type SortOrder = "asc" | "desc";
export type TableChangeType = "pagination" | "sort";
export interface TableChangeState<DATATYPE> {
  page?: number;
  count?: number;
  sortField?: TableField<DATATYPE>;
  sortOrder?: SortOrder;
}

export interface Pagination {
  page?: number; // текущая страница
  total?: number; // всего строк
  count?: number; // строк на странице
  pages?: number; // всего страниц
}

export interface Sorting<DATATYPE> {
  dataField: TableField<DATATYPE>;
  order: SortOrder;
}

export type RowRenderCollapsibleContentFunc<
  DATATYPE,
  ADDITIONAL_KEYS = EmptyKeys,
> = (
  row: DATATYPE,
  field: TableField<DATATYPE, ADDITIONAL_KEYS>,
) => string | JSX.Element;

export type CellStyles<DATATYPE> =
  | CSSProperties
  | ((value: any, row?: DATATYPE) => CSSProperties);

export type RowsPerPageOptions = Array<
  number | { value: number; label: string }
>;

export type DisplayedRowsLabelFunc = (
  paginationInfo: MuiLabelDisplayedRowsArgs,
) => React.ReactNode;

export interface CustomizeTable {
  noDataMessage?: string;
  rowsPerPageLabel?: string;
  displayedRowsLabel?: DisplayedRowsLabelFunc;
  hideDisplayedRows?: boolean;
  columnPickerLabel?: string;
}

export interface ITableColumn<DATATYPE, ADDITIONAL_KEYS = EmptyKeys>
  extends MuiTableCellProps {
  field: TableField<DATATYPE, ADDITIONAL_KEYS>;
  align?: "left" | "right" | "center";
  label?: string;
  width?: number | string;
  pinLeft?: number;
  pinRight?: number;
  collapse?: boolean;
  formatter?: (value: any, row: DATATYPE) => string | JSX.Element;
  popper?: (value: any, row: DATATYPE) => string | JSX.Element;
  sort?: boolean;
  headFormatter?: (value: any) => string | JSX.Element;
  cellStyles?: CellStyles<DATATYPE>;
  hidden?: boolean;
  defaultHidden?: boolean;
  unpickable?: boolean;
}

export interface ITableProps<DATATYPE, ADDITIONAL_KEYS = EmptyKeys>
  extends MuiTableProps {
  columns: ITableColumn<DATATYPE, ADDITIONAL_KEYS>[];
  rows: DATATYPE[];
  keyField: TableField<DATATYPE>;
  pagination?: Pagination;
  sorting?: Sorting<DATATYPE>;
  onChanges?: (
    changeType: TableChangeType,
    newState: TableChangeState<DATATYPE>,
  ) => void;
  renderRowCollapsibleContent?: RowRenderCollapsibleContentFunc<
    DATATYPE,
    ADDITIONAL_KEYS
  >;
  rowsPerPageOptions?: RowsPerPageOptions;
  customize?: CustomizeTable;
  columnPicker?: boolean;
}

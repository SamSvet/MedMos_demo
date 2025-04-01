import { DatePicker } from "@mui/lab";
import { PopperProps, TextField, TextFieldProps } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ContainerFilters,
  OrderFilters,
  PositionFilters,
} from "../../../api/shared/orders-filter-data";
import { ListItem } from "../../../api/shared/common/list-item";
import { DataItem } from "../../../api/shared/common/response-data";
import { UserItem } from "../../../api/shared/common/users";
import { OptionsSettings, RefBox } from "../../../components/RefBox";
import {
  CONTAINERS_OPTIONS_SETTINGS,
  REF_OPTIONS_SETINGS,
  REQUEST_MIN_SYMBOLS_CONTAINERS,
  REQUEST_MIN_SYMBOLS_USERS,
  USERS_OPTIONS_SETTINGS,
} from "../../../constants/ref-box-options-settings";
import { DATE_FORMAT_VIEW } from "../../../utils/date-utils";
import { IFilter } from "./OrderFilters.models";
import { DateTextField } from "../../../components/DateTextField/DateTextField";
import { useDateTextFieldClear } from "../../../components/DateTextField/hooks/useDateTextFieldClear";
import { SELENIUM_TEST_IDS } from "../../../constants/selenium-test-ids";
import { ContainerItem } from "../../../api/shared/common/container";
import { DateRangeEditor } from "../../../components/DateRange/DateRangeEditor";
import { DateRange } from "../../../components/DateRange/DateRange.types";

export interface IFilterField<VALUE_TYPE> extends IFilter {
  value: VALUE_TYPE | null;
  onChange: (
    fieldName: keyof (OrderFilters<Date, UserItem> &
      PositionFilters<ListItem, ContainerItem> &
      ContainerFilters<Date>),
    entity: "orders" | "positions" | "containers",
    value: VALUE_TYPE,
  ) => void;
  placeholder?: string;
  "data-test-id"?: string;
}

export const FilterTextField: FC<IFilterField<string>> = ({
  fieldName,
  label,
  value,
  onChange,
  entity,
  ...props
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onChange(fieldName, entity, e.target.value);
    },
    [fieldName, entity, onChange],
  );

  return (
    <TextField
      label={label}
      size="small"
      onChange={handleChange}
      value={value}
      fullWidth
      variant="standard"
      data-testid="campaign-filters-textfield"
      inputProps={{
        "data-test-id": props["data-test-id"],
        "data-filter-field": fieldName,
        "data-filter-entity": entity,
      }}
    />
  );
};

export const FilterDateRangeField: FC<{
  start_dt: IFilterField<Date | null>;
  end_dt: IFilterField<Date | null>;
  onChange: (
    fieldNameStart: keyof (OrderFilters<Date, UserItem> &
      PositionFilters<ListItem, ContainerItem> &
      ContainerFilters<Date>),
    fieldNameEnd: keyof (OrderFilters<Date, UserItem> &
      PositionFilters<ListItem, ContainerItem> &
      ContainerFilters<Date>),
    entity: "orders" | "positions" | "containers",
    value: DateRange | null,
  ) => void;
}> = ({ start_dt, end_dt, onChange }) => {
  const handleChange = useCallback(
    (newValue: DateRange | null) => {
      onChange(start_dt.fieldName, end_dt.fieldName, start_dt.entity, newValue);
    },
    [onChange, start_dt.fieldName, start_dt.entity, end_dt.fieldName],
  );
  return (
    <DateRangeEditor
      dateRange={{
        startDate: start_dt.value ? start_dt.value : undefined,
        endDate: end_dt.value ? end_dt.value : undefined,
      }}
      startInput={{ readonly: true }}
      endInput={{ readonly: true }}
      onChange={handleChange}
    />
  );
};

export const FilterDateField: FC<IFilterField<Date | null>> = ({
  fieldName,
  label,
  value,
  onChange,
  entity,
  ...props
}) => {
  const handleChange = useCallback(
    (newValue: Date | null) => {
      onChange(fieldName, entity, newValue);
    },
    [fieldName, entity, onChange],
  );
  const { clearCustomValue, setClearCustomValue, datePickerOnAcceptHandler } =
    useDateTextFieldClear(value, handleChange);

  return (
    <DatePicker
      mask="__.__.____"
      onAccept={datePickerOnAcceptHandler}
      onChange={() => {
        return true;
      }}
      value={value || null}
      inputFormat={DATE_FORMAT_VIEW}
      PopperProps={
        {
          "data-test-id": SELENIUM_TEST_IDS.datePicker.popper,
        } as unknown as PopperProps
      }
      renderInput={(params: any) => {
        return (
          <DateTextField
            textFieldParams={
              {
                ...params,
                "data-test-id": props["data-test-id"],
                "data-filter-field": fieldName,
                "data-filter-entity": entity,
              } as unknown as TextFieldProps
            }
            modelParams={{
              dataTestID: "campaign-filters-datefield",
              value: value as Date,
              update: handleChange,
              label,
              clearCustomValue: clearCustomValue.current,
              clearCustomValueHandler: setClearCustomValue,
            }}
          />
        );
      }}
    />
  );
};

export const FilterRefField: FC<IFilterField<ListItem>> = ({
  disabled,
  getRef,
  value,
  label,
  onChange,
  fieldName,
  entity,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (newValue: ListItem) => {
      onChange(fieldName, entity, newValue);
    },
    [fieldName, entity, onChange],
  );

  return (
    <RefBox
      getDataOptions={getRef as (sbstr: string) => Promise<DataItem<ListItem>>}
      label={label}
      value={value || null}
      variant="standard"
      onSelect={handleChange}
      optionSettings={REF_OPTIONS_SETINGS as OptionsSettings<ListItem>}
      noOptionsText={t("refs.noResults")}
      disabled={Boolean(disabled)}
      autocompleteProps={{
        "data-test-id": props["data-test-id"],
        "data-filter-field": fieldName,
        "data-filter-entity": entity,
      }}
    />
  );
};

export const FilterRefMultiField: FC<IFilterField<ListItem[]>> = ({
  disabled,
  getRef,
  value,
  label,
  onChange,
  fieldName,
  entity,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (newValue: ListItem[]) => {
      onChange(fieldName, entity, newValue);
    },
    [fieldName, entity, onChange],
  );

  return (
    <RefBox
      disabled={Boolean(disabled)}
      getDataOptions={getRef as (sbstr: string) => Promise<DataItem<ListItem>>}
      label={label}
      onSelect={handleChange}
      value={value || []}
      optionSettings={REF_OPTIONS_SETINGS}
      noOptionsText={t("refs.noResults")}
      multiple
      fullWidth
      autocompleteProps={{
        "data-test-id": props["data-test-id"],
        "data-filter-field": fieldName,
        "data-filter-entity": entity,
      }}
    />
  );
};

export const FilterUserField: FC<IFilterField<UserItem>> = ({
  disabled,
  getRef,
  value,
  label,
  onChange,
  fieldName,
  entity,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (newValue: UserItem) => {
      onChange(fieldName, entity, newValue);
    },
    [fieldName, entity, onChange],
  );

  return (
    <RefBox
      disabled={Boolean(disabled)}
      getDataOptions={getRef as (sbstr: string) => Promise<DataItem<UserItem>>}
      label={label}
      onSelect={handleChange}
      value={value || null}
      optionSettings={USERS_OPTIONS_SETTINGS}
      noOptionsText={t("refs.noResults")}
      requestMinSymbols={REQUEST_MIN_SYMBOLS_USERS}
      fullWidth
      autocompleteProps={{
        "data-test-id": props["data-test-id"],
        "data-filter-field": fieldName,
        "data-filter-entity": entity,
      }}
    />
  );
};

export const FilterContainerField: FC<IFilterField<ContainerItem>> = ({
  disabled,
  getRef,
  value,
  label,
  onChange,
  fieldName,
  entity,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (newValue: ContainerItem) => {
      onChange(fieldName, entity, newValue);
    },
    [fieldName, entity, onChange],
  );

  return (
    <RefBox
      disabled={Boolean(disabled)}
      getDataOptions={
        getRef as (sbstr: string) => Promise<DataItem<ContainerItem>>
      }
      label={label}
      onSelect={handleChange}
      value={value || null}
      optionSettings={CONTAINERS_OPTIONS_SETTINGS}
      noOptionsText={t("refs.noResults")}
      // requestMinSymbols={REQUEST_MIN_SYMBOLS_CONTAINERS}
      fullWidth
      variant="standard"
      autocompleteProps={{
        "data-test-id": props["data-test-id"],
        "data-filter-field": fieldName,
        "data-filter-entity": entity,
      }}
    />
  );
};

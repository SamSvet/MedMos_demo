import { FC, useEffect } from "react";
import { DatePicker } from "@mui/lab";
import {
  Checkbox,
  Grid,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { ListItem } from "../../../../../api/shared/common/list-item";
import { DataItem } from "../../../../../api/shared/common/response-data";
import { NumberFormatCustom } from "../../../../../components/NumberFormatCustom/NumberFormatCustom";
import { RefBox, OptionsSettings } from "../../../../../components/RefBox";
import { DATE_FORMAT_VIEW } from "../../../../../utils/date-utils";
import { IPositionAttrBase } from "./PositionAttributes.interfaces";
import { DateTextField } from "../../../../../components/DateTextField/DateTextField";
import { useDateTextFieldClear } from "../../../../../components/DateTextField/hooks/useDateTextFieldClear";
import { ContainerItem } from "../../../../../api/shared/common/container";
import { OrderAsideItem } from "../OrderAside/OrderAside";
import { useAsyncValue } from "react-router-dom";

export const PositionTextStaticField: FC<
  IPositionAttrBase & { direction: "row" | "column"; plainValue: string }
> = ({ label, value, update, direction, plainValue, children }) => {
  return (
    // <OrderAsideItem
    //   label={label}
    //   direction={direction}
    //   attr={(value as ListItem).name || ""}
    // />
    <Stack
      direction={direction}
      justifyContent="flex-start"
      alignItems="baseline"
      spacing={1}
    >
      <Typography variant="caption">{label}:</Typography>
      <Typography variant="body2">{plainValue}</Typography>
    </Stack>
  );
};
export const PositionTextField: FC<IPositionAttrBase> = ({
  value,
  label,
  id,
  required,
  update,
  error,
  errorText,
  readOnly,
  variant,
  disabled,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      value={value || ""}
      label={label}
      required={required}
      size="small"
      onChange={(e) => update && update(e.target.value)}
      error={error}
      helperText={errorText}
      variant={variant}
      disabled={disabled}
      InputProps={
        id === "count"
          ? {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: NumberFormatCustom as any,
              inputProps: {
                decimalScale: 0,
                allowNegative: false,
                autoComplete: "off",
                defaultValue: 0,
                isAllowed: (values: NumberFormatValues) => {
                  const val = values.floatValue!;
                  return val !== undefined && val <= 100;
                },
              },
              readOnly: readOnly,
            }
          : {
              readOnly: readOnly,
            }
      }
      data-testid="position-textField"
      data-test-id={props["data-test-id"]}
      data-position-attr-field={id}
    />
  );
};

export const PositionNumberField: FC<IPositionAttrBase> = ({
  value,
  label,
  id,
  required,
  update,
  error,
  errorText,
  readOnly,
  variant,
  disabled,
  minValue,
  maxValue,
  helperText,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      value={value || ""}
      label={label}
      required={required}
      onChange={(e) => update && update(e.target.value)}
      error={error}
      size="small"
      helperText={errorText ? errorText : helperText}
      variant={variant}
      disabled={disabled}
      InputProps={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputComponent: NumberFormatCustom as any,
        inputProps: {
          decimalScale: 0,
          allowNegative: false,
          autoComplete: "off",
          defaultValue: 0,
          isAllowed: (values: NumberFormatValues) => {
            if (!values.floatValue) {
              return true;
            }
            const val = values.floatValue!;
            const maxVal = maxValue ? maxValue : Number.MAX_SAFE_INTEGER;
            const minVal = minValue ? minValue : Number.MIN_SAFE_INTEGER;
            return val !== undefined && val <= maxVal && val >= minVal;
          },
        },
        readOnly: readOnly,
      }}
      data-testid="position-numberField"
      data-test-id={props["data-test-id"]}
      data-position-attr-field={id}
    />
  );
};

export const PositionDateField: FC<IPositionAttrBase> = ({
  value,
  label,
  id,
  required,
  update,
  error,
  errorText,
  minDate,
  maxDate,
  ...props
}) => {
  const { clearCustomValue, setClearCustomValue, datePickerOnAcceptHandler } =
    useDateTextFieldClear(value as Date, (value: Date | null) => {
      update && update(value);
    });

  return (
    <DatePicker
      mask="__.__.____"
      onAccept={datePickerOnAcceptHandler}
      onChange={() => {
        // Обязательный проп, поэтому оставляем его в качестве заглушки
        return true;
      }}
      value={(value as Date) || null}
      inputFormat={DATE_FORMAT_VIEW}
      minDate={minDate}
      maxDate={maxDate}
      allowSameDateSelection={true}
      renderInput={(params) => {
        return (
          <DateTextField
            textFieldParams={
              {
                ...params,
                "data-test-id": props["data-test-id"],
                "data-position-attr-field": id,
              } as unknown as TextFieldProps
            }
            modelParams={{
              dataTestID: "psoition-dateField",
              value: value as Date,
              label,
              required,
              update,
              error,
              errorText,
              clearCustomValue: clearCustomValue.current,
              clearCustomValueHandler: setClearCustomValue,
              minDate,
              maxDate,
            }}
          />
        );
      }}
    />
  );
};

export const PositionContainerField: FC<IPositionAttrBase> = ({
  value,
  label,
  id,
  required,
  update,
  error,
  errorText,
  variant,
  getDataOptions,
  optionSettings,
  readOnly,
  disabled,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <RefBox
      getDataOptions={
        getDataOptions as (
          substring: string,
        ) => Promise<DataItem<ContainerItem>>
      }
      label={label}
      value={(value as ContainerItem) || null}
      onSelect={update as (value: ContainerItem) => void}
      optionSettings={optionSettings as OptionsSettings<ContainerItem>}
      // requestMinSymbols={REQUEST_MIN_SYMBOLS_USERS}
      readOnly={readOnly}
      required={required}
      disabled={disabled}
      noOptionsText={t("refs.noResults")}
      error={error}
      helperText={errorText}
      variant={variant}
      fullWidth
      autocompleteProps={{
        "data-test-id": props["data-test-id"],
        "data-campaign-attr-field": id,
      }}
    />
  );
};

export const PositionRefField: FC<IPositionAttrBase> = ({
  value,
  label,
  id,
  required,
  update,
  error,
  errorText,
  variant,
  getDataOptions,
  optionSettings,
  readOnly,
  disabled,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <RefBox
      getDataOptions={
        getDataOptions as (substring: string) => Promise<DataItem<ListItem>>
      }
      label={label}
      value={(value as ListItem) || null}
      onSelect={update as (value: ListItem) => void}
      optionSettings={optionSettings as OptionsSettings<ListItem>}
      noOptionsText={t("refs.noResults")}
      required={required}
      readOnly={readOnly}
      error={error}
      variant={variant}
      disabled={disabled}
      helperText={errorText}
      autocompleteProps={{
        "data-test-id": props["data-test-id"],
        "data-position-attr-field": id,
      }}
    />
  );
};

export const PositionRefMultiField: FC<IPositionAttrBase> = ({
  value,
  label,
  id,
  required,
  update,
  error,
  errorText,
  getDataOptions,
  optionSettings,
  readOnly,
  disabled,
  variant,
  notDeletableOptions,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <RefBox
      getDataOptions={
        getDataOptions as (substring: string) => Promise<DataItem<ListItem>>
      }
      label={label}
      value={(value as ListItem[]) || []}
      onSelect={update as (value: ListItem[]) => void}
      optionSettings={optionSettings as OptionsSettings<ListItem>}
      noOptionsText={t("refs.noResults")}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      variant={variant}
      error={error}
      helperText={errorText}
      notDeletableOptions={notDeletableOptions as ListItem[]}
      multiple
      autocompleteProps={{
        "data-test-id": props["data-test-id"],
        "data-position-attr-field": id,
      }}
    />
  );
};

export const PositionRefModelField: FC<IPositionAttrBase> = ({
  value,
  label,
  id,
  required,
  update,
  error,
  errorText,
  getDataOptions,
  optionSettings,
  readOnly,
  disabled,
  linkAttr,
  notDeletableOptions,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={11}>
        <RefBox
          getDataOptions={
            getDataOptions as (substring: string) => Promise<DataItem<ListItem>>
          }
          label={label}
          value={(value as ListItem[]) || []}
          onSelect={update as (value: ListItem[]) => void}
          optionSettings={optionSettings as OptionsSettings<ListItem>}
          noOptionsText={t("refs.noResults")}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          error={error}
          helperText={errorText}
          notDeletableOptions={notDeletableOptions as ListItem[]}
          multiple
          autocompleteProps={{
            "data-test-id": props["data-test-id"],
            "data-psoition-attr-field": id,
          }}
        />
      </Grid>
      {linkAttr && (
        <Grid
          item
          xs={1}
          key={linkAttr.id}
          data-testid="textField-model-checkbox"
        >
          <Checkbox
            disabled={linkAttr.disabled}
            id={linkAttr.id}
            onChange={(e) =>
              linkAttr.update && linkAttr.update(e.target.checked)
            }
            checked={linkAttr.checked as boolean}
            data-test-id={props["data-test-id"]}
            data-position-attr-field={linkAttr.id}
          />
        </Grid>
      )}
    </Grid>
  );
};

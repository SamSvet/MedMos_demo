import {
  HTMLAttributes,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 } from "uuid";
import debounce from "lodash.debounce";
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  Paper,
} from "@mui/material";
import { RefBoxRenderInput } from "./RefBoxRenderInput";
import { OptionsSettings, useOptionsLogic } from "./RefBox.logic";
import { RefBoxChip } from "./RefBoxChip";
import { RefBoxAddOption } from "./RefBoxAddOption";
import { REFBOX_TEST_IDS } from "./test-ids";

interface IRefBoxBase<DATATYPE> {
  label: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  variant?: "standard" | "filled" | "outlined";
  noOptionsText: string;
  newOptionText?: (optionName: string) => string;
  optionSettings: OptionsSettings<DATATYPE>;
  getDataOptions: (substring: string) => Promise<DATATYPE[]>;
  onCreateNewOption?: (optionName: string) => DATATYPE;
  requestMinSymbols?: number;
  autocompleteProps?: Partial<
    AutocompleteProps<DATATYPE, boolean, boolean, boolean>
  > &
    Partial<{ [key: string]: string }>;
}
interface IRefBoxSingle<DATATYPE> extends IRefBoxBase<DATATYPE> {
  value: DATATYPE | null;
  onSelect: (selected: DATATYPE) => void;
  multiple?: false;
  notDeletableOptions?: undefined;
  noOptionDeselecting?: undefined;
}
interface IRefBoxMultiple<DATATYPE> extends IRefBoxBase<DATATYPE> {
  value: DATATYPE[] | null;
  onSelect: (selected: DATATYPE[]) => void;
  multiple: true;
  notDeletableOptions?: DATATYPE[];
  noOptionDeselecting?: boolean;
}

export function RefBox<DATATYPE>(props: IRefBoxSingle<DATATYPE>): ReactElement;
export function RefBox<DATATYPE>(
  props: IRefBoxMultiple<DATATYPE>,
): ReactElement;
export function RefBox<DATATYPE>({
  onSelect,
  label,
  error,
  disabled,
  readOnly,
  value,
  helperText,
  fullWidth,
  variant,
  noOptionsText,
  newOptionText,
  getDataOptions,
  optionSettings,
  onCreateNewOption,
  multiple,
  required,
  requestMinSymbols,
  notDeletableOptions,
  noOptionDeselecting,
  autocompleteProps: additionalAutocompleteProps,
}: IRefBoxMultiple<DATATYPE> | IRefBoxSingle<DATATYPE>): ReactElement {
  const id = useMemo(v4, []);

  const [loading, setLoading] = useState(false);
  const [substring, setSubstring] = useState("");

  const {
    options,
    getOptionValues,
    handleLoadedOptions,
    createNewOption,
    getOptionLabel,
    isOptionEqualToValue,
  } = useOptionsLogic(value, optionSettings, onCreateNewOption);

  /* #region Введение строки для поиска и загрузка списка значений */

  // eslint-disable-next-line
  const getOptions = useCallback(
    debounce((substring: string) => {
      setLoading(true);
      getDataOptions(substring)
        .then((resOptions) => handleLoadedOptions(resOptions))
        .finally(() => setLoading(false));
    }, 500),
    [],
  );

  const getOptionsIfPossible = useCallback(
    (substring: string) => {
      if (!requestMinSymbols) {
        getOptions(substring);
      } else {
        substring && getOptions(substring);
      }
    },
    [getOptions, requestMinSymbols],
  );

  useEffect(() => {
    return () => {
      getOptions.cancel();
    };
  }, [getOptions]);

  const handleInputChange = useCallback(
    (e: SyntheticEvent<Element, Event>, value: string) => {
      if (!e || (requestMinSymbols && value?.length < requestMinSymbols)) {
        return;
      }
      setSubstring(value);
      getOptionsIfPossible(value);
    },
    [getOptionsIfPossible, requestMinSymbols],
  );

  const checkNotPermitted = useCallback(
    (e: KeyboardEvent, changedVal: DATATYPE | DATATYPE[]) => {
      if (Array.isArray(changedVal) && e.code === "Backspace") {
        const diff = (value as DATATYPE[]).filter(
          (v) =>
            !(changedVal as DATATYPE[]).some(
              (cv) => cv[optionSettings.key] !== v[optionSettings.key],
            ),
        );
        if (
          diff.length === 1 &&
          notDeletableOptions?.some(
            (opt) => opt[optionSettings.key] === diff[0][optionSettings.key],
          )
        ) {
          return true;
        }
      }
      return false;
    },
    [notDeletableOptions, optionSettings.key, value],
  );

  const handleChange = useCallback(
    (
      e: SyntheticEvent<Element, Event>,
      changedVal:
        | string
        | DATATYPE
        | NonNullable<DATATYPE>
        | (string | DATATYPE)[]
        | null,
    ) => {
      const isNotPermited = checkNotPermitted(
        e.nativeEvent as KeyboardEvent,
        changedVal as DATATYPE | DATATYPE[],
      );
      if (isNotPermited) {
        return;
      }

      if (
        notDeletableOptions?.length &&
        Array.isArray(changedVal) &&
        !changedVal.length
      ) {
        changedVal = notDeletableOptions;
      }
      onSelect(changedVal as DATATYPE & DATATYPE[]);
    },
    [checkNotPermitted, notDeletableOptions, onSelect],
  );

  /* #endregion */

  /* #region Создание нового значения */

  const handleCreateNewOption = useCallback(() => {
    const selected = createNewOption(substring, multiple);
    if (selected) {
      onSelect(selected as DATATYPE & DATATYPE[]);
    }
  }, [createNewOption, multiple, onSelect, substring]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.key === "Enter" && handleCreateNewOption();
    },
    [handleCreateNewOption],
  );

  /* #endregion */

  /* #region Рендер Autocomplete */

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <RefBoxRenderInput
        {...params}
        label={label}
        required={required}
        readOnly={readOnly}
        error={error}
        variant={variant}
        helperText={helperText}
        loading={loading}
      />
    ),
    [error, helperText, label, loading, readOnly, required, variant],
  );

  const renderTags = useCallback(
    (value: DATATYPE[], getTagProps: AutocompleteRenderGetTagProps) =>
      value?.map((option, index) => {
        const { value, key, isUnavailable } = getOptionValues(option);
        const isNotDeletable = Boolean(
          notDeletableOptions?.find(
            (o) => o[optionSettings.key] === option[optionSettings.key],
          ),
        );
        return (
          <span key={String(key)}>
            <RefBoxChip
              value={value}
              isUnavailable={isUnavailable}
              readOnly={readOnly}
              notDeletable={isNotDeletable}
              {...getTagProps({ index })}
              data-chip-key={key}
              data-test-id={REFBOX_TEST_IDS.chip}
            />
          </span>
        );
      }),
    [getOptionValues, notDeletableOptions, optionSettings.key, readOnly],
  );

  const renderOption = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: DATATYPE) => {
      const { key, value } = getOptionValues(option);
      return (
        <li
          {...props}
          key={String(key)}
          data-option-key={key}
          data-test-id={REFBOX_TEST_IDS.option}
          onClick={(e) => {
            if (!multiple || !(props["aria-selected"] && noOptionDeselecting)) {
              props.onClick && props.onClick(e);
            }
          }}
        >
          {value}
        </li>
      );
    },
    [getOptionValues, multiple, noOptionDeselecting],
  );

  const renderPaper = useCallback(
    (props) => {
      const show =
        substring &&
        onCreateNewOption &&
        options.every((opt) => getOptionValues(opt).value !== substring);
      const linkText =
        (newOptionText && newOptionText(substring)) || `Add ${substring}`;
      return (
        <Paper {...props}>
          {show && (
            <RefBoxAddOption
              onCreateNewOption={handleCreateNewOption}
              text={linkText}
            />
          )}
          {props.children}
        </Paper>
      );
    },
    [
      getOptionValues,
      handleCreateNewOption,
      newOptionText,
      onCreateNewOption,
      options,
      substring,
    ],
  );

  /* #endregion */

  return (
    <Autocomplete
      id={id}
      options={options as DATATYPE[]}
      value={value}
      renderInput={renderInput}
      renderTags={renderTags}
      renderOption={renderOption}
      noOptionsText={noOptionsText}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyPress={handleKeyPress}
      onFocus={() => getOptionsIfPossible(substring)}
      onBlur={() => {
        setSubstring("");
        handleLoadedOptions([]);
      }}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      multiple={multiple}
      disabled={disabled}
      disableClearable={readOnly}
      freeSolo={readOnly}
      fullWidth={fullWidth}
      size={"small"}
      data-testid="test-refBox"
      PaperComponent={renderPaper}
      sx={{
        ...(readOnly && {
          pointerEvents: "none",
        }),
      }}
      {...additionalAutocompleteProps}
    />
  );
}

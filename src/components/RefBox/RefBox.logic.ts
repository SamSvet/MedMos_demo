import { useCallback, useMemo, useState } from "react";

export interface OptionsSettings<DATATYPE> {
  value: keyof DATATYPE | ((option: DATATYPE) => string);
  key: keyof DATATYPE;
  unavailable?: keyof DATATYPE | ((option: DATATYPE) => boolean);
}

export const useOptionsLogic = <DATATYPE>(
  value: DATATYPE | DATATYPE[] | null,
  optionSettings: OptionsSettings<DATATYPE>,
  onCreateNewOption?: (optionName: string) => DATATYPE,
) => {
  const [loadedOptions, setLoadedOptions] = useState<DATATYPE[]>(
    // !value ? [] : Array.isArray(value) ? value : [value]
    [],
  );
  const [createdOptions, setCreatedOptions] = useState<DATATYPE[]>([]);

  const options = useMemo(() => {
    return [...createdOptions, ...loadedOptions];
  }, [createdOptions, loadedOptions]);

  const getOptionValues = useCallback(
    (option: DATATYPE) => {
      return {
        key: option[optionSettings.key],
        value:
          typeof optionSettings.value === "function"
            ? optionSettings.value(option)
            : option[optionSettings.value],
        isUnavailable: Boolean(
          typeof optionSettings.unavailable === "function"
            ? optionSettings.unavailable(option)
            : optionSettings.unavailable && option[optionSettings.unavailable],
        ),
      };
    },
    [optionSettings],
  );

  const isOptionEqualToValue = useCallback(
    (option: DATATYPE, value: DATATYPE | DATATYPE[]) => {
      const val: DATATYPE = Array.isArray(value) ? value[0] : value;
      return option[optionSettings.key] === val?.[optionSettings.key];
    },
    [optionSettings.key],
  );

  const getOptionLabel = useCallback(
    (option: DATATYPE | DATATYPE[]) => {
      const opt = Array.isArray(option) ? option[0] : option;
      if (!opt) {
        return "";
      }
      const { value } = getOptionValues(opt);
      return String(value);
    },
    [getOptionValues],
  );

  const handleLoadedOptions = useCallback((loadedOptions: DATATYPE[]) => {
    setLoadedOptions(loadedOptions);
  }, []);

  const createNewOption: (
    substring: string,
    multiple?: boolean,
  ) => typeof value | null = useCallback(
    (substring: string, multiple?: boolean) => {
      if (!onCreateNewOption) {
        return null;
      }

      const foundExactValues = options.filter((opt) => {
        const { value, isUnavailable } = getOptionValues(opt);
        return !isUnavailable && value === substring;
      });

      if (foundExactValues.length > 1) {
        return null;
      }

      let selected: typeof value | null = multiple
        ? [...((value || []) as DATATYPE[])]
        : null;

      if (foundExactValues.length === 1) {
        // Если существует единственный вариант в options,
        // соответствующий значению в поисковой строке, то выбираем его.
        selected = multiple
          ? [...(selected as DATATYPE[]), foundExactValues[0]]
          : foundExactValues[0];
      }

      if (!foundExactValues.length) {
        // Если значение не существует в options, то создаем новое
        const newCreatedOption = onCreateNewOption(substring);
        setCreatedOptions([...createdOptions, newCreatedOption]);
        selected = multiple
          ? [...(selected as DATATYPE[]), newCreatedOption]
          : newCreatedOption;
      }

      return selected;
    },
    [createdOptions, getOptionValues, onCreateNewOption, options, value],
  );

  return {
    options,
    handleLoadedOptions,
    createNewOption,
    isOptionEqualToValue,
    getOptionLabel,
    getOptionValues,
  };
};

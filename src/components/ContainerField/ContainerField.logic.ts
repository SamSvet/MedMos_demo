import { useCallback, useMemo, useState } from "react";
import { ContainerItem } from "../../api/shared/common/container";

export interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

export interface ContainerItemSelect extends ContainerItem {
  inputValue?: string;
}

export interface ContainerOptionType {
  inputValue?: string;
  title: string;
  year: Date | null;
}

export type ContainerBadAttributes<T> = {
  [field in keyof T]?: string[];
};

// export interface ContainerBadAttributes<T> extends BadAttributesMap {
//   containers: {
//     [key in keyof T]?: string | string[];
//   }[];
// }

export const useContainerField = <T extends ContainerItem>(
  value: T | null,
  // createNewOption?: (
  //   optionName: T,
  // ) => Promise<OptionsCreateType<ContainerItemSelect>>,
) => {
  const [loadedOptions, setLoadedOptions] = useState<T[]>([]);
  // const [createdOptions, setCreatedOptions] = useState<T[]>([]);
  const [badAttributes, setBadAttributes] =
    useState<ContainerBadAttributes<T> | null>(null);

  const options = useMemo(() => {
    return [...loadedOptions];
  }, [loadedOptions]);

  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<T | null>(null);

  // const handleAddNewOption = useCallback(
  //   (dialogValue: T) => {
  //     setCreatedOptions([...createdOptions, dialogValue]);
  //     createNewOption &&
  //       createNewOption(dialogValue)
  //         .catch((e) => console.log(e))
  //         .finally(() => collapsibleCLose());
  //   },
  //   [collapsibleCLose, createdOptions, createNewOption],
  // );

  const handleLoadedOptions = useCallback((loadedOptions: T[]) => {
    setLoadedOptions(loadedOptions);
  }, []);

  const handleBadAttributes = useCallback(
    (badAttributes: ContainerBadAttributes<T> | null) => {
      setBadAttributes(badAttributes);
    },
    [],
  );

  const isOptionEqualToValue = useCallback((option: T, value: T) => {
    return option.id === value.id;
  }, []);

  // const getOptionLabel = useCallback(
  //   (option: T) => {
  //     const opt = Array.isArray(option) ? option[0] : option;
  //     if (!opt) {
  //       return "";
  //     }
  //     const { value } = getOptionValues(opt);
  //     return String(value);
  //   },
  //   [getOptionValues],
  // );

  return {
    open,
    setOpen,
    dialogValue,
    setDialogValue,
    options,
    handleLoadedOptions,
    isOptionEqualToValue,
    handleBadAttributes,
    badAttributes,

    // valueOption,
    // setValueOption,
    // collapsibleCLose,
    // open,
    // setOpen,
    // dialogValue,
    // setDialogValue,
    // isOptionEqualToValue,
    // setCreatedOptions,
    // setLoadedOptions,
    // options,
    // handleLoadedOptions,
    // handleBadAttributes,
    // badAttributes,
  };
};

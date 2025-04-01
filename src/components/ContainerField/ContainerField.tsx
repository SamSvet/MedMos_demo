import React, {
  HTMLAttributes,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { ContainerItemSelect, useContainerField } from "./ContainerField.logic";
import { dateToStr } from "../../utils/date-utils";
import debounce from "lodash.debounce";
import { DataItem } from "../../api/shared/common/response-data";
import { OptionsCreateType } from "../../pages/Orders/common/components/PositionAttributes/PositionAttributes.interfaces";
import { ContainerFieldInput } from "./ContainerFieldInput";
import { ContainerFieldCollapse } from "./ContainerFieldCollapse";
import {
  ContainerDateRenderGroup,
  ContainerDateRenderOption,
  GroupHeader,
  GroupItems,
} from "./ContainerDateRenderHelpers";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
function insert<T>(data: T) {
  console.log(data);
}

function defaultInsert<T, D extends keyof T>(
  data:
    | {
        [key in Exclude<keyof T, D>]: T[key];
      }
    | {
        [key in D]?: T[key];
      },
  defaults: { [key in D]: T[key] },
): void {
  // Hover over this variable to see its type
  const doc = { ...data, ...defaults } as T;
  insert<T>(doc);
}
const filter = createFilterOptions<ContainerItemSelect>();

export default function ContainerField({
  value,
  noOptionsText,
  onSelect,
  createNewOption,
  getDataOptions,
}: {
  value: ContainerItemSelect | null;
  noOptionsText: string;
  onSelect: (selected: ContainerItemSelect | null) => void;
  getDataOptions: (substring: string) => Promise<DataItem<ContainerItemSelect>>;
  createNewOption?: (
    optionName: ContainerItemSelect,
  ) => Promise<OptionsCreateType<ContainerItemSelect>>;
}) {
  const [loading, setLoading] = useState(false);
  const [loadingNewOption, setLoadingNewOption] = useState(false);

  const {
    open,
    setOpen,
    dialogValue,
    setDialogValue,
    options,
    handleLoadedOptions,
    isOptionEqualToValue,
    handleBadAttributes,
    badAttributes,
  } = useContainerField(value);

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

  const addNewOption = useCallback(
    (newOption: ContainerItemSelect) => {
      if (!createNewOption) {
        return;
      }
      setLoadingNewOption(true);
      createNewOption(newOption)
        .then((resOption) => {
          handleLoadedOptions([...options, ...resOption.data]);
          handleBadAttributes(
            resOption.bad_attributes ? resOption.bad_attributes : null,
          );
          if (!resOption.bad_attributes) {
            setOpen(false);
            onSelect(resOption.data[0]);
          }
        })
        .finally(() => setLoadingNewOption(false));
    },
    [
      createNewOption,
      handleBadAttributes,
      handleLoadedOptions,
      onSelect,
      options,
      setOpen,
    ],
  );

  useEffect(() => {
    return () => {
      getOptions.cancel();
      setDialogValue(null);
      handleLoadedOptions([]);
    };
  }, [getOptions, handleLoadedOptions, setDialogValue]);

  const handleInputChange = useCallback(
    (e: SyntheticEvent<Element, Event>, value: string) => {
      if (!e || ["click", "blur"].includes(e.type) || loading) {
        return;
      }
      if (value) {
        setOpen(false);
      }

      getOptions(value);
    },
    [getOptions, loading, setOpen],
  );

  const handleChange = useCallback(
    (
      e: SyntheticEvent<Element, Event>,
      changedVal: string | ContainerItemSelect | null,
    ) => {
      if (typeof changedVal === "string") {
        // timeout to avoid instant validation of the dialog's form.
        setTimeout(() => {
          setOpen(true);
          setDialogValue((prev) => ({
            id: prev?.id || "",
            plan_delivery_dt: null,
            name: changedVal,
          }));
        });
      } else if (changedVal && changedVal.inputValue) {
        setOpen(true);
        onSelect(null);
        setDialogValue((prev) => ({
          id: prev?.id || "",
          plan_delivery_dt: null,
          name: changedVal.inputValue!,
        }));
      } else {
        onSelect(changedVal as ContainerItemSelect);
      }
    },
    [onSelect, setDialogValue, setOpen],
  );

  return (
    <React.Fragment>
      <Autocomplete
        //disablePortal
        selectOnFocus
        //clearOnBlur
        //handleHomeEndKeys
        //freeSolo
        id="free-solo-dialog-demo"
        options={options}
        value={value}
        size="small"
        noOptionsText={noOptionsText}
        // loading={loading}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => (
          <ContainerFieldInput props={params} loading={loading} />
        )}
        renderOption={(props: HTMLAttributes<HTMLLIElement>, option) => (
          <ContainerDateRenderOption
            key={option.name}
            props={props}
            option={option}
          />
        )}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return option.name;
        }}
        groupBy={(option) => "Имя"}
        renderGroup={(params) => (
          <ContainerDateRenderGroup key={params.key} props={params} />
        )}
        onChange={handleChange}
        onFocus={(e) => handleInputChange(e, dialogValue?.inputValue || "")}
        onInputChange={handleInputChange}
        // onBlur={(e) => {
        //   handleLoadedOptions([]);
        // }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.name,
          );

          if (
            params.inputValue !== "" &&
            filtered.length === 0 &&
            !isExisting &&
            !loading
          ) {
            filtered.push({
              id: "",
              inputValue: inputValue,
              name: `Добавить "${params.inputValue}"`,
              plan_delivery_dt: "",
            });
          }

          return filtered;
        }}
      />
      <ContainerFieldCollapse
        value={dialogValue}
        isOpen={open}
        isLoading={loadingNewOption}
        badAttributes={badAttributes}
        handleTextChange={(event) => {
          setDialogValue((prev) => ({
            id: prev?.id || "",
            plan_delivery_dt: prev?.plan_delivery_dt || null,
            name: event.target.value,
          }));
          badAttributes?.name &&
            handleBadAttributes({ ...badAttributes, name: undefined });
        }}
        handleDateChange={(newDateValue: Date | null) => {
          setDialogValue((prev) => ({
            id: prev?.id || "",
            name: prev?.name || "",
            plan_delivery_dt: dateToStr(newDateValue),
          }));
          badAttributes?.plan_delivery_dt &&
            handleBadAttributes({
              ...badAttributes,
              plan_delivery_dt: undefined,
            });
        }}
        handleAddNewOption={() => {
          addNewOption(dialogValue!);
        }}
        closeCollapsible={() => {
          setOpen(false);
          handleBadAttributes(null);
        }}
        clearField={(key: keyof ContainerItemSelect) => {
          setDialogValue((prev) => {
            if (!prev) {
              return null;
            }
            return {
              ...prev,
              [key]: "",
            };
          });
          handleBadAttributes({
            ...badAttributes,
            [key]: undefined,
          });
        }}
      />
    </React.Fragment>
  );
}

// const personDefaults = { name: "name" };

// defaultInsert<ContainerItemSelect, keyof typeof personDefaults>(
//   { id: "1", name: "Person1" },
//   personDefaults,
// );

// defaultInsert<ContainerItemSelect, keyof typeof personDefaults>(
//   { id: "1", name: "Person1", plan_delivery_dt: "a" },
//   personDefaults,
// );

// defaultInsert<ContainerItemSelect, keyof typeof personDefaults>(
//   { id: "1", name: "Person1", plan_delivery_dt: "true", sound: "oink" },
//   personDefaults,
// );

// defaultInsert<ContainerItemSelect, keyof typeof personDefaults>(
//   { id: 1 },
//   personDefaults,
// );

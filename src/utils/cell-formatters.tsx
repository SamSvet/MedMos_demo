import { formatDate } from "./date-utils";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

export const dateFormatter = formatDate;

export const listItemFormatter = (value: unknown = []) => {
  if (!value) {
    return "";
  }
  const isArr = Array.isArray(value);
  if (
    (isArr && !value.every((v) => v.name)) ||
    (!isArr && !(value as { name: string })?.name)
  ) {
    throw new Error(`wrong formatter for ${value}`);
  }
  return isArr
    ? (value as { name: string }[]).map((item) => item.name).join(", ")
    : (value as { name: string }).name;
};

export const numberFormatter = (value?: unknown) => {
  const convertedValue = parseFloat(value as string);
  if (isNaN(convertedValue)) {
    return "";
  }
  return String(convertedValue);
};

export const booleanFormatter = (value?: unknown) => {
  switch (value) {
    case true:
      return <CheckCircle />;
    case false:
      return <RadioButtonUnchecked />;
    default:
      return "";
  }
};

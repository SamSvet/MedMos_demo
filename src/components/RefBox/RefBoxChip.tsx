import { AutocompleteRenderGetTagProps, Chip } from "@mui/material";
import { useMemo } from "react";

interface RefBoxChipProps<DATATYPE>
  extends ReturnType<AutocompleteRenderGetTagProps> {
  isUnavailable?: boolean;
  value: string | DATATYPE[keyof DATATYPE];
  readOnly?: boolean;
  notDeletable?: boolean;
}
export const RefBoxChip = <DATATYPE,>({
  isUnavailable,
  value,
  readOnly,
  notDeletable,
  ...props
}: RefBoxChipProps<DATATYPE>) => {
  const chipAdditionalProps = useMemo(() => {
    return {
      ...((readOnly || notDeletable) && { onDelete: undefined }),
      sx: {
        color: isUnavailable ? "#d32f2f" : "inherit",
        border: isUnavailable ? "1px solid #d32f2f" : "inherit",
      },
    };
  }, [isUnavailable, notDeletable, readOnly]);

  return (
    <Chip
      size="small"
      label={value}
      {...props}
      {...chipAdditionalProps}
      data-testid="test-refbox-chip"
    />
  );
};

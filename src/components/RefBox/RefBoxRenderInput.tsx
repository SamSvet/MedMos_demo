import {
  AutocompleteRenderInputParams,
  CircularProgress,
  TextField,
} from "@mui/material";
import { FC } from "react";

interface IRefBoxRenderInputProps extends AutocompleteRenderInputParams {
  label: string;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
  variant?: "standard" | "filled" | "outlined";
}

export const RefBoxRenderInput: FC<IRefBoxRenderInputProps> = ({
  label,
  required,
  readOnly,
  error,
  helperText,
  loading,
  variant,
  ...params
}) => {
  return (
    <TextField
      {...params}
      label={label}
      required={required}
      error={error}
      variant={variant}
      helperText={helperText}
      // placeholder="Favorites"
      InputProps={{
        ...params.InputProps,
        readOnly,
        endAdornment: (
          <>
            {loading ? (
              <CircularProgress
                color="inherit"
                size={15}
                data-testid="test-refBox-progressIcon"
              />
            ) : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
      data-testid="test-refBox-input"
    />
  );
};

import { CircularProgress, TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ContainerFieldInput: FC<{
  props: TextFieldProps;
  loading: boolean;
}> = ({ props, loading }) => {
  const { t } = useTranslation();
  return (
    <TextField
      {...props}
      variant="filled"
      label={t("table.header.container")}
      // inputProps={{ readOnly: true }}
      // helperText={
      //   value &&
      //   `Плановая дата доставки ${formatDate(value?.plan_delivery_dt)}`
      // }
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <>
            {loading ? (
              <CircularProgress
                color="primary"
                size={20}
                sx={{
                  position: "absolute",
                  right: "30px",
                  top: "calc(50% - 10px)",
                }}
              />
            ) : null}

            {props.InputProps?.endAdornment}
          </>
        ),
      }}
    ></TextField>
  );
};

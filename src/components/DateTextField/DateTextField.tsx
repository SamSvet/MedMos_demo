import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { TextField, TextFieldProps, Tooltip } from "@mui/material";
import { dateIsValid, formatDate } from "../../utils/date-utils";
import { useSetToolTip } from "../../hooks/useSetToolTip";

interface ModelParams {
  dataTestID: string;
  label: string;
  value: Date;
  clearCustomValue: boolean;
  clearCustomValueHandler: (clearValue: boolean) => void;
  required?: boolean;
  update?: (date: Date | null) => void;
  error?: boolean;
  errorText?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const DateTextField: FC<{
  textFieldParams: TextFieldProps;
  modelParams: ModelParams;
}> = ({ textFieldParams, modelParams }) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const { shouldRenderToolTip, handleClose, handleOpen, open } =
    useSetToolTip(labelRef);

  // Эти ref и state используются для отображения предыдущего валидного значения
  const customDate = useRef("");
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    if (modelParams.clearCustomValue) {
      // Не показываем customDate, если пользователь выбрал дату из календаря
      setShowCustom(false);
      modelParams.clearCustomValueHandler(false);
    }
  }, [modelParams]);

  const onBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Обновляем дату только при потере фокуса с input
      if (dateIsValid(e.target.value)) {
        const minDate = modelParams.minDate
          ? modelParams.minDate
          : new Date("0001-01-01");
        const maxDate = modelParams.maxDate
          ? modelParams.maxDate
          : new Date("5001-01-01");
        // Если дата валидна и лежит в границах (minDate, maxDate),
        // обновляем значение в модели через вызов метода update
        const [day, month, year] = e.target.value.split(".");
        const date = new Date(`${year}-${month}-${day}`);
        if (minDate < date && date < maxDate) {
          modelParams.update && modelParams.update(date);
          return;
        }
      }

      // Если дата не валидна =>
      setShowCustom(true);
      const prevValidValue = modelParams.value as Date;
      if (e.target.value === "") {
        // => и отсутствует пердыдущее валидное значение или пользователь очистил input,
        // то обновим значение в модели на null и очистим input

        customDate.current = "";
        if (prevValidValue) {
          modelParams.update && modelParams.update(null);
        }
        return;
      }
      // => и есть пердыдущее валидное значение,
      // то восстановим предыдущее значение в модели и в input
      modelParams.update && modelParams.update(prevValidValue);
      customDate.current = formatDate(prevValidValue);
    },
    [modelParams],
  );

  return (
    <Tooltip
      title={modelParams.label}
      placement={"top"}
      arrow
      open={open && shouldRenderToolTip}
      onOpen={handleOpen}
      onMouseLeave={handleClose}
    >
      <TextField
        {...textFieldParams}
        inputProps={{
          ...textFieldParams.inputProps,
          // Если установлен флаг showCustom, то позываем customDate в input,
          // иначе показываем то, что прислал DatePicker
          value: showCustom
            ? customDate.current
            : textFieldParams.inputProps?.value,
        }}
        InputLabelProps={{ ref: labelRef }}
        sx={{
          "& label:not(.Mui-focused):not(.MuiFormLabel-filled)": {
            maxWidth: "calc(100% - 48px)",
          },
        }}
        onBlur={onBlurHandler}
        onChange={() => {
          // Если пользователь вручную меняет input,
          // то в нем должно отоброжаться то, что присылает DatePicker
          if (showCustom) {
            setShowCustom(false);
          }
        }}
        variant="standard"
        label={modelParams.label}
        required={modelParams.required}
        error={modelParams.error || textFieldParams.error}
        helperText={modelParams.errorText}
        fullWidth
        data-testid={modelParams.dataTestID}
      />
    </Tooltip>
  );
};

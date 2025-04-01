import { useCallback, useEffect, useRef } from "react";

// value - значение DatePicker
// handleChange - метод, который обновит модель в момент,
// когда пользователь указал валидное значение
export const useDateTextFieldClear = (
  value: Date | null,
  handleChange: (newValue: Date | null) => void
) => {
  const clearCustomValue = useRef(false);

  // Если пользователь очистил значение в DatePicker,
  // то мы должны очистить кастомное значение
  useEffect(() => {
    if (!value) {
      clearCustomValue.current = true;
    }
  }, [value]);

  // Используем этот метод, чтобы сбросить значение флага clearCustomValue
  const setClearCustomValue = useCallback((value: boolean) => {
    clearCustomValue.current = value;
  }, []);

  // Если пользователь выбрад значение в DatePicker из календаря,
  // то мы должны очистить кастомное значение
  const datePickerOnAcceptHandler = useCallback(
    (value: Date | null) => {
      handleChange(value);
      clearCustomValue.current = true;
    },
    [handleChange]
  );

  // clearCustomValue - индикатор того, что мы должны убрать кастомное значение в input
  // setClearCustomValue - метод, позволяющий вернуть clearCustomValue в исходное значение
  // datePickerOnAcceptHandler - обработчик, вызывающийся когда DatePicker принял валидное значение
  return { clearCustomValue, setClearCustomValue, datePickerOnAcceptHandler };
};

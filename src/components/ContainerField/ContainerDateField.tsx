import { useState, useRef } from "react";
import { StaticDatePicker } from "@mui/lab";
import Paper from "@mui/material/Paper";
import { Box, ClickAwayListener, TextField } from "@mui/material";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import { strToDate } from "../../utils/date-utils";
import {
  ContainerBadAttributes,
  ContainerItemSelect,
} from "./ContainerField.logic";
import { ContainerItem } from "../../api/shared/common/container";
import { ErrorToolTip } from "../ToolTip/ErrorToolTip";
import { ContainerDateBtnGroup } from "./ContainerDateBtnGroup";

export default function ContainerDateField({
  collapsibleCLose,
  handleAddNewOption,
  handleDateChange,
  dialogValue,
  badAttributes,
  clearField,
}: {
  collapsibleCLose: () => void;
  handleAddNewOption: () => void;
  handleDateChange: (newDateValue: Date | null) => void;
  dialogValue: ContainerItem | null;
  badAttributes: ContainerBadAttributes<ContainerItemSelect> | null;
  clearField: () => void;
}) {
  const anchorRef = useRef<HTMLInputElement>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleClick = () => {
    setCalendarVisible((prev) => !prev);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setCalendarVisible(false);
  };

  return (
    <Box
      id="ssv-textfield"
      sx={{ "& div[data-popper-placement]": { zIndex: 2 } }}
    >
      <ErrorToolTip
        title={`${badAttributes?.plan_delivery_dt?.join(",") || ""}`}
        disableInteractive
      >
        <TextField
          ref={anchorRef}
          sx={{ width: "100%" }}
          error={!!badAttributes?.plan_delivery_dt}
          value={
            dialogValue?.plan_delivery_dt
              ?.split("T")[0]
              .split("-")
              .reverse()
              .join(".") || ""
          }
          label="плановая дата доставки"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCalendarVisible((prev) => !prev);
          }}
          variant="standard"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <ContainerDateBtnGroup
                collapsibleCLose={collapsibleCLose}
                handleAddNewOption={handleAddNewOption}
                clearField={clearField}
              />
            ),
          }}
        />
      </ErrorToolTip>
      <Popper
        open={calendarVisible}
        anchorEl={anchorRef.current}
        placement="bottom"
        modifiers={[
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
        ]}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper id="ssv_paper">
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <StaticDatePicker
                    disableCloseOnSelect={false}
                    showToolbar={false}
                    value={strToDate(dialogValue?.plan_delivery_dt) || null}
                    onAccept={handleClick}
                    onChange={(newValue) => {
                      handleDateChange(newValue!);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

// <DatePicker
//       mask="__.__.____"
//       onAccept={datePickerOnAcceptHandler}
//       onChange={() => {
//         // Обязательный проп, поэтому оставляем его в качестве заглушки
//         return true;
//       }}
//       value={(value as Date) || null}
//       inputFormat={DATE_FORMAT_VIEW}
//       minDate={minDate}
//       maxDate={maxDate}
//       allowSameDateSelection={true}
//       renderInput={(params) => {
//         return (
//           <DateTextField
//             textFieldParams={
//               {
//                 ...params,

//                 "data-test-id": props["data-test-id"],
//                 "data-position-attr-field": id,
//               } as unknown as TextFieldProps
//             }
//             modelParams={{
//               dataTestID: "psoition-dateField",
//               value: value as Date,
//               label,
//               required,
//               update,
//               error,
//               errorText,
//               clearCustomValue: clearCustomValue.current,
//               clearCustomValueHandler: setClearCustomValue,
//               minDate,
//               maxDate,
//             }}
//           />

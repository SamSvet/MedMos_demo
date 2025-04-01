import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { DefinedRange, DateRange } from "./DateRange.types";
import { isSameDay } from "date-fns";

type DefinedRangesProps = {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
};

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

export const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = (
  props,
) => {
  return (
    <List sx={{ width: "max-content" }}>
      {props.ranges.map((range, idx) => (
        <ListItemButton key={idx} onClick={() => props.setRange(range)}>
          <ListItemText
            primaryTypographyProps={{
              variant: "body2",
              style: {
                fontWeight: isSameRange(range, props.selectedRange)
                  ? "bold"
                  : "normal",
              },
            }}
          >
            {range.label}
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
};

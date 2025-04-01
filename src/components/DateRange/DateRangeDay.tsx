import * as React from "react";
import {
  IconButton,
  Typography,
  Theme,
  createStyles,
  withStyles,
  Box,
  BoxProps,
  styled,
} from "@mui/material";
// import { createStyles, withStyles, WithStyles, Styles } from '@mui/styles';
import { combine } from "./DateRange.utils";
import type { ComponentProps } from "react";

// const styles: Styles<any, any> = (theme: Theme) =>
//   createStyles({
//     leftBorderRadius: {
//       borderRadius: '50% 0 0 50%',
//     },
//     rightBorderRadius: {
//       borderRadius: '0 50% 50% 0',
//     },
//     buttonContainer: {
//       display: 'flex',
//     },
//     button: {
//       height: 36,
//       width: 36,
//       padding: 0,
//     },
//     buttonText: {
//       lineHeight: 1.6,
// 			color: theme.palette.mode === 'light' ? 'initial' : undefined,
//     },
//     outlined: {
//       border: `1px solid ${theme.palette.primary.dark}`,
//     },
//     filled: {
//       '&:hover': {
//         backgroundColor: theme.palette.primary.dark,
//       },
//       backgroundColor: theme.palette.primary.dark,
//     },
//     highlighted: {
//       backgroundColor: theme.palette.mode === 'dark' ? '#e3f2fd6e' : '#bbdefb7d',
//     },
//     contrast: {
//       color: theme.palette.primary.contrastText,
//     },
//   });

// interface DayProps extends WithStyles<typeof styles> {
//   filled?: boolean;
//   outlined?: boolean;
//   highlighted?: boolean;
//   disabled?: boolean;
//   startOfRange?: boolean;
//   endOfRange?: boolean;
//   onClick?: () => void;
//   onHover?: () => void;
//   value: number | string;
// }
// const BoxDay = styled(Box)<BoxProps>(({ theme }) => ({
//   width: 290,
//   backgroundColor: theme.palette.mode === "dark" ? "#424242" : undefined,
// }));

const BoxDay = styled(Box, {
  shouldForwardProp: (prop) =>
    !["startOfRange", "endOfRange", "disabled", "highLighted"].includes(
      prop as string,
    ),
})<{
  startOfRange?: boolean;
  endOfRange?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
}>(({ startOfRange, endOfRange, disabled, highlighted, theme }) => ({
  display: "flex",
  ...(startOfRange && {
    borderRadius: "50% 0 0 50%",
  }),
  ...(endOfRange && {
    borderRadius: "0 50% 50% 0",
  }),
  ...(!disabled &&
    highlighted && {
      backgroundColor:
        theme.palette.mode === "dark" ? "#e3f2fd6e" : "#bbdefb7d",
    }),
}));

const IconButtonDay = styled(IconButton, {
  shouldForwardProp: (prop) =>
    !["outlined", "filled", "disabled"].includes(prop as string),
})<{
  outlined?: boolean;
  filled?: boolean;
  disabled?: boolean;
}>(({ outlined, filled, disabled, theme }) => ({
  height: "36px",
  width: "36px",
  padding: 0,
  ...(!disabled &&
    outlined && {
      border: `1px solid ${theme.palette.primary.dark}`,
    }),
  ...(!disabled &&
    filled && {
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      backgroundColor: theme.palette.primary.dark,
    }),
}));

const TypographyDay = styled(Typography, {
  shouldForwardProp: (prop) => !["filled", "disabled"].includes(prop as string),
})<{
  filled?: boolean;
  disabled?: boolean;
}>(({ filled, disabled, theme }) => ({
  lineHeight: 1.6,
  color: theme.palette.mode === "light" ? "initial" : undefined,
  ...(!disabled && filled && { color: theme.palette.primary.contrastText }),
}));

/*extends ComponentProps<typeof BoxDay>*/
interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

export const DateRangeDay: React.FunctionComponent<DayProps> = (props) => {
  const { startOfRange, disabled, highlighted, endOfRange, outlined, filled } =
    props;
  return (
    // <div
    //   className={combine(
    //     classes.buttonContainer,
    //     props.startOfRange && classes.leftBorderRadius,
    //     props.endOfRange && classes.rightBorderRadius,
    //     !props.disabled && props.highlighted && classes.highlighted,
    //   )}
    // >

    <BoxDay
      startOfRange={startOfRange}
      disabled={disabled}
      highlighted={highlighted}
      endOfRange={endOfRange}
    >
      <IconButtonDay
        outlined={outlined}
        disabled={disabled}
        filled={filled}
        // className={combine(
        //   classes.button,
        //   !props.disabled && props.outlined && classes.outlined,
        //   !props.disabled && props.filled && classes.filled,
        // )}
        onClick={props.onClick}
        onMouseOver={props.onHover}
      >
        <TypographyDay
          disabled={disabled}
          filled={filled}
          //   className={combine(
          //     classes.buttonText,
          //     !props.disabled && props.filled && classes.contrast,
          //   )}
          variant="body2"
        >
          {!props.disabled && props.value}
        </TypographyDay>
      </IconButtonDay>
    </BoxDay>
  );
};

// export default withStyles(styles)(Day);

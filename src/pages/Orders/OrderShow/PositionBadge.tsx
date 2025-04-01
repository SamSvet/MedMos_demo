import Box from "@mui/material/Box";
import { styled, alpha, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";
import Tooltip from "@mui/material/Tooltip";
import "./animate.css";

const grow = keyframes({
  from: { "--p": "0;" },
});

const BoxPercentage = styled(Box, {
  shouldForwardProp: (prop) =>
    !["percentage", "thickness", "color", "borderColor", "size"].includes(
      prop as string,
    ),
})<{
  percentage: number;
  thickness: number;
  color: string;
  size: number;
  borderColor: string;
}>(({ percentage, thickness, color, size, borderColor, theme }) => ({
  width: size,
  aspectRatio: 1,
  "--p": percentage,
  position: "relative",
  display: "inline-grid",
  background: color,
  borderRadius: "50%",
  margin: "5px",
  placeContent: "center",
  animation: `${grow} 1s .5s both`,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: borderColor,
    padding: thickness,
    boxSizing: "border-box",
    borderRadius: "50%",
    mask: `linear-gradient(#0000 0 0) content-box intersect,
     conic-gradient(#000 calc(var(--p)*1%),#0000 0)`,
  },
}));

export const PositionBadge = ({
  value,
  maxValue,
  size = 60,
}: {
  value: number;
  maxValue: number;
  size?: number;
}) => {
  const theme = useTheme();
  const percentage =
    value > maxValue ? 100 : Math.round((value / maxValue) * 100);
  return (
    <Tooltip title={`В резерве ${percentage}%`} disableInteractive>
      <BoxPercentage
        size={size}
        className="animate"
        color={alpha(theme.palette.text.primary, 0.08)}
        borderColor={theme.palette.info.light}
        thickness={2}
        percentage={percentage}
      >
        {maxValue}
      </BoxPercentage>
    </Tooltip>
  );
};

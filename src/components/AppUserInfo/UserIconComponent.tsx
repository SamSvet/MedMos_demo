import { FC } from "react";
import { ListItemIcon, Tooltip, useTheme } from "@mui/material";
import { UserIcon } from "./UserIcon";

export const UserIconComponent: FC<{ minimized: boolean; title: string }> = ({
  minimized,
  title,
}) => {
  const theme = useTheme();
  return (
    <Tooltip title={minimized ? title : ""} placement={"right-start"}>
      <ListItemIcon
        sx={{
          justifyContent: minimized ? "center" : "auto",
          transform: minimized ? "scale(1.5)" : "scale(1.2)",
          transition: theme.transitions.create("transform", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          display: "flex",
          alignItems: "center",
        }}
        data-testid="app-user-info-listitem-icon"
      >
        <UserIcon sx={{ color: theme.palette.text.primary }} />
      </ListItemIcon>
    </Tooltip>
  );
};

import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const FallBackDefault = ({ error }: { error: Error }) => {
  const [open, setOpen] = useState(false);
  return (
    <Alert severity="error" data-testid={"error-boundary-fallback-default"}>
      <AlertTitle>{error.name}</AlertTitle>
      {error.message}
      <IconButton
        data-testid={"error-boundary-collapse-btn"}
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        data-testid={"error-boundary-fallback-collapse"}
      >
        {error.stack?.split("\n").map((i, key) => (
          <div key={key}>{i}</div>
        ))}
      </Collapse>
    </Alert>
  );
};

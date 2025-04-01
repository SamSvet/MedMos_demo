import Paper, { PaperProps } from "@mui/material/Paper";
import { useRef } from "react";
import Draggable from "react-draggable";

export const PaperComponent = (props: PaperProps) => {
  const nodeRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
};

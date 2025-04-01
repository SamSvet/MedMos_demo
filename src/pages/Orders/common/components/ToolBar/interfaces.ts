import React from "react";

export enum ToolBarType {
  Large = "lg",
  Medium = "md",
  Small = "sm",
}

export interface IToolBarAttr {
  text: string;
  icon: JSX.Element;
  clickHandler: React.MouseEventHandler;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  disabled?: boolean;
  // test_id?: string;
  "data-test-id"?: string;
}

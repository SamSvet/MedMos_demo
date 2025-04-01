import { FC, HTMLAttributes, useEffect } from "react";
import { ContainerItemSelect } from "./ContainerField.logic";
import { AutocompleteRenderGroupParams, Typography } from "@mui/material";
import { styled } from "@mui/system";
export const ContainerDateRenderOption = ({
  props,
  option,
}: {
  props: HTMLAttributes<HTMLLIElement>;
  option: ContainerItemSelect;
}) => {
  return (
    <li
      {...props}
      key={option.name}
      style={{ justifyContent: "space-between" }}
    >
      {option.name}
      <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
        {option.plan_delivery_dt?.split("T")[0].split("-").reverse().join(".")}
      </Typography>
    </li>
  );
};

export const GroupHeader = styled("div")(({ theme }) => ({
  justifyContent: "space-between",
  position: "sticky",
  display: "flex",
  top: "-8px",
  padding: "4px 16px",
  color: theme.palette.primary,
  backgroundColor: theme.palette.mode === "dark" ? "#e3f2fd6e" : "#BBDEFB",
}));

export const GroupItems = styled("ul")({
  padding: 0,
});

export const ContainerDateRenderGroup = ({
  props,
}: {
  props: AutocompleteRenderGroupParams;
}) => {
  return (
    <li key={props.key}>
      <GroupHeader>
        {props.group}
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          Плановая дата доставки
        </Typography>
      </GroupHeader>
      <GroupItems>{props.children}</GroupItems>
    </li>
  );
};

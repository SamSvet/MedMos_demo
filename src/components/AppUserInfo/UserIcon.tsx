/* eslint-disable max-len */
import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const UserIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon width={34} height={34} viewBox={"0 2 34 34"} {...props}>
      <path
        d="M18 18C15.2387 18 13 15.7613 13 13V12C13 9.23872 15.2387 7 18 7C20.7613 7 23 9.23872 23 12V13C23 15.7613 20.7613 18 18 18ZM18 16C19.6567 16 21 14.6567 21 13V12C21 10.3433 19.6567 9 18 9C16.3433 9 15 10.3433 15 12V13C15 14.6567 16.3433 16 18 16ZM25 30H11C9.34372 30 8 28.6563 8 27V26C8 22.686 10.6864 20 14 20H22C25.3136 20 28 22.686 28 26V27C28 28.6563 26.6563 30 25 30ZM25 28C25.5517 28 26 27.5517 26 27V26C26 23.7907 24.2091 22 22 22H14C11.7909 22 10 23.7907 10 26V27C10 27.5517 10.4483 28 11 28H25Z"
        fill="inherit"
      />
    </SvgIcon>
  );
};

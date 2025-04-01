import { Link } from "@mui/material";
import { FC } from "react";
import { REFBOX_TEST_IDS } from "./test-ids";

interface IRefBoxAddOptionProps {
  text?: string;
  onCreateNewOption: () => void;
}

export const RefBoxAddOption: FC<IRefBoxAddOptionProps> = ({
  text,
  onCreateNewOption,
}) => {
  return (
    <Link
      onMouseDown={onCreateNewOption}
      sx={{
        cursor: "pointer",
        display: "block",
        padding: (theme) => theme.spacing(1, 2, 0),
      }}
      data-testid="ref-box-add-option"
      data-test-id={REFBOX_TEST_IDS.addOption}
    >
      {text}
    </Link>
  );
};

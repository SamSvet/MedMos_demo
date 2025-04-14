import {
  ButtonGroup,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

export const ContainerDateBtnGroup = ({
  collapsibleCLose,
  handleAddNewOption,
  clearField,
}: {
  collapsibleCLose: () => void;
  handleAddNewOption: () => void;
  clearField: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <InputAdornment position="end">
      <ButtonGroup size="small" aria-label="Small button group">
        <Tooltip title={t("common.clearBtn")}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              clearField();
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("common.collapseBtn")}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              collapsibleCLose();
            }}
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("common.addOptionTitle")}>
          <IconButton
            size="small"
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleAddNewOption();
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </InputAdornment>
  );
};

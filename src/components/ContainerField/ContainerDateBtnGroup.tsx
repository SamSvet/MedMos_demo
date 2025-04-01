import {
  ButtonGroup,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

export const ContainerDateBtnGroup = ({
  collapsibleCLose,
  handleAddNewOption,
  clearField,
}: {
  collapsibleCLose: () => void;
  handleAddNewOption: () => void;
  clearField: () => void;
}) => {
  return (
    <InputAdornment position="end">
      <ButtonGroup size="small" aria-label="Small button group">
        <Tooltip title="Очистить дату">
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
        <Tooltip title="Свернуть">
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
        <Tooltip title="Добавить">
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

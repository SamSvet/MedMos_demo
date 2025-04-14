import { Collapse, LinearProgress, Stack, TextField } from "@mui/material";
import { FrostedGlass } from "../FrostedGlassBox/FrostedGlassBox";
import ContainerDateField from "./ContainerDateField";
import {
  ContainerBadAttributes,
  ContainerItemSelect,
} from "./ContainerField.logic";
import { ErrorToolTip } from "../ToolTip/ErrorToolTip";
import { useTranslation } from "react-i18next";

export const ContainerFieldCollapse = ({
  value,
  isOpen,
  isLoading,
  handleTextChange,
  handleDateChange,
  handleAddNewOption,
  closeCollapsible,
  badAttributes,
  clearField,
}: {
  value: ContainerItemSelect | null;
  isOpen: boolean;
  isLoading: boolean;
  handleTextChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleDateChange: (newDate: Date | null) => void;
  handleAddNewOption: () => void;
  closeCollapsible: () => void;
  badAttributes: ContainerBadAttributes<ContainerItemSelect> | null;
  clearField: (key: keyof ContainerItemSelect) => void;
}) => {
  const { t } = useTranslation();
  return (
    <Collapse
      in={isOpen}
      timeout="auto"
      unmountOnExit
      sx={{
        "& > :first-of-type": {
          position: "relative",
        },
      }}
    >
      <FrostedGlass open={isLoading}>
        <LinearProgress
          color="secondary"
          sx={{
            width: "100%",
            position: "absolute",
            bottom: "0",
            height: "2px",
          }}
        />
      </FrostedGlass>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        <ErrorToolTip
          title={`${badAttributes?.name?.join(",") || ""}`}
          disableInteractive
        >
          <TextField
            autoFocus
            value={value?.name || ""}
            onChange={handleTextChange}
            label={t("table.header.container")}
            type="text"
            variant="standard"
            error={!!badAttributes?.name}
          />
        </ErrorToolTip>
        <ContainerDateField
          badAttributes={badAttributes}
          dialogValue={value}
          handleAddNewOption={handleAddNewOption}
          collapsibleCLose={closeCollapsible}
          handleDateChange={handleDateChange}
          clearField={() => clearField("plan_delivery_dt")}
        />
      </Stack>
    </Collapse>
  );
};

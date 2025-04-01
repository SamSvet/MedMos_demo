import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisuallyHiddenInput from "./VisuallyHiddentInput";

export default function InputFileUploadButton({
  onChangeHandler,
}: {
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput onChangeHandler={onChangeHandler} />
    </Button>
  );
}

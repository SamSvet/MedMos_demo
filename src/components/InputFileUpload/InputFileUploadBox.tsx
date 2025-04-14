import { useState } from "react";
import { Box, Button, Typography, Grid, Collapse } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import VisuallyHiddenInput from "./VisuallyHiddentInput";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { OrderAttrError } from "../../pages/Orders/common/interfaces/order-errors";
import { useTranslation } from "react-i18next";

export type InputFileUploadProps = {
  // onUpload: (data: unknown) => void;
  //   onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHandler: (file: File) => void;
  file: File | null;
  orderErrors: OrderAttrError | null;
  children?: React.ReactNode;
  overlay?: boolean;
  disabled?: boolean;
};

export type UploadRef = {
  upload: () => void;
  abort: () => void;
};

const FileInfo = ({ file }: { file: File | null }) => {
  const { t } = useTranslation();
  return file ? (
    <Grid container>
      <Grid item xs={2}>
        <Typography variant="caption" sx={{ textTransform: "none" }}>
          {t("order.create.nameField")}:
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="caption" sx={{ textTransform: "none" }}>
          {file.name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="caption" sx={{ textTransform: "none" }}>
          {t("order.create.sizeField")}:
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="caption" sx={{ textTransform: "none" }}>
          {file.size}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="caption" sx={{ textTransform: "none" }}>
          {t("order.create.modateField")}:
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="caption" sx={{ textTransform: "none" }}>
          {new Date(file.lastModified).toISOString().split("T")[0]}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption">{t("order.create.fileBtn")}</Typography>
      </Grid>
    </Grid>
  );
};
export default function InputFileUploadBox({
  onChangeHandler,
  disabled,
  children,
  overlay,
  file,
  orderErrors,
}: InputFileUploadProps) {
  const [drop, setDrop] = useState(false);

  const onClickButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    onChangeHandler(event.target.files[0]);
  };

  const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
    if (disabled) return;
    e.preventDefault();
    setDrop(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    if (disabled) return;
    e.preventDefault();
    setDrop(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    if (disabled) return;
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setDrop(false);
    onChangeHandler(droppedFile);
    // handleFile(droppedFile);
  };

  return (
    <>
      <Box
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        sx={{
          width: "100%",
          minHeight: 100,
          position: "relative",
          "&:hover label": {
            ...(overlay && {
              // pointerEvents: "auto",
              bgcolor: blue[100],
            }),
          },
          zIndex: 0,
          ...(orderErrors?.file?.isError && {
            borderColor: red[700],
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "4px",
          }),
        }}
      >
        {children}
        <Button
          disabled={disabled}
          component="label"
          role={undefined}
          variant="contained"
          startIcon={
            <UploadFileOutlinedIcon
              sx={{ opacity: 0.2, "&:first-of-type": { fontSize: "40px" } }}
            />
          }
          tabIndex={-1}
          sx={{
            visibility: "hidden",
            pointerEvents: "none",
            position: "absolute",
            display: "flex",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            bgcolor: blue[50],
            color: "inherit",
            boxShadow: "none",
            transition: "0.3s",
            width: "100%",
            height: "100%",
            zIndex: 1,
            ...(overlay && { pointerEvents: "auto", visibility: "visible" }),
            ...(drop && {
              bgcolor: blue[100],
              boxShadow:
                "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0 )",
            }),
          }}
        >
          <VisuallyHiddenInput
            disabled={disabled}
            onChangeHandler={onClickButtonHandler}
          />
          <FileInfo file={file} />
        </Button>
      </Box>
      <Collapse
        in={Boolean(orderErrors?.file?.isError)}
        timeout="auto"
        unmountOnExit
      >
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color={red[700]}
        >
          {orderErrors?.file?.errorText}
        </Typography>
      </Collapse>
    </>
  );
}

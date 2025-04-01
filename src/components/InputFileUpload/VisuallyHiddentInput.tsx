import { styled } from "@mui/material/styles";

type InputFileUploadProps = {
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
};

const VisuallyHiddenInputStyled = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function VisuallyHiddenInput({
  onChangeHandler,
  disabled,
}: {
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <VisuallyHiddenInputStyled
      disabled={disabled}
      onChange={onChangeHandler}
      type="file"
    />
  );
}

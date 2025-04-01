import { Box, Typography, useTheme } from "@mui/material";
import { FC, ReactNode, useRef } from "react";

interface PageConstructorProps {
  children: {
    title: string;
    header: ReactNode;
    content: ReactNode;
    footer?: ReactNode;
  };
}
export const PageConstructor: FC<PageConstructorProps> = (props) => {
  const theme = useTheme();
  const footerRef = useRef<HTMLDivElement>(null);

  const { title, header, content, footer } = props.children;

  return (
    <Box width="100%" height="100%" position="relative" {...props}>
      <Box
        width="100%"
        height="100%"
        sx={{ overflowY: "scroll" }}
        paddingBottom={
          footerRef.current?.offsetHeight
            ? `${footerRef.current.offsetHeight}px`
            : 0
        }
        data-testid="height-responsive-box"
      >
        <Box
          borderBottom={`1px solid `}
          //   borderBottom={`1px solid ${theme.palette.border.light}`}
          //   bgcolor={theme.palette.background.secondary}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          padding={theme.spacing(2, 4, 2, 4)}
        >
          <Typography variant={"h1"} mb={theme.spacing(2)}>
            {title}
          </Typography>
          {header}
        </Box>
        <Box
          width="100%"
          flexBasis="100%"
          flexShrink={1}
          flexGrow={1}
          display={"flex"}
          flexDirection={"column"}
          padding={theme.spacing(2, 4, 2, 4)}
        >
          {content}
        </Box>
      </Box>
      {footer && (
        <Box
          position={"absolute"}
          right={0}
          bottom={0}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          zIndex={100}
          width="100%"
          padding={theme.spacing(2, 4)}
          borderTop={`1px solid `}
          //   borderTop={`1px solid ${theme.palette.border.main}`}
          //   bgcolor={theme.palette.background.secondary}
          ref={footerRef}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
};

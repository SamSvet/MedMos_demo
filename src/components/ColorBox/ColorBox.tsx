import Box from "@mui/material/Box";

// const getColorFromStatus = (status: string) =>
//   status === "cold"
//     ? "#7dbde8"
//     : status === "warm"
//       ? "#e8cb7d"
//       : status === "hot"
//         ? "#e88b7d"
//         : status === "in-contract"
//           ? "#a4e87d"
//           : "#000";

export const ColorBox = ({ color }: { color: string }) => (
  <Box
    marginLeft={0.5}
    width={10}
    height={10}
    display="inline-block"
    borderRadius="5px"
    bgcolor={color}
    component="span"
    sx={{
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px ",
    }}
  />
);

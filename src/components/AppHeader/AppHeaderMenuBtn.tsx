import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { FC } from "react";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

interface AppHeaderMenuBtnProps {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const AppHeaderMenuBtn: FC<AppHeaderMenuBtnProps> = ({ handleClick }) => {
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{ textTransform: "none", boxShadow: "none" }}
      startIcon={
        <Avatar
          sx={{ width: 24, height: 24 }}
          src={`${process.env.PUBLIC_URL}/LizaSvetlichnaya.jpg`}
        />
      }
    >
      Светличная Елизавета
    </Button>
  );
};

export default AppHeaderMenuBtn;

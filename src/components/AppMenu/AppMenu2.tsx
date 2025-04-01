import { MenuList, MenuItem, ListItemText } from "@mui/material";
import { useMenuItems2 } from "./AppMenu.logic";
import MenuItems from "./MenuItems";

export const AppMenu2 = () => {
  const menuItems = useMenuItems2();
  return (
    <MenuList sx={{ display: "flex" }}>
      {menuItems.map((menu, index) => {
        return <MenuItems {...menu} key={index} />;
      })}
    </MenuList>
  );
};

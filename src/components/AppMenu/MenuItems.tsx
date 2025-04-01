import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  alpha,
  useTheme,
} from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";
import DropDown from "./DropDown";
import { IMenuItems, useCheckIsActive } from "./AppMenu.logic";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const MenuItems = (items: IMenuItems) => {
  const { checkIsActive } = useCheckIsActive();
  const isActive = checkIsActive(items.id);

  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  // const [anchorItemEl, setAnchorItemEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const transitionParams = useMemo(() => {
    return {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    };
  }, [
    theme.transitions.duration.enteringScreen,
    theme.transitions.easing.sharp,
  ]);

  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdown((prev) => !prev);
  };

  // const closeDropdown = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   dropdown && setDropdown(false);
  // };

  return (
    <MenuItem
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={items.submenu ? toggleDropdown : items.onClick}
      selected={isActive}
    >
      {items.submenu ? (
        <>
          <ListItemText primary={items.title} />
          <ListItemIcon onClick={toggleDropdown}>
            <KeyboardArrowUpIcon
              fontSize="small"
              sx={{
                color: alpha(theme.palette.text.primary, 0.6),
                transform: dropdown
                  ? "scale(1.3)"
                  : "scale(1.3) rotate(180deg)",
                transition: theme.transitions.create(
                  "transform",
                  transitionParams,
                ),
              }}
            />
          </ListItemIcon>

          {/* <ListItemSecondaryAction
            onClick={toggleDropdown}
            sx={{
              display: "flex",
              justifyContent: "center",
              transition: theme.transitions.create("opacity", transitionParams),
            }}
          >
            <KeyboardArrowDownIcon
              sx={{
                color: alpha(theme.palette.text.primary, 0.6),
                transform: dropdown
                  ? "scale(1.3)"
                  : "scale(1.3) rotate(180deg)",
                transition: theme.transitions.create(
                  "transform",
                  transitionParams,
                ),
              }}
            />
          </ListItemSecondaryAction> */}
          <DropDown
            submenus={items.submenu}
            dropdown={dropdown}
            target={ref.current}
          />
        </>
      ) : (
        <ListItemText primary={items.title} />
      )}
    </MenuItem>
  );
};

export default MenuItems;

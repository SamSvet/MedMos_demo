import { Grow, MenuList, Paper, Popper, alpha } from "@mui/material";
import MenuItems from "./MenuItems";
import { IMenuItems } from "./AppMenu.logic";
import { useState } from "react";
import { VirtualElement } from "@popperjs/core/lib/popper";
import { useOnWindowResize } from "../../hooks/useOnWindowResize";
import debounce from "lodash.debounce";
import { useComponentDidUpdate } from "../../hooks/useComponentDidUpdate";

interface DropDownProps {
  submenus: IMenuItems[];
  dropdown: boolean;
  target: VirtualElement | (() => VirtualElement) | null;
}

const DropDown = ({ submenus, dropdown, target }: DropDownProps) => {
  const [dimension, setDimension] = useState<DOMRect | null>(null);

  useComponentDidUpdate(() => {
    if (!target) return;
    if (!!dimension) return;
    if (typeof target === "function") {
      setDimension(target().getBoundingClientRect());
      return;
    }
    setDimension(target.getBoundingClientRect());
  }, [target]);

  // useEffect(() => {console.log()},[dimension])
  // const shouldRender = useCallback(() => {
  //   if (!target) return;
  //   if (typeof target === "function") {
  //     console.log(target().getBoundingClientRect());
  //     return;
  //   }
  //   console.log(target.getBoundingClientRect());
  // }, [target]);

  // useOnWindowResize(debounce(shouldRender, 1000));

  return (
    <Popper
      open={dropdown}
      anchorEl={target}
      role={undefined}
      placement="top-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              background: (theme) => alpha(theme.palette.primary.main, 0.9),
              minWidth: `${dimension?.width}px`,
            }}
          >
            <MenuList>
              {submenus.map((submenu, index) => (
                <MenuItems {...submenu} key={index} />
              ))}
            </MenuList>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
export default DropDown;

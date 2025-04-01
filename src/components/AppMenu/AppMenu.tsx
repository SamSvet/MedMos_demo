import { KeyboardArrowUp } from "@mui/icons-material";
import {
  alpha,
  Collapse,
  Link,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  useTheme,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SELENIUM_TEST_IDS } from "../../constants/selenium-test-ids";
import { AppMenuComponent } from "../AppMainLayout/interfaces";
import { AppUserInfo } from "../AppUserInfo/AppUserInfo";
import { IMenuItem, useCheckIsActive, useMenuItems } from "./AppMenu.logic";
import { getScreenCode } from "../../selectors/screen-selectors";
import { useOrdersSelector } from "../../store/orders-store";

const AppMenuItem: FC<IMenuItem & { minimized: boolean }> = ({
  id,
  Icon,
  onClick,
  label,
  subItems,
  minimized,
  ...props
}) => {
  const theme = useTheme();

  const { checkIsActive } = useCheckIsActive();
  const isActive = checkIsActive(id);
  const [subMenuOpen, setSubMenuOpen] = useState(true);
  const [anchorItemEl, setAnchorItemEl] = useState<null | HTMLElement>(null);

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
    if (minimized) {
      setSubMenuOpen(false);
    }
  }, [minimized]);

  const closeSubMenu = useCallback(() => {
    setSubMenuOpen(false);
  }, []);

  const handleMenuItemClick = useCallback(() => {
    if (!minimized) {
      onClick && onClick();
    } else {
      setSubMenuOpen(true);
    }
  }, [minimized, onClick]);

  const renderSubItems = useCallback(() => {
    return minimized ? (
      <Menu
        anchorEl={anchorItemEl!}
        open={subMenuOpen}
        onClose={closeSubMenu}
        onClick={closeSubMenu}
      >
        <MenuList dense sx={{ pt: 0, pb: 0 }}>
          {subItems?.map((item) => {
            return (
              <MenuItem
                key={item.id}
                onClick={item.onClick}
                title={item.label}
                data-test-id={item["data-test-id"]}
              >
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    ) : (
      <Collapse in={subMenuOpen}>
        <MenuList dense>
          {subItems?.map((item) => {
            return <AppMenuItem {...item} key={item.id} minimized={false} />;
          })}
        </MenuList>
      </Collapse>
    );
  }, [anchorItemEl, closeSubMenu, minimized, subItems, subMenuOpen]);

  return (
    <>
      <MenuItem
        component={Link}
        onClick={handleMenuItemClick}
        title={label}
        selected={isActive}
        ref={setAnchorItemEl}
        data-test-id={props["data-test-id"]}
      >
        <ListItemIcon
          sx={{
            justifyContent: minimized ? "center" : "auto",
            transform: minimized ? "scale(1.4)" : "none",
            transition: theme.transitions.create("transform", transitionParams),
          }}
        >
          {Icon && (
            <Icon
              sx={{
                color: isActive
                  ? theme.palette.text.primary
                  : alpha(theme.palette.text.primary, 0.6),
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={{
            color: isActive
              ? theme.palette.text.primary
              : alpha(theme.palette.text.primary, 0.6),
            opacity: minimized ? 0 : 1,
          }}
        />
        {subItems && subItems.length && (
          <ListItemSecondaryAction
            onClick={(e) => {
              e.stopPropagation();
              setSubMenuOpen((open) => !open);
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              opacity: minimized ? 0 : 1,
              transition: theme.transitions.create("opacity", transitionParams),
            }}
          >
            <KeyboardArrowUp
              sx={{
                color: alpha(theme.palette.text.primary, 0.6),
                transform: subMenuOpen
                  ? "scale(1.3)"
                  : "scale(1.3) rotate(180deg)",
                transition: theme.transitions.create(
                  "transform",
                  transitionParams,
                ),
              }}
              data-testid="app-menu-sublist-open-btn"
              data-test-id={SELENIUM_TEST_IDS.menu.subListArrow}
            />
          </ListItemSecondaryAction>
        )}
      </MenuItem>
      {subItems && renderSubItems()}
    </>
  );
};

export const AppMenu: FC<AppMenuComponent> = ({ minimized }) => {
  const menuItems = useMenuItems();

  return (
    <MenuList
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {menuItems.map((menuItem) => {
        return (
          <AppMenuItem {...menuItem} key={menuItem.id} minimized={minimized} />
        );
      })}

      <AppUserInfo minimized={minimized} />
    </MenuList>
  );
};

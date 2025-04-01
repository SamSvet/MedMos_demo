import {
  List,
  ListItemText,
  Typography,
  useTheme,
  alpha,
  ListItem,
} from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SELENIUM_TEST_IDS } from "../../constants/selenium-test-ids";
import { selectUserInfo } from "../../selectors/user-info-selectors";
import { useOrdersSelector } from "../../store/orders-store";
import { AppUserInfoComponent } from "../AppMainLayout/interfaces";
import { UserIconComponent } from "./UserIconComponent";

export const AppUserInfo: FC<AppUserInfoComponent> = ({ minimized }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const userInfo = useOrdersSelector(selectUserInfo);

  const userNameStr = useMemo(() => {
    if (userInfo && !Object.keys(userInfo).length) {
      return t("refs.userNotFound");
    }

    return (
      userInfo &&
      Object.keys(userInfo).length &&
      `${userInfo[0].last_name}
         ${userInfo[0].first_name.substring(0, 1)}.
         ${userInfo[0].middle_name.substring(0, 1)}. `
    );
  }, [userInfo, t]);

  return (
    <List
      data-testid="user-info"
      data-test-id={SELENIUM_TEST_IDS.menu.userInfoContainer}
      sx={{ mt: "auto" }}
    >
      <ListItem>
        <UserIconComponent minimized={minimized} title={userNameStr || ""} />
        <ListItemText
          sx={{
            opacity: minimized ? 0 : 1,
            "& span": { width: "100%", display: "flex", alignItems: "center" },
          }}
        >
          <Typography
            variant={"subtitle2"}
            sx={{
              color: alpha(theme.palette.text.primary, 0.6),
              display: "block",
              textAlign: "start",
              lineHeight: 1,
              whiteSpace: "normal",
            }}
          >
            {userNameStr}
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

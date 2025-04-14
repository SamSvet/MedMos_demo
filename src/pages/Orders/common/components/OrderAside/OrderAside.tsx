import { useCallback } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Fab,
  Tooltip,
} from "@mui/material";
import { OrderInfo } from "../../../../../api/shared/order-info";
import { IAttrBase } from "../OrderAttributes/OrderAttributes.interfaces";
import { UserItem } from "../../../../../api/shared/common/users";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowBack } from "@mui/icons-material";
import { useBackToList } from "../../hooks/useBackToList";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

interface OrderAsideProps {
  model: Map<keyof OrderInfo, IAttrBase>;
  linkHandler: () => void;
  link?: "edit" | "show";
}

export const OrderAsideItem = ({
  label,
  attr,
  direction = "row",
}: {
  label: string;
  attr?: string;
  direction?: "row" | "column";
}) => {
  return (
    <Stack
      direction={direction}
      justifyContent="flex-start"
      alignItems="baseline"
      spacing={1}
    >
      <Typography variant="body2">{label}</Typography>
      <Typography variant="caption" gutterBottom>
        {attr}
      </Typography>
    </Stack>
  );
};
export const OrderAside = ({
  model,
  linkHandler,
  link = "edit",
}: OrderAsideProps) => {
  const { t } = useTranslation();
  const handleBackToList = useBackToList();
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const userToStr = useCallback((user: UserItem) => {
    return `${user?.last_name} ${user?.first_name} ${user?.middle_name} `;
  }, []);

  return (
    <Box ml={4} width={250} minWidth={250}>
      <Box textAlign="center" mb={2}>
        {link === "edit" ? (
          <Button size="small" startIcon={<EditIcon />} onClick={linkHandler}>
            {t("order.show.editOrderBtn")}
          </Button>
        ) : (
          <Button size="small" startIcon={<SearchIcon />} onClick={linkHandler}>
            {t("order.show.viewOrderBtn")}
          </Button>
        )}
      </Box>
      <Typography variant="subtitle1">{t("order.show.infoTitle")}</Typography>
      <Divider />
      <Box mt={1} mb={2}>
        <OrderAsideItem
          label={`${t("order.show.nameTitle")}:`}
          attr={model.get("order_name")?.value?.toString()}
        />
        <OrderAsideItem
          label={`${t("order.show.createdTitle")}:`}
          attr={model.get("created")?.value?.toString()}
        />
        <OrderAsideItem
          label={`${t("order.show.updatedTitle")}:`}
          attr={model.get("updated")?.value?.toString()}
        />
      </Box>
      <Typography variant="subtitle1">
        {t("order.show.contactsTitle")}
      </Typography>{" "}
      <Divider />
      <Box mt={1} mb={2}>
        <OrderAsideItem
          label={`${t("order.show.fullNameTitle")}:`}
          attr={userToStr(model.get("order_manager")?.value as UserItem)}
        />
        <OrderAsideItem
          label={`${t("order.show.phoneTitle")}:`}
          attr={(model.get("order_manager")?.value as UserItem).phone_contact}
        />
        <OrderAsideItem
          label={`${t("order.show.emailTitle")}:`}
          attr={(model.get("order_manager")?.value as UserItem).email_contact}
        />
      </Box>
      <Typography variant="subtitle1">
        {t("order.show.descriptionTitle")}
      </Typography>{" "}
      <Divider />
      <Box mt={1} mb={2}>
        <Typography variant="caption" display="block" gutterBottom>
          {model.get("description")?.value?.toString()}
        </Typography>
      </Box>
      <Zoom in={true} timeout={transitionDuration} unmountOnExit>
        <Tooltip title={t("order.show.returnBtn")} disableInteractive>
          <Fab aria-label="back" color="primary" onClick={handleBackToList}>
            <ArrowBack />
          </Fab>
        </Tooltip>
      </Zoom>
    </Box>
  );
};

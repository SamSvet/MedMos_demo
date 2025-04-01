import { useCallback } from "react";
import { Box, Typography, Divider, Button, Stack } from "@mui/material";
import { OrderInfo } from "../../../../../api/shared/order-info";
import { IAttrBase } from "../OrderAttributes/OrderAttributes.interfaces";
import { UserItem } from "../../../../../api/shared/common/users";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

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
  const userToStr = useCallback((user: UserItem) => {
    return `${user?.last_name} ${user?.first_name} ${user?.middle_name} `;
  }, []);

  return (
    <Box ml={4} width={250} minWidth={250}>
      <Box textAlign="center" mb={2}>
        {link === "edit" ? (
          <Button size="small" startIcon={<EditIcon />} onClick={linkHandler}>
            Редактировать заказ
          </Button>
        ) : (
          <Button size="small" startIcon={<SearchIcon />} onClick={linkHandler}>
            Показать заказ
          </Button>
        )}
      </Box>
      <Typography variant="subtitle1">Информация по заказу</Typography>
      <Divider />
      <Box mt={1} mb={2}>
        <OrderAsideItem
          label="Имя:"
          attr={model.get("order_name")?.value?.toString()}
        />
        <OrderAsideItem
          label="Создан:"
          attr={model.get("created")?.value?.toString()}
        />
        <OrderAsideItem
          label="Обновлен:"
          attr={model.get("updated")?.value?.toString()}
        />
      </Box>
      <Typography variant="subtitle1">Контакты</Typography> <Divider />
      <Box mt={1} mb={2}>
        <OrderAsideItem
          label="Менеджер:"
          attr={userToStr(model.get("order_manager")?.value as UserItem)}
        />
        <OrderAsideItem
          label="Телефон:"
          attr={(model.get("order_manager")?.value as UserItem).phone_contact}
        />
        <OrderAsideItem
          label="Почта:"
          attr={(model.get("order_manager")?.value as UserItem).email_contact}
        />
      </Box>
      <Typography variant="subtitle1">Описание</Typography> <Divider />
      <Box mt={1} mb={2}>
        <Typography variant="caption" display="block" gutterBottom>
          {model.get("description")?.value?.toString()}
        </Typography>
      </Box>
    </Box>
  );
};

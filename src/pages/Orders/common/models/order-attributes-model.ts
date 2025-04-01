import { useTranslation } from "react-i18next";
import {
  OrderInfo,
  OrderInfoViewModel,
} from "../../../../api/shared/order-info";
import {
  AttrType,
  IAttrBase,
  ValueType,
} from "../components/OrderAttributes/OrderAttributes.interfaces";
import { OrderAttrError } from "../interfaces/order-errors";
import { useOrdersSelector } from "../../../../store/orders-store";
import { getCurrentUsers } from "../../../../selectors/orders/common-order-selectors";
import { useGetOptionsInRefBox } from "../hooks/useGetOptionInRefBox";
import { useMemo } from "react";
import { formatDate } from "../../../../utils/date-utils";
import { USERS_OPTIONS_SETTINGS } from "../../../../constants/ref-box-options-settings";

export const useOrderAttributesModel = (
  order: OrderInfoViewModel,
  orderErrors: OrderAttrError | null,
  fieldsConstraints: {
    [key in keyof OrderInfo]: {
      required: boolean;
      readOnly: boolean;
    };
  },
  getUpdateFunction?: (attrName: keyof OrderInfo) => (val: ValueType) => void,
) => {
  const { t } = useTranslation();

  const currUsers = useOrdersSelector(getCurrentUsers);

  const { getDirectoryOptions, getUsersOptions, getTeamsOptions } =
    useGetOptionsInRefBox();

  const updatedByValueComputed = useMemo(() => {
    const foundUser = currUsers?.find((u) => u.id === order.updated_by);

    if (!foundUser) {
      return "";
    }

    const lastName = foundUser.last_name;
    const firstNameShort = foundUser.first_name
      ? ` ${foundUser.first_name.slice(0, 1)}.`
      : "";
    const middleNameShort = foundUser.middle_name
      ? `${foundUser.middle_name.slice(0, 1)}.`
      : "";

    return `${lastName}${firstNameShort}${middleNameShort}`;
  }, [order.updated_by, currUsers]);

  const model = useMemo(() => {
    return new Map<keyof OrderInfo, IAttrBase>([
      [
        "order_name",
        {
          type: AttrType.Text,
          id: "order_name",
          label: "Имя заказа",
          update: getUpdateFunction && getUpdateFunction("order_name"),
          error: Boolean(orderErrors?.order_name?.isError),
          errorText: orderErrors?.order_name?.errorText,
          value: order.order_name || "",
          ...fieldsConstraints["order_name"],
        },
      ],

      [
        "order_manager",
        {
          type: AttrType.User,
          id: "order_manager",
          label: "Менеджер",
          update: getUpdateFunction && getUpdateFunction("order_manager"),
          error: Boolean(orderErrors?.order_manager?.isError),
          errorText: orderErrors?.order_manager?.errorText,
          value: order.order_manager,
          optionSettings: USERS_OPTIONS_SETTINGS,
          getDataOptions: getUsersOptions,
          ...fieldsConstraints["order_manager"],
        },
      ],

      [
        "created",
        {
          type: AttrType.Text,
          id: "created",
          label: t("campaigns.campaignFields.created"),
          error: false,
          value: formatDate(order.created),
          ...fieldsConstraints["created"],
        },
      ],
      [
        "updated_by",
        {
          type: AttrType.Text,
          id: "updated_by",
          label: t("campaigns.campaignFields.updated_by"),
          error: false,
          value: updatedByValueComputed,
          ...fieldsConstraints["updated_by"],
        },
      ],
      [
        "updated",
        {
          type: AttrType.Text,
          id: "updated",
          label: t("campaigns.campaignFields.updated"),
          error: false,
          value: formatDate(order.updated),
          ...fieldsConstraints["updated"],
        },
      ],

      [
        "description",
        {
          type: AttrType.Descr,
          id: "description",
          label: "Описание",
          value: order.description || "",
          error: Boolean(orderErrors?.description?.isError),
          errorText: orderErrors?.description?.errorText,
          update: getUpdateFunction && getUpdateFunction("description"),
          ...fieldsConstraints["description"],
        },
      ],
    ]);
  }, [
    fieldsConstraints,
    getUpdateFunction,
    getUsersOptions,
    order.created,
    order.description,
    order.order_manager,
    order.order_name,
    order.updated,
    orderErrors?.description?.errorText,
    orderErrors?.description?.isError,
    orderErrors?.order_manager?.errorText,
    orderErrors?.order_manager?.isError,
    orderErrors?.order_name?.errorText,
    orderErrors?.order_name?.isError,
    t,
    updatedByValueComputed,
  ]);

  return model;
};

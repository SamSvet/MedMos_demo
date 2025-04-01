import { ArrowBack, Close, Redo, Save } from "@mui/icons-material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IToolBarAttr } from "../common/components/ToolBar/interfaces";
import { OrderInfo, OrderInfoViewModel } from "../../../api/shared/order-info";
import {
  ValueType,
  IAttrBase,
} from "../common/components/OrderAttributes/OrderAttributes.interfaces";
import { OrderAttrError } from "../common/interfaces/order-errors";
import { useOrderAttributesModel } from "../common/models/order-attributes-model";
import { SELENIUM_TEST_IDS } from "../../../constants/selenium-test-ids";

export const useOrderEditToolBarElements = (
  save: () => void,
  backToList: () => void,
  sendtoApprove: () => void,
  cancel: () => void,
) => {
  const { t } = useTranslation();

  return useMemo<IToolBarAttr[]>(() => {
    return [
      {
        text: t("orders.campaignToolbar.returnBtn"),
        icon: <ArrowBack color={"secondary"} />,
        clickHandler: backToList,
        color: "secondary",
      },
      {
        text: t("orders.campaignToolbar.saveCurrentChanges"),
        icon: <Save color={"primary"} />,
        clickHandler: save,
        color: "primary",
      },
      {
        text: t("orders.campaignToolbar.sendToApprove"),
        icon: <Redo color={"primary"} />,
        clickHandler: sendtoApprove,
        color: "primary",
      },
      {
        text: t("buttons.cancel"),
        icon: <Close color={"warning"} />,
        clickHandler: cancel,
        color: "warning",
      },
    ];
  }, [backToList, cancel, save, sendtoApprove, t]);
};

export const useOrderEditAttributes = (
  updateOrderInfo: (updatedOrder: Partial<OrderInfoViewModel>) => void,
  order: OrderInfoViewModel,
  orderErrors: OrderAttrError | null,
  unsetOrderError: (fieldName: keyof OrderInfoViewModel) => void,
) => {
  const getUpdateFunction = useCallback(
    (attrName: keyof OrderInfo) => (val: ValueType) => {
      unsetOrderError(attrName);
      updateOrderInfo({
        [attrName]: val,
      });
    },
    [unsetOrderError, updateOrderInfo],
  );

  const fieldsConstraints = useMemo<{
    [key in keyof OrderInfo]: {
      required: boolean;
      readOnly: boolean;
    };
  }>(() => {
    return {
      order_name: { required: true, readOnly: false },
      // activity_group_cd: { required: true, readOnly: false },
      // campaign_kind_cd: { required: true, readOnly: false },
      order_manager: { required: true, readOnly: false },
      // team_cd: { required: true, readOnly: false },
      // tags: { required: false, readOnly: false },
      description: { required: true, readOnly: false },
    };
  }, []);

  const attributesModel = useOrderAttributesModel(
    order,
    orderErrors,
    fieldsConstraints,
    getUpdateFunction,
  );

  const top: IAttrBase[][] = useMemo(
    () => [
      [
        attributesModel.get("order_name")!,
        attributesModel.get("order_manager")!,
      ],
    ],
    [attributesModel],
  );

  const bottom: IAttrBase[][] = useMemo(
    () => [[attributesModel.get("description")!]],
    [attributesModel],
  );

  return {
    top,
    bottom,
    attributesModel,
  };
};

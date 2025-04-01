import { Close, Save } from "@mui/icons-material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IToolBarAttr } from "../common/components/ToolBar/interfaces";
import {
  IAttrBase,
  ValueType,
} from "../common/components/OrderAttributes/OrderAttributes.interfaces";
import { OrderInfo, OrderInfoViewModel } from "../../../api/shared/order-info";
import { OrderAttrError } from "../common/interfaces/order-errors";
import { useOrderAttributesModel } from "../common/models/order-attributes-model";

export const useOrderCreateToolBarElements = (
  saveOrder: () => void,
  cancel: () => void,
) => {
  const { t } = useTranslation();

  return useMemo<IToolBarAttr[]>(() => {
    return [
      {
        text: t("campaigns.campaignToolbar.saveCurrentChanges"),
        icon: <Save color={"primary"} />,
        clickHandler: saveOrder,
        color: "primary",
      },
      {
        text: t("buttons.cancel"),
        icon: <Close color={"warning"} />,
        clickHandler: cancel,
        color: "warning",
      },
    ];
  }, [cancel, saveOrder, t]);
};

export const useOrderCreateAttributes = (
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

  const fieldsConstraints = useMemo(() => {
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

import { Diamond, SvgIconComponent } from "@mui/icons-material";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ScreenCode } from "../../api/shared/common/screen-code.enum";
import { getScreenCode } from "../../selectors/screen-selectors";
import { useOrdersSelector } from "../../store/orders-store";
import { AppRoutes } from "../../constants/app-routes";
import { cdRoute } from "../../pages/ControllerDispatcher/ControllerDispatcher";
import { SELENIUM_TEST_IDS } from "../../constants/selenium-test-ids";

export enum MenuItemType {
  Orders = "orders",
  CampaignsNeedApprove = "campaigns-need-approve",
  Dictionaries = "dictionaries",
  Calendar = "calendar",
  SomeDictionary = "some-dictionary", // TODO 07.06.2022 Диаграмма в разработке
}

export interface IMenuItem {
  id: MenuItemType;
  label: string;
  Icon?: SvgIconComponent;
  onClick?: () => void;
  subItems?: IMenuItem[];
  "data-test-id": string;
}

export interface IMenuItems {
  id: MenuItemType;
  title: string;
  url?: string;
  submenu?: IMenuItems[];
  onClick?: () => void;
}

const MENU_ITEM_ACTIVE_MAP = new Map<MenuItemType, ReadonlyArray<ScreenCode>>([
  [
    MenuItemType.Orders,
    [
      ScreenCode.ORDERS_LIST,
      ScreenCode.ORDERS_EDIT,
      ScreenCode.ORDERS_VIEW,
      ScreenCode.ORDERS_CREATE,
    ],
  ],
  [MenuItemType.Dictionaries, []],
]);

export const useCheckIsActive = () => {
  const currScreenCode = useOrdersSelector(getScreenCode);

  const checkIsActive = useCallback(
    (menuItemKey: MenuItemType) => {
      return Boolean(
        MENU_ITEM_ACTIVE_MAP.get(menuItemKey)?.includes(currScreenCode!),
      );
    },
    [currScreenCode],
  );
  return { checkIsActive };
};

export const useMenuItems = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return useMemo<IMenuItem[]>(
    () => [
      {
        id: MenuItemType.Orders,
        label: t("menu.orders"),
        Icon: Diamond,
        "data-test-id": SELENIUM_TEST_IDS.menu.campaignsFolder,
        subItems: [
          {
            id: MenuItemType.Orders,
            label: t("menu.campaignsList"),
            "data-test-id": SELENIUM_TEST_IDS.menu.campaignsList,
            onClick: () => {
              navigate(cdRoute(AppRoutes.getOrdersList), { replace: true });
            },
          },
          // {
          //   id: MenuItemType.CampaignsNeedApprove,
          //   label: t("menu.campaignsNeedApprove"),
          //   onClick: () => {
          //     navigate(cdRoute(AppRoutes.getCampaignsNeedApprove), {
          //       replace: true,
          //     });
          //   },
          // },
        ],
      },
      // {
      //   id: MenuItemType.Dictionaries,
      //   label: t("menu.dictionaries"),
      //   Icon: ListAlt,
      //   onClick: () => {
      //     /* do nothing */
      //   },
      //   subItems: [
      //     {
      //       id: MenuItemType.SomeDictionary,
      //       label: "Какой-то справочник",
      //       onClick: () => {
      //         navigate(cdRoute(AppRoutes.getDictionary), {
      //           replace: true,
      //         });
      //       },
      //     },
      //   ],
      // },
    ],
    [t, navigate],
  );
};

export const useMenuItems2 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMemo<IMenuItems[]>(
    () => [
      {
        id: MenuItemType.Orders,
        title: t("navbar.orders"),
        url: "/orders",
        onClick: () => {
          navigate(cdRoute(AppRoutes.getOrdersList), { replace: true });
        },
      },
      {
        id: MenuItemType.Calendar,
        title: t("navbar.calendar"),
        url: "/long-list",
        onClick: () => {
          navigate("/long-list", { replace: true });
        },
      },
      {
        id: MenuItemType.Dictionaries,
        title: t("navbar.dictionary.header"),
        submenu: [
          {
            id: MenuItemType.Dictionaries,
            title: t("navbar.dictionary.container"),
            url: "/dictionary/container",
            onClick: () => {
              navigate("/long-list", { replace: true });
            },
          },
          {
            id: MenuItemType.Dictionaries,
            title: t("navbar.dictionary.color"),
            url: "/dictionary/color",
            onClick: () => {
              navigate("/long-list", { replace: true });
            },
          },
        ],
      },
    ],
    [navigate, t],
  );
};

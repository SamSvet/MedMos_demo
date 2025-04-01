import { FC, useCallback, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/app-routes";
import { useOrdersDispatch } from "../../store/orders-store";
import { ordersDispatcher } from "../../store/thunks/orders-dispatcher";
import { useTranslation } from "react-i18next";
import {
  APPROVAL_FILTER_DATA_DEFAULT,
  LIST_FILTER_DATA_DEFAULT,
  SCREEN_DATA_DEFAULT,
} from "../../constants/sd-fd";

export const ControllerDispatcher: FC = () => {
  const dispatch = useOrdersDispatch();
  const match = useMatch("/cd/:path");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getData = useCallback(
    (path: string | undefined) => {
      switch (path) {
        // case AppRoutes.getCampaignsNeedApprove:
        //   dispatch(
        //     campaignsDispatcher
        //       .withNavigate(navigate)
        //       .withScreenData(SCREEN_DATA_DEFAULT)
        //       .withFilterData(APPROVAL_FILTER_DATA_DEFAULT)
        //       .approvalList()
        //   );
        //   break;
        case AppRoutes.getDictionary:
          // TODO 07.06.2022 Диаграмма в разработке
          navigate("/dictionary_tmp_url", { replace: true });
          break;
        case AppRoutes.getOrdersList:
        default:
          dispatch(
            ordersDispatcher
              .withNavigate(navigate)
              .withScreenData(SCREEN_DATA_DEFAULT)
              .withFilterData(LIST_FILTER_DATA_DEFAULT)
              .list(),
          );
          break;
      }
    },
    [dispatch, navigate],
  );

  useEffect(() => {
    getData(match?.params.path);
  }, [getData, match?.params.path]);

  return <>{t("")}</>;
};

export function cdRoute(route: AppRoutes): string {
  return `/cd/${route}`;
}

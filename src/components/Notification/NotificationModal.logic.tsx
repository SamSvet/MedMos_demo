import React, { ReactNode, useCallback, useMemo } from "react";
import {
  ErrorOutlineOutlined,
  LogoutOutlined,
  Block,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ErrorCodes } from "../../api/shared/common/errors";
import { ModalInfo } from "../../store/slices/common/modal";
import { hideAllPopups, hideModal } from "../../store/thunks/common/messages";
import { useOrdersDispatch } from "../../store/orders-store";
import { PopupInfo } from "../../store/slices/common/popup";
import { SELENIUM_TEST_IDS } from "../../constants/selenium-test-ids";

export type NotificationType = "modal" | "popup";
const NOTIFICATION_ICONS = new Map<ErrorCodes, ReactNode>([
  [
    ErrorCodes.NOT_AUTHENTICATED,
    <LogoutOutlined key={ErrorCodes.NOT_AUTHENTICATED} color="warning" />,
  ],
  [
    ErrorCodes.NOT_AUTHORIZED,
    <LogoutOutlined key={ErrorCodes.NOT_AUTHORIZED} color="warning" />,
  ],
  [
    ErrorCodes.NO_PAGE,
    <ErrorOutlineOutlined key={ErrorCodes.NO_PAGE} color="error" />,
  ],
  [
    ErrorCodes.BAD_PARAMS,
    <ErrorOutlineOutlined key={ErrorCodes.BAD_PARAMS} color="error" />,
  ],
  [
    ErrorCodes.NOT_FOUND,
    <ErrorOutlineOutlined key={ErrorCodes.NOT_FOUND} color="error" />,
  ],
  [ErrorCodes.NO_ACCESS, <Block key={ErrorCodes.NO_ACCESS} color="error" />],
  [
    ErrorCodes.SYSTEM_ERROR,
    <ErrorOutlineOutlined key={ErrorCodes.SYSTEM_ERROR} color="error" />,
  ],
  [
    ErrorCodes.LOCKED,
    <ErrorOutlineOutlined key={ErrorCodes.LOCKED} color="warning" />,
  ],
  [
    ErrorCodes.INVALID_OPERATION,
    <ErrorOutlineOutlined key={ErrorCodes.INVALID_OPERATION} color="warning" />,
  ],
]);

const useNotificationActions = (
  modal: ModalInfo | undefined,
  type: NotificationType,
): { actions: ReactNode; onClose: () => void; onClosePopup: () => void } => {
  const { t } = useTranslation();
  const dispatch = useOrdersDispatch();

  const onClose = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const onClosePopup = useCallback(() => {
    dispatch(hideAllPopups());
  }, [dispatch]);

  const onRelogin = useCallback(() => {
    window.location.reload();
  }, []);

  const actionsMap = useMemo(
    () =>
      new Map<string, ReactNode>([
        [
          "close",
          <Button
            onClick={onClose}
            key="close"
            data-testid="notification-close-btn"
            data-test-id={SELENIUM_TEST_IDS.notifications.closeBtn}
          >
            {t("buttons.close")}
          </Button>,
        ],
        [
          "close_popup",
          <Button
            onClick={onClosePopup}
            key="close"
            data-testid="notification-close-btn"
            data-test-id={SELENIUM_TEST_IDS.notifications.closeBtn}
          >
            {t("buttons.close")}
          </Button>,
        ],

        [
          "login",
          <Button
            key="login"
            data-testid="notification-login-btn"
            onClick={onRelogin}
          >
            {t("notificationModal.btns.login")}
          </Button>,
        ],
        [
          "contact_support",
          <Button
            key="contact_support"
            href="mailto:semyos88@gmail.com"
            data-testid="notification-contact-support-btn"
          >
            {t("notificationModal.btns.contact_support")}
          </Button>,
        ],
        [
          "contact_admin",
          <Button
            key="contact_admin"
            href="mailto:semyos88@gmail.com"
            data-testid="notification-contact-admin-btn"
          >
            {t("notificationModal.btns.contact_admin")}
          </Button>,
        ],
      ]),
    [onClose, onClosePopup, onRelogin, t],
  );

  const actions = useMemo(() => {
    switch (modal?.code) {
      case ErrorCodes.NOT_AUTHENTICATED:
      case ErrorCodes.NOT_AUTHORIZED:
        return actionsMap.get("login");
      case ErrorCodes.NO_ACCESS:
        return type === "popup"
          ? actionsMap.get("contact_admin")
          : [actionsMap.get("contact_admin"), actionsMap.get("close")];
      case ErrorCodes.SYSTEM_ERROR:
        return type === "popup"
          ? actionsMap.get("contact_support")
          : [actionsMap.get("contact_support"), actionsMap.get("close")];
      default:
        return type === "popup"
          ? actionsMap.get("close_popup")
          : actionsMap.get("close");
    }
  }, [actionsMap, modal?.code, type]);

  return { onClose, actions, onClosePopup };
};

export const useNotificationModalLogic = (
  modal: ModalInfo | PopupInfo | undefined,
  type: NotificationType = "modal",
) => {
  const { t } = useTranslation();

  const { actions, onClose, onClosePopup } = useNotificationActions(
    modal,
    type,
  );

  const data = useMemo(() => {
    if (!modal) {
      return undefined;
    }
    return {
      title: modal.code ? t(`notificationModal.${modal.type}`) : "",
      icon: modal.code ? NOTIFICATION_ICONS.get(modal.code) : undefined,
      message: modal.message as string,
    };
  }, [modal, t]);

  return {
    ...data,
    actions,
    onClose,
    onClosePopup,
  };
};

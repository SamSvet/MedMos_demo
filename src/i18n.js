import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { colors } from "./i18n_color";
const resources = {
  ru: {
    translation: {
      color: { ...colors },
      buttons: {
        close: "Закрыть",
      },
      notificationModal: {
        notFound: "Заказ не найден",
        systemError: "Системная ошибка",
        noAccess: "Нет доступа",
        badParams: "Неверные параметры",
        btns: {
          login: "Логин",
          contact_support: "Написать в поддержку",
          contact_admin: "Написать администратору",
        },
      },
      navbar: {
        logo: " Загрузка внешних списков",
        debug: "Отладка ",
        logs: {
          openBtn: " Логи ",
          clearBtn: "Очистить логи",
          applicationTab: "Сервисы SAS",
          applicationEmpty: "Список сервисов SAS пуст",
          debugTab: "Отладка",
          debugEmpty: "Список детальных логов пуст",
          failedTab: "Неудачные запросы",
          failedEmpty: "Список неудачных запросов SAS пуст",
          errorTab: "Ошибки SAS",
          errorEmpty: "Список ошибок SAS пуст",
        },
      },
      card: {
        file: { header: "Процесс" },
      },
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

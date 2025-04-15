import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { colors } from "./i18n_color";
const resources = {
  ru: {
    translation: {
      refs: {
        noResults: "Нет опций",
      },
      common: {
        notAvailableField: "Не доступно для выбора",
        addOptionTitle: "Добавить",
        noOptionTitle: "Нет опций для выбора",
        clearBtn: "Очистить",
        editBtn: "Редактировать",
        collapseBtn: "Свернуть",
        cancelBtn: "Отмена",
        saveBtn: "Создать",
        maxTitle: "максимум",
        minTitle: "минимум",
      },
      order: {
        create: {
          title: "Новый заказ",
          fileBtn: "Выберите файл",
          nameField: "Имя",
          sizeField: "Размер",
          modateField: "Изменен",
        },
        show: {
          splitOrderBtn: "Создание новой подгруппы",
          reserveBtn: "Зарезервировать",
          addPositionBtn: "Добавить позицию",
          editOrderBtn: "Редактировать заказ",
          viewOrderBtn: "Просмотр заказа",
          infoTitle: "Информация",
          contactsTitle: "Контакты",
          descriptionTitle: "Описание",
          nameTitle: "Имя Заказа",
          createdTitle: "Создан",
          updatedTitle: "Обновлен",
          returnBtn: "К Заказам",
          fullNameTitle: "ФИО",
          emailTitle: "Почта",
          phoneTitle: "Телефон",
        },
        edit: {
          title: "Редактирование заказа",
          updated: "Дата обновления",
          manager: "Менеджер",
        },
        split: {
          title: "Создание новой группы позиций",
        },
        reserve: {
          title: "Резервирование позиций",
        },
      },
      position: {
        create: {},
      },
      language: {
        tooltip: "Сменить язык",
        ru: { code: "RU", value: "Российская Федерация" },
        us: { code: "US", value: "США" },
      },
      navbar: {
        orders: "Заказы",
        calendar: "Календарь",
        dictionary: {
          header: "Справочники",
          container: "Контейнер",
          color: "Цвет",
        },
      },
      weekday: {
        monday: { short: "Пн" },
        tuesday: { short: "Вт" },
        wednsday: { short: "Ср" },
        thursday: { short: "Чт" },
        friday: { short: "Пт" },
        saturday: { short: "Сб" },
        sunday: { short: "Вс" },
      },
      month: {
        january: "Январь",
        february: "Февраль",
        march: "Март",
        april: "Апрель",
        may: "Май",
        june: "Июнь",
        july: "Июль",
        august: "Август",
        september: "Сентябрь",
        october: "Октябрь",
        november: "Ноябрь",
        december: "Декабрь",
      },
      daterange: {
        clearFilterBtn: "Очистить фильтр",
        startDateLbl: "Дата начала",
        endDateLbl: "Дата окончания",
        menu: {
          today: "Сегодня",
          yesterday: "Вчера",
          currentWeek: "Текущая неделя",
          lastWeek: "Прошлая неделя",
          last7Days: "Последние 7 дней",
          currentMonth: "Текущий месяц",
          lastMonth: "Прошлый месяц",
        },
      },
      table: {
        toolbar: {
          addNewOrderBtn: "Создать новый заказ",
          clearSortBtn: "Очистить сортировку",
          clearFilterBtn: "Очистить фильтр",
          downloadOrderBtn: "Скачать все заказы",
          searchBtn: "Поиск",
        },
        header: {
          order: "Заказ",
          positionName: "Артикул по РУ",
          positionDescription: "Описание позиции",
          positionCount: "Количество позиций",
          description: "Описание",
          modelID: "Модельный Номер",
          color: "Цвет",
          container: "Контейнер",
          deliveryDate: "Дата Доставки",
          status: "Статус",
          quantity: "Всего",
          reserved: "В резерве",
          remain: "Остаток",
        },
        body: {
          viewOrder: "Просмотр заказа",
        },
      },
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
      card: {
        file: { header: "Процесс" },
      },
    },
  },
  us: {
    translation: {
      refs: {
        noResults: "No options",
      },
      common: {
        notAvailableField: "Not available for selection",
        addOptionTitle: "Add",
        noOptionTitle: "No options available",
        clearBtn: "Clear",
        editBtn: "Edit",
        collapseBtn: "Collapse",
        cancelBtn: "Cancel",
        saveBtn: "Save",
        maxTitle: "max",
        minTitle: "min",
      },
      order: {
        create: {
          title: "New order",
          fileBtn: "Select file",
          nameField: "Name",
          sizeField: "Size",
          modateField: "Modified",
        },
        show: {
          splitOrderBtn: "Split Order",
          reserveBtn: "Reserve Stock",
          addPositionBtn: "Add Position",
          editOrderBtn: "Edit Order",
          viewOrderBtn: "View Order",
          infoTitle: "Main Info",
          contactsTitle: "Contacts",
          descriptionTitle: "Description",
          nameTitle: "Name",
          createdTitle: "Created",
          updatedTitle: "Updated",
          returnBtn: "Back to Orders",
          fullNameTitle: "Full Name",
          emailTitle: "E-mail",
          phoneTitle: "Phone",
        },
        edit: {
          title: "Edit Order",
          updated: "Date of Update",
          manager: "Manager",
        },
        split: {
          title: "Split Order",
        },
        reserve: {
          title: "Reserve Positions",
        },
      },
      position: {
        create: {},
      },
      language: {
        tooltip: "Change language",
        ru: { code: "RU", value: "Russian Federation" },
        us: { code: "US", value: "United States" },
      },
      weekday: {
        monday: { short: "Mn" },
        tuesday: { short: "Tu" },
        wednsday: { short: "We" },
        thursday: { short: "Th" },
        friday: { short: "Fr" },
        saturday: { short: "Sa" },
        sunday: { short: "Su" },
      },
      month: {
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
      },
      daterange: {
        clearFilterBtn: "Clear filter",
        startDateLbl: "Start date",
        endDateLbl: "End date",
        menu: {
          today: "Today",
          yesterday: "Yesterday",
          currentWeek: "Current Week",
          lastWeek: "Last Week",
          last7Days: "Last 7 Days",
          currentMonth: "Current Month",
          lastMonth: "Last Month",
        },
      },
      table: {
        toolbar: {
          addNewOrderBtn: "Create new order",
          clearSortBtn: "Clear sorting",
          clearFilterBtn: "Clear filters",
          downloadOrderBtn: "Download orders",
          searchBtn: "Search",
        },
        header: {
          order: "Order",
          positionName: "Article",
          description: "Description",
          positionDescription: "Position Description",
          positionCount: "Position Count",
          modelID: "Model Number",
          color: "Color",
          container: "Container",
          deliveryDate: "Delivery Date",
          status: "Status",
          quantity: "Quantity",
          reserved: "Reserved Stock",
          remain: "Remain Stock",
        },
        body: {
          viewOrder: "View order",
        },
      },
      notificationModal: {
        notFound: "Order not found",
        systemError: "System error",
        noAccess: "No Access",
        badParams: "Bad parameters",
        btns: {
          login: "Login",
          contact_support: "Contact support",
          contact_admin: "Contact admin",
        },
      },
      buttons: {
        close: "Close",
      },
      navbar: {
        orders: "Orders",
        calendar: "Calendar",
        dictionary: {
          header: "Dictionaries",
          container: "Container",
          color: "Color",
        },
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

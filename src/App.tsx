import React from "react";
import { StableNavigateContextProvider } from "./hooks/useStableNavigate";
import { BrowserRouter } from "react-router-dom";
import { OrdersContext, ordersStore } from "./store/orders-store";
import { Provider as ReduxProvider } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import { AppContent } from "./components/AppContent/AppContent";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { AppMainLayout } from "./components/AppMainLayout/AppMainLayout";
import { AppContextProvider } from "./components/AppContextProvider/AppContextProvider";
import { ru, enUS } from "date-fns/locale";
import "./i18n";
import { useTranslation } from "react-i18next";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

interface LocaleDict {
  [locale_code: string]: Locale;
}

const App = () => {
  const { i18n } = useTranslation();
  const tableLocale: LocaleDict = {
    ru: ru,
    us: enUS,
  };

  return (
    <ReduxProvider store={ordersStore} context={OrdersContext}>
      <BrowserRouter>
        <StableNavigateContextProvider>
          <AppContextProvider>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={tableLocale[i18n.language] || ru}
            >
              <AppMainLayout Header={AppHeader} Content={AppContent} />
            </LocalizationProvider>
          </AppContextProvider>
        </StableNavigateContextProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;

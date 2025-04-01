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
import { ru } from "date-fns/locale";
import { AppHeader2 } from "./components/AppHeader/AppHeader2";
import "./i18n";

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

const App = () => (
  <ReduxProvider store={ordersStore} context={OrdersContext}>
    <BrowserRouter>
      <StableNavigateContextProvider>
        <AppContextProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
            <AppMainLayout Header={AppHeader} Content={AppContent} />
          </LocalizationProvider>
        </AppContextProvider>
      </StableNavigateContextProvider>
    </BrowserRouter>
  </ReduxProvider>
);

export default App;

import { Box, Container, CssBaseline } from "@mui/material";
import { FC } from "react";
import { useInitialRequest } from "../../hooks/useInitialRequest";
import { Outlet } from "react-router-dom";
import { NotificationPopup } from "../Notification/Popup/NotificationPopup";
import { NotificationModal } from "../Notification/Modal/NotificationModal";

interface AppMainLayoutProps {
  // Logo: FC<AppLogoComponent>;
  // Menu: FC<AppMenuComponent>;
  Header: FC;
  Content: FC;
  Footer?: FC;
  //HidePanelBtn?: FC<AppHidePanelBtnComponent>;
}

export const AppMainLayout: FC<AppMainLayoutProps> = ({
  Header,
  Content,
  Footer,
}) => {
  useInitialRequest();
  //   const theme = useTheme();
  //   const [menuOpen, setMenuOpen] = useState(true);
  return (
    <Box sx={{ flexDirection: "column" }}>
      <CssBaseline />
      <Header />

      <Box sx={{ paddingRight: 3, paddingLeft: 3 }}>
        <Content />
      </Box>
      {/* <Box
        component="main"
        sx={{ height: "100vh", overflow: "auto", flexGrow: 1 }}
      >
        <Content />
      </Box> */}
      {Footer && <Footer />}
      <NotificationPopup />
      <NotificationModal />
    </Box>
  );
};

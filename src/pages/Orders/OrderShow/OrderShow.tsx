import { useState, ChangeEvent } from "react";
import { useOrdersSelector } from "../../../store/orders-store";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Divider,
  Button,
  Stack,
  Fab,
} from "@mui/material";
import { useOrderValidation } from "../common/hooks/useOrderValidation";
import { useOrderViewAttributes } from "./OrderShow.models";
import { OrderAside } from "../common/components/OrderAside/OrderAside";
import {
  getAdditionalOrderViewData,
  getOrderView,
} from "../../../selectors/orders/order-view-selectors";
import { usePositionTabsData } from "./hooks/usePositionTabsData";
import { PositionIteratorRef } from "./PositionIterator";
import { useOrderShowActions } from "./hooks/useOrderShowActions";
import { Outlet } from "react-router-dom";
import usePrevious, { usePrevious2 } from "../../../hooks/usePrevious";
import { useBackToList } from "../common/hooks/useBackToList";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

export const OrderShow = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [tabValue, setTabValue] = useState(0);
  const tabValuePrev = usePrevious2(tabValue);
  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  const { orders, positions } = useOrdersSelector(getOrderView);

  const { bad_attributes } = useOrdersSelector(getAdditionalOrderViewData);

  const {
    showEdit: linkHandler,
    showCreatePositions,
    showEditPositions,
    showPositionsList,
    showReservePositions,
  } = useOrderShowActions(orders[0], positions || []);

  const { orderErrors } = useOrderValidation(bad_attributes);

  const model = useOrderViewAttributes(orders[0], orderErrors);
  const { positionsTabData, positionsTabs } = usePositionTabsData(positions);

  //   const positionList = usePositionsLists(undefined, positionsErrors);

  return (
    <>
      <Box mt={2} display="flex">
        <Box flex={1}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Typography variant="h5">
                  {model.get("order_name")?.value}
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  onClick={showCreatePositions}
                  startIcon={<AddIcon />}
                >
                  {t("order.show.addPositionBtn")}
                </Button>
              </Stack>
              <Tabs
                value={tabValue}
                textColor="secondary"
                indicatorColor="secondary"
                onChange={handleTabChange}
              >
                {positionsTabs.map((tab) => (
                  <Tab key={tab} label={tab} />
                ))}
              </Tabs>
              <Divider />

              {positionsTabs.map((tab, index) => (
                <TabPanel key={tab} value={tabValue} index={index}>
                  <PositionIteratorRef
                    isOpen={tabValue === index}
                    keyValue={tab}
                    positions={positionsTabData.get(tab) || []}
                    clickHandler={showPositionsList}
                    clickEditHandler={showEditPositions}
                    clickReserveHandler={showReservePositions}
                    prevTabNumber={tabValuePrev || 0}
                    tabNumber={tabValue}
                  />
                </TabPanel>
              ))}
            </CardContent>
          </Card>
        </Box>
        <OrderAside model={model} linkHandler={linkHandler} link="edit" />
      </Box>
      <Outlet />
    </>
  );
};

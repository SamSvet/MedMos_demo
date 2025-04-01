import { Routes, Route, Navigate } from "react-router-dom";
import { useOrdersDispatch } from "../../store/orders-store";
import LongList from "../../pages/Orders/long-list";
import Orders from "../../pages/Orders/orders";
import OrderCreate from "../../pages/Orders/OrderCreate/OrderCreate";
import OrderEdit from "../../pages/Orders/OrderEdit/OrderEdit";
import { OrderShow } from "../../pages/Orders/OrderShow/OrderShow";
import { PositionCreate } from "../../pages/Orders/PositionCreate/PositionCreate";
import { PositionEdit } from "../../pages/Orders/PositionEdit/PositionEdit";
import { PositionList } from "../../pages/Orders/PositionList/PositionList";
import { ControllerDispatcher } from "../../pages/ControllerDispatcher/ControllerDispatcher";
import { OrderCreateFile } from "../../pages/Orders/OrderCreate/OrderCreateFile";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { FallBackDefault } from "../ErrorBoundary/FallBackDefault/FallBackDefault";
import { PositionEditDialog } from "../../pages/Orders/PositionEdit/PositionEditDialog";
import { PositionReserveDialog } from "../../pages/Orders/PositionEdit/PositionReserveDialog";

export const AppContent = () => {
  const dispatch = useOrdersDispatch();
  return (
    <Routes>
      <Route path="/cd/:path" element={<ControllerDispatcher />} />
      <Route path="/" element={<Navigate to="/orders" />} />
      <Route index element={<Navigate to="/orders" />} />
      <Route path="/orders" element={<Orders />}>
        <Route path="create/*" element={<OrderCreateFile />} />
        {/* <Route path="create/*" element={<OrderCreate />} /> */}
      </Route>
      <Route path="orders/:order_id" element={<OrderShow />}>
        <Route path="edit" element={<OrderEdit />} />
        <Route
          path="positions/:position_id/edit"
          element={<PositionEditDialog />}
        />
        <Route
          path="positions/:position_id/reserve"
          element={<PositionReserveDialog />}
        />
      </Route>

      <Route
        path="orders/:order_id/positions/create"
        element={
          <ErrorBoundary FallbackComponent={FallBackDefault}>
            <PositionCreate />
          </ErrorBoundary>
        }
      />

      {/* <Route
        path="orders/:order_id/positions/:position_id/edit"
        element={<PositionEdit />}
      /> */}
      {/* <Route
        path="orders/:order_id/positions/:position_id"
        element={<PositionList />}
      /> */}
      {/* <Route
        path="/orders/create"
        element={<Navigate to="/orders/create" replace />}
      /> */}
      {/* <Route path="/orders/create" element={<AlertDialogSlide />} /> */}

      <Route path="/long-list" element={<LongList />} />
    </Routes>
  );
};

import { Outlet } from "react-router-dom";
import OrdersTable from "./OrdersTable";

export default function Orders() {
  return (
    <div>
      <OrdersTable />
      <Outlet />
    </div>
  );
}

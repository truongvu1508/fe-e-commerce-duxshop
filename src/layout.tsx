import AppHeader from "./components/layout/app.header";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

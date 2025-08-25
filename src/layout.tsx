import { useEffect } from "react";
import AppHeader from "./components/layout/app.header";
import { Outlet } from "react-router";
import { getAccountApi } from "./services/api";
import { useAppContext } from "./context/app.provider";

const AppLayout = () => {
  const { setUserInfo } = useAppContext();
  const fetchAccount = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const res = await getAccountApi(access_token);
      if (res?.data?.data?.user) {
        setUserInfo(res?.data?.data?.user);
      }
      console.log(">>> check user: ", res.data.data.user);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

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

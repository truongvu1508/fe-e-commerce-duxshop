import { useEffect } from "react";
import AppHeader from "./components/layout/app.header";
import { Outlet } from "react-router";
import { getAccountApi } from "./services/api";
import { useAppContext } from "./context/app.provider";
import { Spin } from "antd";
import AppFooter from "./components/layout/app.footer";

const AppLayout = () => {
  const { userInfo, setUserInfo } = useAppContext();
  const fetchAccount = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const res = await getAccountApi(access_token);
      if (res?.data?.data?.user) {
        setUserInfo({
          id: res?.data?.data?.user.id,
          username: res?.data?.data?.user.username,
          isAuthenticated: true,
          isLoading: true,
        });
      }
      console.log(">>> check user: ", res.data.data.user);
    } else {
      setUserInfo({
        id: 0,
        username: "",
        isAuthenticated: false,
        isLoading: true,
      });
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  console.log(">>> check user info", userInfo);

  return (
    <div>
      {userInfo.isLoading === true ? (
        <>
          <AppHeader />
          <div className="app-content">
            <Outlet />
          </div>
          <AppFooter />
        </>
      ) : (
        <div className="popup">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default AppLayout;

import type React from "react";
import { createContext, useContext, useState } from "react";

interface IAppData {
  userInfo: {
    isAuthenticated: boolean;
    isLoading: boolean;
    id: number;
    username: string;
  };
  setUserInfo: (v: any) => void;

  username: string;
  setUsername: (v: string) => void;
}

const AppContext = createContext<IAppData | null>(null);

// custom hook
export const useAppContext = () => {
  const object = useContext(AppContext);
  if (!object) {
    throw new Error("useAppContext must be used within a Provider");
  }
  return object;
};

interface IProps {
  children: React.ReactNode;
}

const AppProvider = (props: IProps) => {
  const [username, setUsername] = useState<string>("");
  const [userInfo, setUserInfo] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
    id: number;
    username: string;
  }>({ isAuthenticated: false, isLoading: false, id: 0, username: "" });
  const { children } = props;

  return (
    <AppContext.Provider
      value={{ userInfo, setUserInfo, username, setUsername }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

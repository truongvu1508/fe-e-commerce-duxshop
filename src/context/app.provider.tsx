import type React from "react";
import { createContext, useContext, useState } from "react";

interface IAppData {
  theme: string;
  setTheme: (v: string) => void;

  userInfo: {
    isAuthenticated: boolean;
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
  const [theme, setTheme] = useState<string>("light");
  const [username, setUsername] = useState<string>("");
  const [userInfo, setUserInfo] = useState<{
    isAuthenticated: boolean;
    id: number;
    username: string;
  }>({ isAuthenticated: false, id: 0, username: "" });
  const { children } = props;

  return (
    <AppContext.Provider
      value={{ theme, setTheme, userInfo, setUserInfo, username, setUsername }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

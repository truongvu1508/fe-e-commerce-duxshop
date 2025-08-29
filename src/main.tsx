import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AppLayout from "./layout.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserPage from "./pages/user.tsx";
import HomePage from "./pages/home.tsx";
import LoginPage from "./pages/login.tsx";
import { App } from "antd";
import AppProvider from "./context/app.provider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AppProvider>
  </StrictMode>
);

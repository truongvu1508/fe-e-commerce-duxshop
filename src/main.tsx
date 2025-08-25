import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AppLayout from "./layout.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserPage from "./pages/user.tsx";
import HomePage from "./pages/home.tsx";

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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import { createBrowserRouter } from "react-router";
import App from "../App";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import ActivationPage from "../pages/Auth/ActivationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        children: [
          { path: "register", element: <RegisterPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "activation/:username/:activationCode", element: <ActivationPage /> },
        ],
      },
    ],
  },
]);

export default router;

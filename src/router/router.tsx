import { createBrowserRouter } from "react-router";
import App from "../App";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import ActivationPage from "../pages/Auth/ActivationPage";
import MainLayout from "../layouts/Main/MainLayout";
import HomePage from "../pages/Home/HomePage";
import ViewProfilePage from "../pages/ViewProfile/ViewProfilePage";
import EditProfilePage from "../pages/EditProfile/EditProfilePage";
import EditPost from "../pages/Post/EditPost";

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
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "user/:username", element: <ViewProfilePage /> },
          { path: "user/profile/edit", element: <EditProfilePage /> },
          { path: "user/post/edit/:postId", element: <EditPost /> },
        ],
      },
    ],
  },
]);

export default router;

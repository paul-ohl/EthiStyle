import { useAuth } from "../provider/auth_provider";
import { ProtectedRoute } from "./protected_route";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WelcomePage } from "app/pages/login_register/welcome_page";
import { LostPassword } from "app/pages/login_register/lost_password";
import { LoginRoute } from "./login";
import { MainPage } from "app/pages/main_page/main_page";
import { SellingPage } from "app/pages/selling_page/selling_page";
import GpsLocalisation from "app/pages/login_register/gps_localisation";
import { ManualLocalisation } from "app/pages/login_register/manual_localisation";
import { RegisterRoute } from "./register";
import { LogoutRoute } from "./logout";

export const Routes = () => {
  const { token } = useAuth();

  const bothRoutes = [
    {
      path: "/about",
      element: <h1>About</h1>,
    },
  ];

  const notAuthRoutes = [
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/login",
      element: <LoginRoute />,
    },
    {
      path: "/register",
      element: <RegisterRoute />,
    },
    {
      path: "/lost-password",
      element: <LostPassword />,
    },
  ];

  const authRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/sell",
          element: <SellingPage />,
        },
        {
          path: "/settings",
          element: <h1>Settings</h1>,
        },
        {
          path: "/profile",
          element: <h1>Profile</h1>,
        },
        {
          path: "/location-gps",
          element: <GpsLocalisation />,
        },
        {
          path: "/location-manual",
          element: <ManualLocalisation />,
        },
        {
          path: "/logout",
          element: <LogoutRoute />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...bothRoutes,
    ...(token ? [] : notAuthRoutes),
    ...authRoutes,
  ]);

  return <RouterProvider router={router} />;
};

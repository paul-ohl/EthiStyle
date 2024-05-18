import { Login } from "app/pages/login_register/login";
import { Register } from "app/pages/login_register/register";
import { useAuth } from "../provider/auth_provider";
import { ProtectedRoute } from "./protected_route";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WelcomePage } from "app/pages/login_register/welcome_page";
import { LostPassword } from "app/pages/login_register/lost_password";

export const Routes = () => {
  const { token } = useAuth();

  const bothRoutes = [
    {
      path: "/about",
      element: <h1>About</h1>,
    }
  ];

  const notAuthRoutes = [
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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
          element: <h1>Home</h1>,
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
          path: "/logout",
          element: <h1>Logout</h1>,
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

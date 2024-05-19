import { Login } from "app/pages/login_register/login";
import { useAuth } from "app/provider/auth_provider";
import { useNavigate } from "react-router-dom";

export const LoginRoute = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setToken("token");
    navigate("/", { replace: true });
  };

  return <Login handleLogin={handleLogin} />;
}

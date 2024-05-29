import { Register } from "app/pages/login_register/register";
import { useAuth } from "app/provider/auth_provider";
import { useNavigate } from "react-router-dom";

export const RegisterRoute = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    setToken("token");
    navigate("/location-gps", { replace: true });
  };

  return <Register handleRegister={handleRegister} />;
}

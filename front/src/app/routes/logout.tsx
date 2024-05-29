import { useAuth } from "app/provider/auth_provider";
import { useNavigate } from "react-router-dom";

export const LogoutRoute = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

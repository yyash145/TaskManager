import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/jwt";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
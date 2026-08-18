import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PageState from "../ui/PageState";
export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageState type="loading" title="Loading user..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

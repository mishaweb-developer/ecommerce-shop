import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
export default function ProtectedRoute() {
  /* TASK-13
TODO: Dodaj loading stanje, dozvoli pristup korisniku i preusmeri gosta na Login.
HINT: Koristi AuthContext, Navigate i Outlet.
*/
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

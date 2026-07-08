import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../entities/auth";
import Loader from "../../../shared/components/Loader";

export function ProtectedRoute() {
  const location = useLocation();
  const status = useAuthStore((state) => state.status);

  if (status === "loading") {
    return <Loader label="Securing your workspace" />;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const status = useAuthStore((state) => state.status);

  if (status === "loading") {
    return <Loader label="Loading secure access" />;
  }

  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

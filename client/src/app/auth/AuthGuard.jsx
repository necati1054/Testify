import { Navigate, useLocation } from "react-router-dom";
// HOOK
import useAuth from "app/hooks/useAuth";

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  let authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        // <Navigate replace to="/login" state={{ from: pathname }} />
        <Navigate replace to="/" state={{ from: pathname }} />
      )}
    </>
  );
}

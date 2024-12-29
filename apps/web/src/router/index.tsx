import { type ReactElement, Suspense, lazy } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

// Hooks
import { useAuth } from "@clerk/clerk-react";

// Types
import type { Role } from "../contexts/AuthContext";

// Pages
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));

interface ProtectedRouteProps {
  element: ReactElement;
  isProtected: boolean;
  roles?: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  isProtected,
  roles = [],
}) => {
  const { isSignedIn, orgRole } = useAuth();

  const hasRequiredRole =
    roles.length === 0 || roles.some((role) => userRoles.includes(role));

  if (isProtected && !isSignedIn) {
    return <Navigate to="/" replace />;
  }

  if (isProtected && !hasRequiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return element;
};

export const routes = [
  { path: "/", element: <Home />, isProtected: false },
  { path: "*", element: <NotFound />, isProtected: false },
];

const Router = () => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        {routes.map(({ path, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute element={element} isProtected={isProtected} />
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;

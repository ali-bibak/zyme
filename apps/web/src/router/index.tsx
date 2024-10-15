import { type ReactElement, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));

interface ProtectedRouteProps {
  element: ReactElement;
  isProtected: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  isProtected,
}) => {
  const { isAuthenticated } = useAuth();
  console.log(
    isAuthenticated ? "Logged in successfully!" : "Your TOKEN expired!",
  );

  return isProtected && !isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    element
  );
};

export const routes = [
  { path: "/", element: <Home />, isProtected: false },
  { path: "/dashboard", element: <Dashboard />, isProtected: true },
  { path: "*", element: <NotFound />, isProtected: false },
];

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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

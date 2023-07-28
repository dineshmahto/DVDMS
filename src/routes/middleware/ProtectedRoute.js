import { Navigate, Outlet } from "react-router-dom";
import isAuthenticated from "./auth";
const ProtectedRoute = ({
  totalActivity,
  activityList,
  isAllowed,
  redirectPath = "/",
  children,
}) => {
  console.log("isAuthenticated", isAuthenticated());
  if (
    !totalActivity.length ||
    totalActivity.includes(activityList) ||
    !isAuthenticated()
  ) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;

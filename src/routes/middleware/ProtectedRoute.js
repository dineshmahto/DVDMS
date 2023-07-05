import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({
  totalActivity,
  activityList,
  isAllowed,
  redirectPath = "/",
  children,
}) => {
  if (!totalActivity.length || totalActivity.includes(activityList)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;

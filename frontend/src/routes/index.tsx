import {
  Route,
  Routes as DOMRoutes,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Transactions from "../pages/Transactions";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";
import { useQuery } from "@apollo/client";
import GET_AUTHENTICATED_USER from "../graphql/queries/user.query";
import toast from "react-hot-toast";

const Routes = () => {
  return (
    <DOMRoutes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/transaction/:id" element={<Transactions />} />
      </Route>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </DOMRoutes>
  );
};

/**
 * @description Force user to login before accessing protected routes
 * @returns {ReactNode} Protected Route or Redirect to login page
 */
const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { data, error } = useQuery(GET_AUTHENTICATED_USER);
  if (error) {
    toast.error("An error occurred. Please try again later");
    console.log(error);
  }

  if (!data?.authUser) {
    // we make the previous location available to the login page so insede the login function we can redirect the user to the previous location
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default Routes;

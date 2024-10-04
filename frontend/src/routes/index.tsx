import { Route, Routes as DOMRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Transactions from "../pages/Transactions";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";

const Routes = () => {
  return (
    <DOMRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="*" element={<NotFound />} />
    </DOMRoutes>
  );
};

export default Routes;

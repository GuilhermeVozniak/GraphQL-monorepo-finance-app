import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SingUp from "./pages/SignUp";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/dashboard" element={<Transactions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

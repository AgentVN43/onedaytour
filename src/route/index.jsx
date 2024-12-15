import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AdminDashboard from "../components/Dashboard";
import OrderForm from "../components/Annk/Form/OrderForm";

export default function MainRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuotationForm from "../components/Annk/Form/QuotationForm";
import AdminDashboard from "../pages/Dashboard";
import TourPage from "../pages/TourPage";

export default function MainRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/quote/:orderId" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

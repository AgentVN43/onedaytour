import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuotationForm from "../components/Annk/Form/QuotationForm";
import AdminDashboard from "../pages/Dashboard";

export default function MainRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/quote/:orderId" element={<QuotationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

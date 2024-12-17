import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuotationForm from "../components/Annk/Form/QuotationForm";
import Home from "../pages/Home";
import TransportationManagement from "../components/Transportation";
import AccommodationManagement from "../components/Accommodation";
import MealManagement from "../components/Meal";
import GuideServiceManagement from "../components/GuideService";
import Province from "../components/Province";
import AnnkTest from "../components/Annk";
import OrderForm from "../components/Annk/Form/OrderForm";

export default function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transportation" element={<TransportationManagement />} />
        <Route path="/accommodation" element={<AccommodationManagement />} />
        <Route path="/food-packages" element={<MealManagement />} />
        <Route path="/guides" element={<GuideServiceManagement />} />
        <Route path="/locations" element={<Province />} />
        <Route path="/quotes" element={<AnnkTest />} />
        <Route path="/quote/:orderId" element={<QuotationForm />} />
        <Route path="/add-order/" element={<OrderForm />} />
      </Routes>
    </>
  );
}

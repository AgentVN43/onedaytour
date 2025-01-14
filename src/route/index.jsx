import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuotationForm from "../components/Annk/Form/QuotationForm";
import Home from "../pages/Home";
import TransportationManagement from "../pages/Transportation";
import AccommodationManagement from "../pages/Accommodation";
import MealManagement from "../pages/Meal";
import GuideServiceManagement from "../pages/GuideService";
import Province from "../pages/Province";
import OrderForm from "../components/Annk/Form/OrderForm";
import Orders from "../pages/Orders";
import DetailOrder from "../pages/DetailOrder";
import CompareQuotes from "../pages/CompareQuotes";
import DetailQuotes from "../pages/DetailQuote";

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
        <Route path="/orders" element={<Orders />} />
        <Route path="/quote/:orderId" element={<QuotationForm />} />
        <Route path="/order/detail/:orderId" element={<DetailOrder />} />
        <Route path="/quote/detail/:quoteId" element={<DetailQuotes />} />
        <Route path="/add-order/" element={<OrderForm />} />
        <Route path="/compare/:orderId" element={<CompareQuotes />} />
      </Routes>
    </>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuotationForm from "../components/Annk/Form/QuotationForm";
import Home from "../pages/Home";
import TransportationManagement from "../pages/Transportation";
import AccommodationManagement from "../pages/Accommodation";
import MealManagement from "../pages/Meal";
import GuideServiceManagement from "../pages/GuideService";
import Province from "../pages/Province";
import OrderForm from "../components/Annk/Form/OrderForm";
import Quotes from "../pages/Quotes";
import DetailQuotes from "../pages/DetailQuotes";
import CompareQuotes from "../pages/CompareQuotes";

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
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quote/:orderId" element={<QuotationForm />} />
        <Route path="/quote/detail/:orderId" element={<DetailQuotes />} />
        <Route path="/add-order/" element={<OrderForm />} />
        <Route path="/compare/:orderId" element={<CompareQuotes />} />
      </Routes>
    </>
  );
}

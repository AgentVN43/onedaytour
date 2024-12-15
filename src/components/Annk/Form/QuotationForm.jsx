import { useParams } from "react-router-dom";

export default function QuotationForm() {
  const { orderId } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Tạo Báo Giá</h1>
      <p>Mã đơn hàng: {orderId}</p>
      {/* Add your quotation form here */}
    </div>
  );
}

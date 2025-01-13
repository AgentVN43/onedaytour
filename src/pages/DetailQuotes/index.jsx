import { BackwardOutlined, CalculatorOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Modal, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InfoTour from "../../components/Annk/Form/InfoTour";
import { orderService } from "../../services/orderService";
import { quoteService } from "../../services/quoteService";

// const datas = {
//   customer: {
//     name: "annk2",
//     phone: "12312123",
//     email: "a@gmail.com",
//     zalo: "123123123",
//   },
//   orderId: "BGIBKA-00292990-990XE",
//   departing: "Bắc Giang",
//   arriving: "Bắc Kạn",
//   vehicles: [
//     {
//       vehicleName: "Xe du lịch 45",
//       quantity: 1,
//       seats: 45,
//     },
//     {
//       vehicleName: "Xe du lịch 29",
//       quantity: 1,
//       seats: 29,
//     },
//   ],
//   meals: [
//     {
//       date: "27/12/2024",
//       sessions: [
//         { session: "Sáng", portionCount: 40 },
//         { session: "Trưa", portionCount: 48 },
//         { session: "Tối", portionCount: 48 },
//       ],
//     },
//     {
//       date: "28/12/2024",
//       sessions: [
//         { session: "Sáng", portionCount: 48 },
//         { session: "Trưa", portionCount: 48 },
//       ],
//     },
//   ],
//   service: [
//     { services: "HDV và điều hành", prices: 600000, unit: "Người" },
//     { services: "Nước", prices: 5000, unit: "Chai", quantity: 48 },
//   ],
// };

const DetailQuotes = () => {
  const [visible, setVisible] = useState(false);
  const [quotes, setQuotes] = useState([]);
  console.log("🚀 ~ DetailQuotes ~ quotes:", quotes);
  const [order, setOrder] = useState([]);
  // console.log("🚀 ~ DetailQuotes ~ order:", order);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [data, setData] = useState([]);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [listQuotes, setListQuotes] = useState([]);
  const [message, setMessage] = useState(null);

  const dataOrders = useSelector((state) => state.orderData.orders); // Get orders from Redux store

  // Get orders from Redux store
  const getOrderData = (orderId) => {
    if (!dataOrders || dataOrders.length === 0) {
      console.log("Data orders are empty or not loaded!");
      return null;
    }

    const order = dataOrders.find((item) => item.orderId === orderId);
    if (order) {
      return order;
    } else {
      console.log("Order not found!");
      return null;
    }
  };

  // const getListQuotes = async (orderId) => {
  //   try {
  //     const data = await quoteService.getByOrderId(orderId);
  //     setListQuotes(data.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const getListQuotes = async (orderId) => {
    try {
      const data = await quoteService.getByOrderId(orderId);
      if (data.data.data.length === 0) {
        // If no quotes exist, display a message
        setListQuotes([]);
        setMessage("Chưa có báo giá, hãy tạo báo giá nhé");
      } else {
        // If quotes exist, update the list and clear any previous message
        setListQuotes(data.data.data);
        setMessage(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("An error occurred while fetching quotes.");
    }
  };

  const quotations = [
    { id: 1, title: "Báo giá 1" },
    { id: 2, title: "Báo giá 2" },
    { id: 3, title: "Báo giá 3" },
  ];

  const getById = async (orderId) => {
    const resOrder = await orderService.getById(orderId);
    if (resOrder && resOrder?.data) {
      setOrder(resOrder?.data);
    }
    const res = await quoteService.getByOrderId(orderId);
    if (res && res?.data) {
      setQuotes(res?.data);
    }
  };

  // const handleCardClick = (quotationId) => {
  //   setSelectedQuotation(data.find((q) => q._id === quotationId));
  //   setVisible(true);
  // };

  const handleCardClick = (quoteId) => {
    const quote = listQuotes.find((item) => item._id === quoteId); // Find the selected quote
    setSelectedQuotation(quote); // Set selected quote
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedQuotation(null);
  };

  // useEffect(() => {
  //   const orderData = getOrderData(orderId);
  //   if (orderData) {
  //     setData(orderData);
  //   }
  // }, [orderId, dataOrders]); // Dependencies ensure this runs only when orderId or dataOrders changes

  // console.log(listQuotes);

  // console.log(selectedQuotation)

  useEffect(() => {
    getById(orderId);
    getListQuotes(orderId);
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => navigate("/quotes")}>
          <BackwardOutlined /> Trở về
        </Button>
        <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h2>
        <Button
          onClick={() => {
            console.log("Navigating with orderId:", orderId);
            navigate(`/compare/${orderId}`);
          }}
        >
          <CalculatorOutlined /> So sánh
        </Button>
      </div>
      {/* <Row gutter={16}>
        {data.map((quote) => (
          <Col span={8} key={quote.id}>
            <Card
              title={quote.title}
              hoverable
              onClick={() => handleCardClick(quote.id)}
            >
              <p>Khách hàng: {order?.customer?.name}</p>
              <p>Điểm đi: {order?.departing}</p>
              <p>Điểm đến: {order?.arriving}</p>
            </Card>
          </Col>
        ))}
      </Row> */}

      {/* <Row gutter={16}>
        {listQuotes.map((quote) => (
          <Col span={8} key={quote._id}>
            <Card
              title={quote.quoteId || quote.orderId}
              hoverable
              onClick={() => handleCardClick(quote._id)}
            >
              <p>Khách hàng: {order?.customer?.name}</p>
              <p>Điểm đi: {moment(quote.departureDate).format("DD/MM/YYYY")}</p>
              <p>Điểm đến: {moment(quote.returnDate).format("DD/MM/YYYY")}</p>
              <p>Tổng giá: {quote.totalPrice.toLocaleString()} VND</p>
            </Card>
          </Col>
        ))}
      </Row> */}

      <Row gutter={16}>
        {listQuotes.length > 0 ? (
          listQuotes.map((quote) => (
            <>
              <Col span={8} key={quote._id}>
                <Card
                  title={quote.quoteId || quote.orderId}
                  hoverable
                  onClick={() => handleCardClick(quote._id)}
                >
                  <p>Khách hàng: {order?.customer?.name}</p>
                  <p>
                    Điểm đi: {moment(quote.departureDate).format("DD/MM/YYYY")}
                  </p>
                  <p>
                    Điểm đến: {moment(quote.returnDate).format("DD/MM/YYYY")}
                  </p>
                  <p>Tổng giá: {quote.totalPrice.toLocaleString()} VND</p>
                </Card>
              </Col>
            </>
          ))
        ) : (
          <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
            <p>{message}</p>
            <Button onClick={() => navigate("/quotes")}>
              <BackwardOutlined /> Tạo đơn hàng
            </Button>
          </Col>
        )}
      </Row>

      {selectedQuotation && (
        <Modal
          title={selectedQuotation.title}
          visible={visible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên khách hàng">
              {order.customer.name}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {order.customer.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {order.customer.email}
            </Descriptions.Item>
            <Descriptions.Item label="Zalo">
              {order.customer.zalo}
            </Descriptions.Item>
            <Descriptions.Item label="Điểm đi">
              {order.departing}
            </Descriptions.Item>
            <Descriptions.Item label="Điểm đến">
              {order.arriving}
            </Descriptions.Item>
            <Descriptions.Item label="Phương tiện">
              {selectedQuotation.vehicles?.map((v) => (
                <p key={v.vehicleName}>
                  {v.vehicleName} - Số lượng: {v.quantity} - Ghế: {v.seats}
                </p>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Bữa ăn">
              {selectedQuotation.meals?.map((meal) => (
                <div key={meal.date}>
                  <p>
                    Ngày: {meal.date}
                    <br />
                    {meal.sessions.map((session) => (
                      <span key={session.session}>
                        {session.session}: {session.portionCount} suất <br />
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ">
              {selectedQuotation.service?.map((service) => (
                <p key={service.services}>
                  {service.services} - Giá: {service.prices.toLocaleString()}{" "}
                  {service.unit}
                </p>
              ))}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </>
  );
};

export default DetailQuotes;

import { BackwardOutlined, CalculatorOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Modal, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../../services/orderService";
import { quoteService } from "../../services/quoteService";

const DetailOrder = () => {
  const [visible, setVisible] = useState(false);
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

  const getById = async (orderId) => {
    const resOrder = await orderService.getById(orderId);
    if (resOrder && resOrder?.data) {
      setOrder(resOrder?.data);
    }
  };

  // const handleCardClick = (quotationId) => {
  //   setSelectedQuotation(data.find((q) => q._id === quotationId));
  //   setVisible(true);
  // };

  const handleCardClick = (quoteId) => {
    const quote = listQuotes.find((item) => item._id === quoteId); // Find the selected quote
    navigate(`/quote/detail/${quoteId}`)
    setSelectedQuotation(quote); // Set selected quote
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedQuotation(null);
  };

  useEffect(() => {
    getById(orderId);
    getListQuotes(orderId);
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => navigate("/orders")}>
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
            <Button onClick={() => navigate("/orders")}>
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

export default DetailOrder;

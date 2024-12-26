import React, { useState } from "react";
import { Card, Modal, Row, Col, Descriptions } from "antd";

const data = {
  customer: {
    name: "annk2",
    phone: "12312123",
    email: "a@gmail.com",
    zalo: "123123123",
  },
  orderId: "BGIBKA-00292990-990XE",
  departing: "Bắc Giang",
  arriving: "Bắc Kạn",
  vehicles: [
    {
      vehicleName: "Xe du lịch 45",
      quantity: 1,
      seats: 45,
    },
    {
      vehicleName: "Xe du lịch 29",
      quantity: 1,
      seats: 29,
    },
  ],
  meals: [
    {
      date: "27/12/2024",
      sessions: [
        { session: "Sáng", portionCount: 40 },
        { session: "Trưa", portionCount: 48 },
        { session: "Tối", portionCount: 48 },
      ],
    },
    {
      date: "28/12/2024",
      sessions: [
        { session: "Sáng", portionCount: 48 },
        { session: "Trưa", portionCount: 48 },
      ],
    },
  ],
  service: [
    { services: "HDV và điều hành", prices: 600000, unit: "Người" },
    { services: "Nước", prices: 5000, unit: "Chai", quantity: 48 },
  ],
};

const DetailQuotes = () => {
  const [visible, setVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const quotations = [
    { id: 1, title: "Báo giá 1" },
    { id: 2, title: "Báo giá 2" },
    { id: 3, title: "Báo giá 3" },
  ];

  const handleCardClick = (quotationId) => {
    setSelectedQuotation(quotations.find((q) => q.id === quotationId));
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedQuotation(null);
  };

  return (
    <>
      <Row gutter={16}>
        {quotations.map((quote) => (
          <Col span={8} key={quote.id}>
            <Card
              title={quote.title}
              hoverable
              onClick={() => handleCardClick(quote.id)}
            >
              <p>Khách hàng: {data.customer.name}</p>
              <p>Điểm đi: {data.departing}</p>
              <p>Điểm đến: {data.arriving}</p>
            </Card>
          </Col>
        ))}
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
              {data.customer.name}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {data.customer.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{data.customer.email}</Descriptions.Item>
            <Descriptions.Item label="Zalo">{data.customer.zalo}</Descriptions.Item>
            <Descriptions.Item label="Điểm đi">{data.departing}</Descriptions.Item>
            <Descriptions.Item label="Điểm đến">{data.arriving}</Descriptions.Item>
            <Descriptions.Item label="Phương tiện">
              {data.vehicles.map((v) => (
                <p key={v.vehicleName}>
                  {v.vehicleName} - Số lượng: {v.quantity} - Ghế: {v.seats}
                </p>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Bữa ăn">
              {data.meals.map((meal) => (
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
              {data.service.map((service) => (
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

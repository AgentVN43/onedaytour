import { Card, Col, Divider, Row, Table, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

const TourQuotation = () => {
  const { Text, Title } = Typography;
  const order = JSON.parse(localStorage.getItem("orderInfo"));
  const details = JSON.parse(localStorage.getItem("tourInfo"));
  const totalServiceCost = details.service?.reduce(
    (total, service) => total + service.prices * (service.quantity || 1),
    0
  );

  const accomCost = details.accommodation?.provisional;
  const vehicleCost = details.vehicles?.reduce(
    (total, vehicle) => total + vehicle.prices,
    0
  );
  // Calculate total meal cost
  const totalMealCost = details.meals.reduce((total, meal) => {
    return (
      total +
      meal.sessions.reduce(
        (sessionTotal, session) =>
          sessionTotal +
          parseInt(session.pricePerPortion || 0) * session.portionCount,
        0
      )
    );
  }, 0);

  // Table columns for services
  const serviceColumns = [
    {
      title: "Dịch vụ",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Đơn giá",
      dataIndex: "prices",
      key: "prices",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => quantity || 1,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) =>
        `${(record.prices * (record.quantity || 1)).toLocaleString()} VND`,
    },
  ];


  const getRowSpanForDate = (value, index, mealData) => {
    const previousDate = index > 0 ? mealData[index - 1]?.date : null;
    const currentDate = mealData[index]?.date;

    if (currentDate === previousDate) {
      return { props: { rowSpan: 0 } }; // Ẩn các hàng trùng
    }

    const rowSpan = mealData.filter((item) => item.date === currentDate).length;
    return { children: value, props: { rowSpan } }; // Gộp các hàng trùng ngày
  };

  // Table columns for meals
  const mealColumns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (value, row, index) => {
        const { children, props } = getRowSpanForDate(value, index, mealData);
        return <div {...props}>{children}</div>;
      },
    },
    {
      title: "Buổi",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Số phần",
      dataIndex: "portionCount",
      key: "portionCount",
    },
    {
      title: "Loại combo",
      dataIndex: "pricePerPortion",
      key: "pricePerPortion",
      render: (price) => `${price || 0} VND`,
    },
  ];

  // Flatten meal data for display
  const mealData = details.meals.flatMap((meal) =>
    meal.sessions.map((session) => ({
      date: meal.date,
      session: session.session,
      portionCount: session.portionCount,
      pricePerPortion: session.pricePerPortion,
    }))
  );

  // Table columns for vehicles
  const vehicleColumns = [
    {
      title: "Loại xe",
      dataIndex: "vehicleName",
      key: "vehicleName",
    },
    {
      title: "Số ghế",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng xe",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, record) => `${(record.price * record.quantity).toLocaleString()} VND`,
    },
  ];
  const accommodationColumns = [
    {
      title: "Mã phòng",
      dataIndex: "selectedRoom",
      key: "selectedRoom",
    },
    {
      title: "Giá phòng",
      dataIndex: "prices",
      key: "prices",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Số đêm",
      dataIndex: "nights",
      key: "nights",
    },
    {
      title: "Tổng số phòng",
      dataIndex: "totalRooms",
      key: "totalRooms",
    },
    {
      title: "Số phòng 1 người",
      dataIndex: "onePersonRooms",
      key: "onePersonRooms",
    },
    {
      title: "Số phòng 2 người",
      dataIndex: "twoPersonRooms",
      key: "twoPersonRooms",
    },
    {
      title: "Số phòng 3 người",
      dataIndex: "threePersonRooms",
      key: "threePersonRooms",
    },
    {
      title: "Tạm tính",
      dataIndex: "provisional",
      key: "provisional",
      render: (price) => (
        <Title level={5}>
          {price.toLocaleString()} VND
        </Title>
      ),
    },
  ];
  return (
    <Card title="Báo giá Tour Du Lịch">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>Thông tin khách hàng</Typography.Title>
          <p>
            <strong>Tên:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Điện thoại:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
          <p>
            <strong>Zalo:</strong> {order.customer.zalo}
          </p>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Thông tin đặt tour</Typography.Title>
          <p>
            <strong>Mã đơn hàng:</strong> {order.orderId}
          </p>
          <p>
            <strong>Điểm đi:</strong> {order.departing}
          </p>
          <p>
            <strong>Điểm đến:</strong> {order.arriving}
          </p>
          <p>
            <strong>Trạng thái:</strong> {order.orderStatus}
          </p>
          <p>
            <strong>Ngày đi:</strong> {dayjs(details.date[0]).format("YYYY-MM-DD")}
          </p>
          <p>
            <strong>Ngày về:</strong> {dayjs(details.date[1]).format("YYYY-MM-DD")}
          </p>
          <p>
            <strong>Người lớn:</strong> {details.passengers.adults}
          </p>
          <p>
            <strong>Trẻ em:</strong> {details.passengers.childrenUnder11}
          </p>
          <p>
            <strong>Trẻ nhỏ:</strong> {details.passengers.childrenUnder5}
          </p>
        </Col>
      </Row>

      <Divider />

      <Typography.Title level={4}>Chi tiết phương tiện</Typography.Title>
      <Table
        dataSource={details.vehicles}
        columns={vehicleColumns}
        rowKey="vehicleId"
        pagination={false}
      />
      <Divider />

      <Divider />
      <Typography.Title level={4}>Chi tiết lưu trú</Typography.Title>
      <Table
        dataSource={[details.accommodation]}
        columns={accommodationColumns}
        rowKey="selectedRoom"
        pagination={false}
      />

      <Typography.Title level={4}>Chi tiết dịch vụ</Typography.Title>
      <Table
        dataSource={details.service}
        columns={serviceColumns}
        rowKey="_id"
        pagination={false}
      />
      <Divider />

      <Typography.Title level={4}>Chi tiết bữa ăn</Typography.Title>
      <Table
        dataSource={mealData}
        columns={mealColumns}
        rowKey={(record) => `${record.date}-${record.session}`}
        pagination={false}
      />

      <Typography.Title level={4}>Tổng cộng</Typography.Title>
      <Row>
        <Col span={12}>
          <strong>Tổng chi phí dịch vụ:</strong>
        </Col>
        <Col span={12}>{totalServiceCost.toLocaleString()} VND</Col>
      </Row>
      <Row>
        <Col span={12}>

          <strong>Tổng chi phí bữa ăn:</strong>
        </Col>
        <Col span={12}>{totalMealCost.toLocaleString()} VND</Col>
      </Row>
      <Row>
        <Col span={12}>
          <strong>Tổng chi phí lưu trú:</strong>
        </Col>
        <Col span={12}>{accomCost.toLocaleString()} VND</Col>
      </Row>
      <Row>
        <Col span={12}>
          <strong>Tổng chi phí xe:</strong>
        </Col>
        <Col span={12}>{vehicleCost.toLocaleString()} VND</Col>
      </Row>
      <Row>
        <Col span={12}>
          <strong>Tổng chi phí toàn bộ:</strong>
        </Col>
        <Col span={12}>
          {(
            totalServiceCost +
            totalMealCost +
            accomCost +
            vehicleCost
          ).toLocaleString()} VND
        </Col>
      </Row>
    </Card>
  );
};

export default TourQuotation;

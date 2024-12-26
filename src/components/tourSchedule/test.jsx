import React from "react";
import { Card, Table, Typography, Divider, Row, Col } from "antd";

const TourQuotation = () => {

    const order = JSON.parse(localStorage.getItem("orderInfo"));
    const details = JSON.parse(localStorage.getItem("tourInfo"));
    const totalServiceCost = details.service.reduce(
        (total, service) => total + service.prices * (service.quantity || 1),
        0
    );

    // Calculate total meal cost
    const totalMealCost = details.meals.reduce((total, meal) => {
        return (
            total +
            meal.sessions.reduce(
                (sessionTotal, session) => sessionTotal + parseInt(session.pricePerPortion || 0) * session.portionCount,
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
        const previousDate = index > 0 ? mealData[index - 1].date : null;
        if (previousDate === value) return null;
        return {
            children: value,
            props: {
                rowSpan: mealData.filter(item => item.date === value).length,
            },
        };
    };
    

    // Table columns for meals
    const mealColumns = [
        {
            title: "Ngày",
            dataIndex: "date",
            key: "date",
            render: (value, row, index) => getRowSpanForDate(value, index, mealData),
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
            title: "Số lượng xe",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Tổng số ghế",
            dataIndex: "totalSeats",
            key: "totalSeats",
        },
    ];

    return (
        <Card title="Báo giá Tour Du Lịch">
            <Typography.Title level={4}>Thông tin khách hàng</Typography.Title>
            <p><strong>Tên:</strong> {order.customer.name}</p>
            <p><strong>Điện thoại:</strong> {order.customer.phone}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Zalo:</strong> {order.customer.zalo}</p>

            <Divider />

            <Typography.Title level={4}>Thông tin đặt tour</Typography.Title>
            <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
            <p><strong>Điểm đi:</strong> {order.departing}</p>
            <p><strong>Điểm đến:</strong> {order.arriving}</p>
            <p><strong>Trạng thái:</strong> {order.orderStatus}</p>

            <Divider />

            <Typography.Title level={4}>Chi tiết phương tiện</Typography.Title>
            <Table
                dataSource={details.vehicles}
                columns={vehicleColumns}
                rowKey="vehicleId"
                pagination={false}
            />

            <Divider />

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

            <Divider />

            <Typography.Title level={4}>Tổng cộng</Typography.Title>
            <Row>
                <Col span={12}><strong>Tổng chi phí dịch vụ:</strong></Col>
                <Col span={12}>{totalServiceCost.toLocaleString()} VND</Col>
            </Row>
            <Row>
                <Col span={12}><strong>Tổng chi phí bữa ăn:</strong></Col>
                <Col span={12}>{totalMealCost.toLocaleString()} VND</Col>
            </Row>
            <Row>
                <Col span={12}><strong>Tổng chi phí toàn bộ:</strong></Col>
                <Col span={12}>{(totalServiceCost + totalMealCost).toLocaleString()} VND</Col>
            </Row>
        </Card>
    );
};

export default TourQuotation;

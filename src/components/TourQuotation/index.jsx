import { CalendarOutlined, CarOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Row, Table, Tag, Typography } from "antd";
import React from "react";
import Quotation from "./quotation";

const { Title, Text } = Typography;

const TourQuotation = () => {
  // Sample data
  const tourData = {
    tourId: "BTRVTB-45214777-101124XE",
    customerName: "Annk",
    departure: "Bến Tre",
    destination: "Bà Rịa – Vũng Tàu",
    departureDate: "2024-11-10",
    returnDate: "2024-11-12",
    passengers: 8,
    status: "NEW",
    meals: [
      {
        key: 0,
        date: "10/11/2024",
        sessions: [
          {
            key: "0-0",
            session: "Sáng",
            restaurant: "A",
            portionCount: 8,
            pricePerPortion: 130000,
          },
          {
            key: "0-1",
            session: "Trưa",
            restaurant: "B",
            portionCount: 8,
            pricePerPortion: 150000,
          },
          {
            key: "0-2",
            session: "Tối",
            restaurant: "C",
            portionCount: 8,
            pricePerPortion: 250000,
          },
        ],
      },
      // ... other meals data
    ],
    hotels: [
      {
        nights: 2,
        roomType: "2 people/room",
        roomCount: 4,
        checkin: "2024-11-10",
        checkout: "2024-11-12",
        totalPassengers: 8,
      },
    ],
    vehicles: [
      {
        vehicleId: "671a14dc5297e006bc7fe21f",
        vehicleName: "Xe du lịch 16",
        quantity: 1,
        seats: 16,
        totalSeats: 16,
        type: {
          type: "Xe du lịch",
          code: "XE",
        },
      },
    ],
  };

  // Calculate total meal cost
  const calculateMealCosts = () => {
    return tourData.meals.reduce((total, day) => {
      const dayTotal = day.sessions.reduce((sessionTotal, session) => {
        return sessionTotal + session.pricePerPortion * session.portionCount;
      }, 0);
      return total + dayTotal;
    }, 0);
  };

  // Prepare meals data for table
  const mealColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Restaurant",
      dataIndex: "restaurant",
      key: "restaurant",
    },
    {
      title: "Portions",
      dataIndex: "portionCount",
      key: "portionCount",
    },
    {
      title: "Price/Portion",
      dataIndex: "pricePerPortion",
      key: "pricePerPortion",
      render: (value) => `${value.toLocaleString()} VND`,
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) =>
        `${(
          record.pricePerPortion * record.portionCount
        ).toLocaleString()} VND`,
    },
  ];

  const mealData = tourData.meals.flatMap((day) =>
    day.sessions.map((session) => ({
      key: session.key,
      date: day.date,
      ...session,
    }))
  );

  return (
    // <div className="p-6">
    //   <Card>
    //     <Title level={2}>Tour Quotation</Title>
    //     <Tag color={tourData.status === "NEW" ? "blue" : "green"}>
    //       {tourData.status}
    //     </Tag>

    //     <Row gutter={[24, 24]} className="mt-6">
    //       <Col span={24}>
    //         <Descriptions bordered>
    //           <Descriptions.Item label="Tour ID">
    //             {tourData.tourId}
    //           </Descriptions.Item>
    //           <Descriptions.Item label="Customer Name">
    //             {tourData.customerName}
    //           </Descriptions.Item>
    //           <Descriptions.Item label="Passengers">
    //             <UserOutlined /> {tourData.passengers} people
    //           </Descriptions.Item>
    //           <Descriptions.Item label="Departure">
    //             {tourData.departure}
    //           </Descriptions.Item>
    //           <Descriptions.Item label="Destination">
    //             {tourData.destination}
    //           </Descriptions.Item>
    //           <Descriptions.Item label="Duration">
    //             <CalendarOutlined /> {tourData.departureDate} -{" "}
    //             {tourData.returnDate}
    //           </Descriptions.Item>
    //         </Descriptions>
    //       </Col>

    //       <Col span={24}>
    //         <Card title="Transportation" className="mt-4">
    //           {tourData.vehicles.map((vehicle) => (
    //             <div key={vehicle.vehicleId}>
    //               <CarOutlined /> {vehicle.vehicleName} - {vehicle.seats} seats
    //             </div>
    //           ))}
    //         </Card>
    //       </Col>

    //       <Col span={24}>
    //         <Card title="Accommodation" className="mt-4">
    //           {tourData.hotels.map((hotel, index) => (
    //             <Descriptions key={index} bordered size="small">
    //               <Descriptions.Item label="Room Type">
    //                 {hotel.roomType}
    //               </Descriptions.Item>
    //               <Descriptions.Item label="Rooms">
    //                 {hotel.roomCount}
    //               </Descriptions.Item>
    //               <Descriptions.Item label="Nights">
    //                 {hotel.nights}
    //               </Descriptions.Item>
    //               <Descriptions.Item label="Check-in">
    //                 {hotel.checkin}
    //               </Descriptions.Item>
    //               <Descriptions.Item label="Check-out">
    //                 {hotel.checkout}
    //               </Descriptions.Item>
    //             </Descriptions>
    //           ))}
    //         </Card>
    //       </Col>

    //       <Col span={24}>
    //         <Card title="Meals" className="mt-4">
    //           <Table
    //             columns={mealColumns}
    //             dataSource={mealData}
    //             pagination={false}
    //             summary={() => (
    //               <Table.Summary fixed>
    //                 <Table.Summary.Row>
    //                   <Table.Summary.Cell index={0} colSpan={5}>
    //                     <Text strong>Total Meal Cost</Text>
    //                   </Table.Summary.Cell>
    //                   <Table.Summary.Cell index={1}>
    //                     <Text strong>
    //                       {calculateMealCosts().toLocaleString()} VND
    //                     </Text>
    //                   </Table.Summary.Cell>
    //                 </Table.Summary.Row>
    //               </Table.Summary>
    //             )}
    //           />
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Card>
    // </div>
    <>
    <Quotation/>
    </>
  );
};

export default TourQuotation;

import React from "react";
import {
  Card,
  Table,
  Typography,
  Row,
  Col,
  Descriptions,
  Tag,
  Divider,
  List,
} from "antd";
import { CalendarOutlined, UserOutlined, CarOutlined } from "@ant-design/icons";

import './TourSchedule.css'

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
            pricePerPortion: 0,
          },
          {
            key: "0-1",
            session: "Trưa",
            restaurant: "B",
            portionCount: 8,
            pricePerPortion: 0,
          },
          {
            key: "0-2",
            session: "Tối",
            restaurant: "C",
            portionCount: 8,
            pricePerPortion: 0,
          },
        ],
      },
      {
        key: 1,
        date: "11/11/2024",
        sessions: [
          {
            key: "1-0",
            session: "Sáng",
            restaurant: "X",
            portionCount: 8,
            pricePerPortion: 0,
          },
          {
            key: "1-1",
            session: "Trưa",
            restaurant: "YZ",
            portionCount: 8,
            pricePerPortion: 0,
          },
          {
            key: "1-2",
            session: "Tối",
            restaurant: "Z",
            portionCount: 8,
            pricePerPortion: 0,
          },
        ],
      },
      {
        key: 2,
        date: "12/11/2024",
        sessions: [
          {
            key: "2-0",
            session: "Sáng",
            restaurant: "A",
            portionCount: 8,
            pricePerPortion: 0,
          },
        ],
      },
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
    // <div className="w-full">
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
      {/* <Card title={`Tour ID: ${tourData.tourId}`} bordered={false}>
        <Descriptions column={1} layout="vertical">
          <Descriptions.Item label="Customer Name">
            {tourData.customerName}
          </Descriptions.Item>
          <Descriptions.Item label="Departure">
            {tourData.departure}
          </Descriptions.Item>
          <Descriptions.Item label="Destination">
            {tourData.destination}
          </Descriptions.Item>
          <Descriptions.Item label="Departure Date">
            {tourData.departureDate}
          </Descriptions.Item>
          <Descriptions.Item label="Return Date">
            {tourData.returnDate}
          </Descriptions.Item>
          <Descriptions.Item label="Passengers">
            {tourData.passengers}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {tourData.status}
          </Descriptions.Item>
        </Descriptions>

        <Divider>Meals</Divider>
        <List
          dataSource={tourData.meals}
          renderItem={(meal) => (
            <Card title={`Date: ${meal.date}`} bordered={false} size="small">
              {meal.sessions.map((session) => (
                <Descriptions
                  key={session.key}
                  column={1}
                  layout="vertical"
                  size="small"
                >
                  <Descriptions.Item label="Session">
                    {session.session}
                  </Descriptions.Item>
                  <Descriptions.Item label="Restaurant">
                    {session.restaurant}
                  </Descriptions.Item>
                  <Descriptions.Item label="Portion Count">
                    {session.portionCount}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price per Portion">
                    {session.pricePerPortion}
                  </Descriptions.Item>
                </Descriptions>
              ))}
            </Card>
          )}
        />

        <Divider>Hotels</Divider>
        <List
          dataSource={tourData.hotels}
          renderItem={(hotel) => (
            <Descriptions column={1} layout="vertical" size="small" bordered>
              <Descriptions.Item label="Nights">
                {hotel.nights}
              </Descriptions.Item>
              <Descriptions.Item label="Room Type">
                {hotel.roomType}
              </Descriptions.Item>
              <Descriptions.Item label="Room Count">
                {hotel.roomCount}
              </Descriptions.Item>
              <Descriptions.Item label="Check-in">
                {hotel.checkin}
              </Descriptions.Item>
              <Descriptions.Item label="Check-out">
                {hotel.checkout}
              </Descriptions.Item>
              <Descriptions.Item label="Total Passengers">
                {hotel.totalPassengers}
              </Descriptions.Item>
            </Descriptions>
          )}
        />

        <Divider>Vehicles</Divider>
        <List
          dataSource={tourData.vehicles}
          renderItem={(vehicle) => (
            <Descriptions column={1} layout="vertical" size="small" bordered>
              <Descriptions.Item label="Vehicle Name">
                {vehicle.vehicleName}
              </Descriptions.Item>
              <Descriptions.Item label="Quantity">
                {vehicle.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Seats">
                {vehicle.seats}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {vehicle.type.type}
              </Descriptions.Item>
              <Descriptions.Item label="Type Code">
                {vehicle.type.code}
              </Descriptions.Item>
            </Descriptions>
          )}
        />
      </Card> */}
      <Card className="order h-[100vh] modal-body overflow-y-auto" title={`Tour ID: ${tourData.tourId}`} bordered={false}>
        {/* Displaying Tour Details */}
        <Descriptions layout="horizontal" column={1}>
          <Descriptions.Item label="Customer Name">
            {tourData.customerName}
          </Descriptions.Item>
          <Descriptions.Item label="Departure">
            {tourData.departure}
          </Descriptions.Item>
          <Descriptions.Item label="Destination">
            {tourData.destination}
          </Descriptions.Item>
          <Descriptions.Item label="Departure Date">
            {tourData.departureDate}
          </Descriptions.Item>
          <Descriptions.Item label="Return Date">
            {tourData.returnDate}
          </Descriptions.Item>
          <Descriptions.Item label="Passengers">
            {tourData.passengers}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {tourData.status}
          </Descriptions.Item>
        </Descriptions>

        <Divider>Meals</Divider>
        {/* Meals Section */}
        <List
          dataSource={tourData.meals}
          renderItem={(meal) => (
            <Card title={`Date: ${meal.date}`} bordered={false} size="small">
              {meal.sessions.map((session) => (
                <Row gutter={[16, 8]} key={session.key}>
                  <Col span={12}>
                    <Text strong>Session:</Text> {session.session}
                  </Col>
                  <Col span={12}>
                    <Text strong>Restaurant:</Text> {session.restaurant}
                  </Col>
                  <Col span={12}>
                    <Text strong>Portion Count:</Text> {session.portionCount}
                  </Col>
                  <Col span={12}>
                    <Text strong>Price per Portion:</Text>{" "}
                    {session.pricePerPortion}
                  </Col>
                </Row>
              ))}
            </Card>
          )}
        />

        <Divider>Hotels</Divider>
        {/* Hotels Section */}
        <List
          dataSource={tourData.hotels}
          renderItem={(hotel) => (
            <Descriptions layout="horizontal" column={1} size="small" bordered>
              <Descriptions.Item label="Nights">
                {hotel.nights}
              </Descriptions.Item>
              <Descriptions.Item label="Room Type">
                {hotel.roomType}
              </Descriptions.Item>
              <Descriptions.Item label="Room Count">
                {hotel.roomCount}
              </Descriptions.Item>
              <Descriptions.Item label="Check-in">
                {hotel.checkin}
              </Descriptions.Item>
              <Descriptions.Item label="Check-out">
                {hotel.checkout}
              </Descriptions.Item>
              <Descriptions.Item label="Total Passengers">
                {hotel.totalPassengers}
              </Descriptions.Item>
            </Descriptions>
          )}
        />

        <Divider>Vehicles</Divider>
        {/* Vehicles Section */}
        <List
          dataSource={tourData.vehicles}
          renderItem={(vehicle) => (
            <Descriptions layout="horizontal" column={1} size="small" bordered>
              <Descriptions.Item label="Vehicle Name">
                {vehicle.vehicleName}
              </Descriptions.Item>
              <Descriptions.Item label="Quantity">
                {vehicle.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Seats">
                {vehicle.seats}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {vehicle.type.type}
              </Descriptions.Item>
              <Descriptions.Item label="Type Code">
                {vehicle.type.code}
              </Descriptions.Item>
            </Descriptions>
          )}
        />
      </Card>
    </>
  );
};

export default TourQuotation;

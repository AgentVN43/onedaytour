// import React from "react";
// import {
//   Card,
//   Table,
//   Typography,
//   Row,
//   Col,
//   Descriptions,
//   Tag,
//   Divider,
//   List,
// } from "antd";
// import { CalendarOutlined, UserOutlined, CarOutlined } from "@ant-design/icons";

// import './TourSchedule.css'
// import dayjs from "dayjs";

// const { Title, Text } = Typography;

// const TourQuotation = () => {
//   // Sample data
//   const tourData = {
//     tourId: "BTRVTB-45214777-101124XE",
//     customerName: "Annk",
//     departure: "Bến Tre",
//     destination: "Bà Rịa – Vũng Tàu",
//     departureDate: "2024-11-10",
//     returnDate: "2024-11-12",
//     passengers: 8,
//     status: "NEW",
//     meals: [
//       {
//         key: 0,
//         date: "10/11/2024",
//         sessions: [
//           {
//             key: "0-0",
//             session: "Sáng",
//             restaurant: "A",
//             portionCount: 8,
//             pricePerPortion: 0,
//           },
//           {
//             key: "0-1",
//             session: "Trưa",
//             restaurant: "B",
//             portionCount: 8,
//             pricePerPortion: 0,
//           },
//           {
//             key: "0-2",
//             session: "Tối",
//             restaurant: "C",
//             portionCount: 8,
//             pricePerPortion: 0,
//           },
//         ],
//       },
//       {
//         key: 1,
//         date: "11/11/2024",
//         sessions: [
//           {
//             key: "1-0",
//             session: "Sáng",
//             restaurant: "X",
//             portionCount: 8,
//             pricePerPortion: 0,
//           },
//           {
//             key: "1-1",
//             session: "Trưa",
//             restaurant: "YZ",
//             portionCount: 8,
//             pricePerPortion: 0,
//           },
//           {
//             key: "1-2",
//             session: "Tối",
//             restaurant: "Z",
//             portionCount: 8,
//             pricePerPortion: 0,
//           },
//         ],
//       },
//       {
//         key: 2,
//         date: "12/11/2024",
//         sessions: [
//           {
//             key: "2-0",
//             session: "Sáng",
//             restaurant: "A",
//             portionCount: 8,
//             pricePerPortion: 0,
//           },
//         ],
//       },
//     ],
//     hotels: [
//       {
//         nights: 2,
//         roomType: "2 people/room",
//         roomCount: 4,
//         checkin: "2024-11-10",
//         checkout: "2024-11-12",
//         totalPassengers: 8,
//       },
//     ],
//     vehicles: [
//       {
//         vehicleId: "671a14dc5297e006bc7fe21f",
//         vehicleName: "Xe du lịch 16",
//         quantity: 1,
//         seats: 16,
//         totalSeats: 16,
//         type: {
//           type: "Xe du lịch",
//           code: "XE",
//         },
//       },
//     ],
//   };

//   const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
//   const tourInfo = JSON.parse(localStorage.getItem("tourInfo"));
//   // Calculate total meal cost
//   const calculateMealCosts = () => {
//     return tourData.meals.reduce((total, day) => {
//       const dayTotal = day.sessions.reduce((sessionTotal, session) => {
//         return sessionTotal + session.pricePerPortion * session.portionCount;
//       }, 0);
//       return total + dayTotal;
//     }, 0);
//   };

//   // Prepare meals data for table
//   const mealColumns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Session",
//       dataIndex: "session",
//       key: "session",
//     },
//     {
//       title: "Restaurant",
//       dataIndex: "restaurant",
//       key: "restaurant",
//     },
//     {
//       title: "Portions",
//       dataIndex: "portionCount",
//       key: "portionCount",
//     },
//     {
//       title: "Price/Portion",
//       dataIndex: "pricePerPortion",
//       key: "pricePerPortion",
//       render: (value) => `${value.toLocaleString()} VND`,
//     },
//     {
//       title: "Total",
//       key: "total",
//       render: (_, record) =>
//         `${(
//           record.pricePerPortion * record.portionCount
//         ).toLocaleString()} VND`,
//     },
//   ];

//   const mealData = tourData.meals.flatMap((day) =>
//     day.sessions.map((session) => ({
//       key: session.key,
//       date: day.date,
//       ...session,
//     }))
//   );

//   return (
//     <>
//       <Card className="order h-[100vh] modal-body overflow-y-auto" title={`Tour ID: ${orderInfo.orderId}`} bordered={false}>
//         {/* Displaying Tour Details */}
//         <Descriptions layout="horizontal" column={1}>
//           <Descriptions.Item label="Tên khách hàng">
//             {orderInfo.customer.name}
//           </Descriptions.Item>
//           <Descriptions.Item label="Điểm khởi hành">
//             {orderInfo.departing}
//           </Descriptions.Item>
//           <Descriptions.Item label="Điểm đến">
//             {orderInfo.arriving}
//           </Descriptions.Item>
//           <Descriptions.Item label="Ngày đi">
//             {dayjs(tourInfo.date[0]).format('YYYY-MM-DD')}
//           </Descriptions.Item>
//           <Descriptions.Item label="Ngày về">
//             {dayjs(tourInfo.date[1]).format('YYYY-MM-DD')}
//           </Descriptions.Item>
//           <Descriptions.Item label="Passengers">
//             {tourInfo.passengers}
//           </Descriptions.Item>
//         </Descriptions>
//         <Divider>Di chuyển</Divider>
//         {/* Vehicles Section */}
//         <List
//           dataSource={tourData.vehicles}
//           renderItem={(vehicle) => (
//             <Descriptions layout="horizontal" column={1} size="small" bordered>
//               <Descriptions.Item label="Vehicle Name">
//                 {vehicle.vehicleName}
//               </Descriptions.Item>
//               <Descriptions.Item label="Quantity">
//                 {vehicle.quantity}
//               </Descriptions.Item>
//               <Descriptions.Item label="Seats">
//                 {vehicle.seats}
//               </Descriptions.Item>
//               <Descriptions.Item label="Type">
//                 {vehicle.type.type}
//               </Descriptions.Item>
//               <Descriptions.Item label="Type Code">
//                 {vehicle.type.code}
//               </Descriptions.Item>
//             </Descriptions>
//           )}
//         />

// <Divider>Lưu trú</Divider>
//         {/* Hotels Section */}
//         <List
//           dataSource={tourData.hotels}
//           renderItem={(hotel) => (
//             <Descriptions layout="horizontal" column={1} size="small" bordered>
//               <Descriptions.Item label="Nights">
//                 {hotel.nights}
//               </Descriptions.Item>
//               <Descriptions.Item label="Room Type">
//                 {hotel.roomType}
//               </Descriptions.Item>
//               <Descriptions.Item label="Room Count">
//                 {hotel.roomCount}
//               </Descriptions.Item>
//               <Descriptions.Item label="Check-in">
//                 {hotel.checkin}
//               </Descriptions.Item>
//               <Descriptions.Item label="Check-out">
//                 {hotel.checkout}
//               </Descriptions.Item>
//               <Descriptions.Item label="Total Passengers">
//                 {hotel.totalPassengers}
//               </Descriptions.Item>
//             </Descriptions>
//           )}
//         />
        
//         <Divider>Ăn uống</Divider>
//         {/* Meals Section */}
//         <List
//           dataSource={tourData.meals}
//           renderItem={(meal) => (
//             <Card title={`Date: ${meal.date}`} bordered={false} size="small">
//               {meal.sessions.map((session) => (
//                 <Row gutter={[16, 8]} key={session.key}>
//                   <Col span={12}>
//                     <Text strong>Session:</Text> {session.session}
//                   </Col>
//                   <Col span={12}>
//                     <Text strong>Restaurant:</Text> {session.restaurant}
//                   </Col>
//                   <Col span={12}>
//                     <Text strong>Portion Count:</Text> {session.portionCount}
//                   </Col>
//                   <Col span={12}>
//                     <Text strong>Price per Portion:</Text>{" "}
//                     {session.pricePerPortion}
//                   </Col>
//                 </Row>
//               ))}
//             </Card>
//           )}
//         />

        


//       </Card>
//     </>
//   );
// };

// export default TourQuotation;

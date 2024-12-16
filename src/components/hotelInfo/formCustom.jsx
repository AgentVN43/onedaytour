import {
  Alert,
  Button,
  Card,
  Form,
  InputNumber,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useState } from "react";
const { Title, Text } = Typography;
const { Option } = Select;

const FormCustom = ({ infoTraveler, setInfoTraveler }) => {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);

  const ROOM_TYPES = [
    { id: 1, name: "Single Room", capacity: 1 },
    { id: 2, name: "Double Room", capacity: 2 },
    { id: 3, name: "Triple Room", capacity: 3 },
  ];

  // const findOptimalRooms = (values) => {
  //   const { totalGuests, selectedRoomType, selectedRoomCount } = values;

  //   if (!totalGuests || !selectedRoomType || !selectedRoomCount) {
  //     return { error: "Please fill in all fields" };
  //   }

  //   // Find the selected room type
  //   const primaryRoom = ROOM_TYPES.find((room) => room.id === selectedRoomType);

  //   // Calculate remaining guests after primary room allocation
  //   const guestsInPrimaryRooms = primaryRoom.capacity * selectedRoomCount;

  //   if (guestsInPrimaryRooms > totalGuests) {
  //     return { error: "Selected rooms exceed total guests" };
  //   }

  //   const remainingGuests = totalGuests - guestsInPrimaryRooms;

  //   // If no remaining guests, return only primary room allocation
  //   if (remainingGuests === 0) {
  //     return {
  //       totalGuests,
  //       distribution: [
  //         {
  //           ...primaryRoom,
  //           count: selectedRoomCount,
  //           totalCapacity: guestsInPrimaryRooms,
  //         },
  //       ],
  //       totalRooms: selectedRoomCount,
  //       totalCapacity: guestsInPrimaryRooms,
  //     };
  //   }

  //   // Get remaining room types for optimization
  //   const remainingRoomTypes = ROOM_TYPES.filter(
  //     (room) => room.id !== selectedRoomType
  //   ).sort((a, b) => b.capacity - a.capacity); // Sort by capacity descending

  //   let distribution = [
  //     {
  //       ...primaryRoom,
  //       count: selectedRoomCount,
  //       totalCapacity: guestsInPrimaryRooms,
  //     },
  //   ];

  //   let guests = remainingGuests;

  //   // Optimize remaining guests allocation
  //   for (const roomType of remainingRoomTypes) {
  //     const roomCount = Math.floor(guests / roomType.capacity);
  //     if (roomCount > 0) {
  //       const allocatedGuests = roomCount * roomType.capacity;
  //       distribution.push({
  //         ...roomType,
  //         count: roomCount,
  //         totalCapacity: allocatedGuests,
  //       });
  //       guests -= allocatedGuests;
  //     }
  //   }

  //   // Handle any remaining guests with smallest room type
  //   if (guests > 0) {
  //     const smallestRoom = remainingRoomTypes[remainingRoomTypes.length - 1];
  //     const extraRooms = Math.ceil(guests / smallestRoom.capacity);
  //     const existingRoom = distribution.find(
  //       (room) => room.id === smallestRoom.id
  //     );

  //     if (existingRoom) {
  //       existingRoom.count += extraRooms;
  //       existingRoom.totalCapacity += guests;
  //     } else {
  //       distribution.push({
  //         ...smallestRoom,
  //         count: extraRooms,
  //         totalCapacity: guests,
  //       });
  //     }
  //   }

  //   // Calculate totals
  //   const totalRooms = distribution.reduce((sum, room) => sum + room.count, 0);
  //   const totalCapacity = distribution.reduce(
  //     (sum, room) => sum + room.totalCapacity,
  //     0
  //   );

  //   return {
  //     totalGuests,
  //     distribution,
  //     totalRooms,
  //     totalCapacity,
  //   };
  // };

  const findOptimalRooms = (values) => {
    const { totalGuests, rooms } = values;

    if (!totalGuests) {
      return { error: "Please enter total guests" };
    }

    // Calculate total allocated guests from selected rooms
    let allocatedGuests = 0;
    let distribution = [];

    // Process selected rooms
    for (const roomType of ROOM_TYPES) {
      const roomCount = rooms[`type${roomType.id}`] || 0;
      if (roomCount > 0) {
        const guestsInRooms = roomType.capacity * roomCount;
        allocatedGuests += guestsInRooms;
        distribution.push({
          ...roomType,
          count: roomCount,
          totalCapacity: guestsInRooms,
        });
      }
    }

    let remainingGuests = totalGuests - allocatedGuests;

    // Validate if selected rooms don't exceed total guests
    if (allocatedGuests > totalGuests) {
      return { error: "Selected rooms exceed total guests capacity" };
    }

    // If there are remaining guests, allocate them optimally
    if (remainingGuests > 0) {
      // Get room types that weren't fully allocated
      const selectedRoomIds = distribution.map((room) => room.id);
      const availableRoomTypes = ROOM_TYPES.filter(
        (room) => !selectedRoomIds.includes(room.id)
      ).sort((a, b) => b.capacity - a.capacity);

      // First try to fill with largest available room type
      for (const roomType of availableRoomTypes) {
        const roomCount = Math.floor(remainingGuests / roomType.capacity);
        if (roomCount > 0) {
          const allocatedGuests = roomCount * roomType.capacity;
          distribution.push({
            ...roomType,
            count: roomCount,
            totalCapacity: allocatedGuests,
          });
          remainingGuests -= allocatedGuests;
        }
      }

      // If there are still remaining guests, use the smallest available room
      if (remainingGuests > 0) {
        const smallestRoom = availableRoomTypes[availableRoomTypes.length - 1];
        if (smallestRoom) {
          const extraRooms = Math.ceil(remainingGuests / smallestRoom.capacity);
          const existingRoom = distribution.find(
            (room) => room.id === smallestRoom.id
          );

          if (existingRoom) {
            existingRoom.count += extraRooms;
            existingRoom.totalCapacity += remainingGuests;
          } else {
            distribution.push({
              ...smallestRoom,
              count: extraRooms,
              totalCapacity: remainingGuests,
            });
          }
        }
      }
    }

    // Sort distribution by room type ID for consistent display
    distribution.sort((a, b) => a.id - b.id);

    // Calculate totals
    const totalRooms = distribution.reduce((sum, room) => sum + room.count, 0);
    const totalCapacity = distribution.reduce(
      (sum, room) => sum + room.totalCapacity,
      0
    );

    return {
      totalGuests,
      distribution,
      totalRooms,
      totalCapacity,
    };
  };

  const handleCalculate = (values) => {
    const result = findOptimalRooms(values);
    setResult(result);
  };

  // const handleConfirm = () => {
  //   if (result && !result.error) {
  //     console.log("Hotel Room Distribution:", {
  //       totalGuests: result.totalGuests,
  //       totalRooms: result.totalRooms,
  //       totalCapacity: result.totalCapacity,
  //       utilization:
  //         ((result.totalGuests / result.totalCapacity) * 100).toFixed(1) + "%",
  //       distribution: result.distribution,
  //     });
  //   }
  // };

  const handleConfirm = () => {
    const hotelData = {
      totalGuests: result.totalGuests,
      totalRooms: result.totalRooms,
      totalCapacity: result.totalCapacity,
      utilization:
        ((result.totalGuests / result.totalCapacity) * 100).toFixed(1) + "%",
      distribution: result.distribution,
    };

    setInfoTraveler((prevInfo) => ({
      ...prevInfo,
      hotels: [...(prevInfo.hotels || []), hotelData], // Add hotelData to hotels array
    }));
  };

  const columns = [
    {
      title: "Room Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (value) => `${value} person${value > 1 ? "s" : ""}/room`,
    },
    {
      title: "Number of Rooms",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total Capacity",
      dataIndex: "totalCapacity",
      key: "totalCapacity",
      render: (value) => `${value} guests`,
    },
  ];

  return (
    // <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
    //   <Title level={3} style={{ marginBottom: 24 }}>
    //     Hotel Room Optimizer
    //   </Title>

    //   <Form form={form} onFinish={handleCalculate} layout="vertical">
    //     <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
    //       <Form.Item
    //         name="totalGuests"
    //         label="Total Guests"
    //         style={{ flex: 1 }}
    //         rules={[{ required: true, message: "Please enter total guests" }]}
    //       >
    //         <InputNumber
    //           style={{ width: "100%" }}
    //           min={1}
    //           placeholder="Enter total guests"
    //         />
    //       </Form.Item>

    //       <Form.Item
    //         name="selectedRoomType"
    //         label="Primary Room Type"
    //         style={{ flex: 1 }}
    //         rules={[{ required: true, message: "Please select room type" }]}
    //       >
    //         <Select placeholder="Select room type">
    //           {ROOM_TYPES.map((room) => (
    //             <Option key={room.id} value={room.id}>
    //               {room.name} ({room.capacity} person
    //               {room.capacity > 1 ? "s" : ""})
    //             </Option>
    //           ))}
    //         </Select>
    //       </Form.Item>

    //       <Form.Item
    //         name="selectedRoomCount"
    //         label="Number of Rooms"
    //         style={{ flex: 1 }}
    //         rules={[
    //           { required: true, message: "Please enter number of rooms" },
    //         ]}
    //       >
    //         <InputNumber
    //           style={{ width: "100%" }}
    //           min={1}
    //           placeholder="Enter number of rooms"
    //         />
    //       </Form.Item>
    //     </div>

    //     <Form.Item>
    //       <div style={{ display: "flex", gap: 16 }}>
    //         <Button type="primary" htmlType="submit" size="large">
    //           Calculate
    //         </Button>
    //         {result && !result.error && (
    //           <Button type="default" size="large" onClick={handleConfirm}>
    //             Confirm
    //           </Button>
    //         )}
    //       </div>
    //     </Form.Item>
    //   </Form>

    //   {result && !result.error && (
    //     <div style={{ marginTop: 24 }}>
    //       <Card size="small" style={{ marginBottom: 24 }}>
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             flexWrap: "wrap",
    //             gap: 16,
    //           }}
    //         >
    //           <Text strong>Total Guests: {result.totalGuests}</Text>
    //           <Text strong>Total Rooms: {result.totalRooms}</Text>
    //           <Text strong>Total Capacity: {result.totalCapacity}</Text>
    //           <Text strong>
    //             Utilization:{" "}
    //             {((result.totalGuests / result.totalCapacity) * 100).toFixed(1)}
    //             %
    //           </Text>
    //         </div>
    //       </Card>

    //       <Table
    //         dataSource={result.distribution}
    //         columns={columns}
    //         pagination={false}
    //         rowKey="id"
    //       />
    //     </div>
    //   )}

    //   {result?.error && (
    //     <Alert
    //       message="Error"
    //       description={result.error}
    //       type="error"
    //       showIcon
    //     />
    //   )}
    // </Card>
    <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Hotel Room Optimizer
      </Title>

      <Form
        form={form}
        onFinish={handleCalculate}
        layout="vertical"
        initialValues={{
          rooms: {
            type1: 0,
            type2: 0,
            type3: 0,
          },
        }}
      >
        <Form.Item
          name="totalGuests"
          label="Total Guests"
          rules={[{ required: true, message: "Please enter total guests" }]}
          style={{ marginBottom: 24 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder="Enter total guests"
          />
        </Form.Item>

        <Title level={4} style={{ marginBottom: 16 }}>
          Select Room Quantities
        </Title>

        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {ROOM_TYPES.map((room) => (
            <Form.Item
              key={room.id}
              name={["rooms", `type${room.id}`]}
              label={`${room.name} (${room.capacity} person${
                room.capacity > 1 ? "s" : ""
              })`}
              style={{ flex: 1 }}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter number of rooms"
              />
            </Form.Item>
          ))}
        </div>

        <Form.Item>
          <div style={{ display: "flex", gap: 16 }}>
            <Button type="primary" htmlType="submit" size="large">
              Calculate
            </Button>
            {result && !result.error && (
              <Button type="default" size="large" onClick={handleConfirm}>
                Confirm
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>

      {result && !result.error && (
        <div style={{ marginTop: 24 }}>
          <Card size="small" style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <Text strong>Total Guests: {result.totalGuests}</Text>
              <Text strong>Total Rooms: {result.totalRooms}</Text>
              <Text strong>Total Capacity: {result.totalCapacity}</Text>
              <Text strong>
                Utilization:{" "}
                {((result.totalGuests / result.totalCapacity) * 100).toFixed(1)}
                %
              </Text>
            </div>
          </Card>

          <Table
            dataSource={result.distribution}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
        </div>
      )}

      {result?.error && (
        <Alert
          message="Error"
          description={result.error}
          type="error"
          showIcon
        />
      )}
    </Card>
  );
};

export default FormCustom;

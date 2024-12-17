import { Button, Table, Typography } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function FormStandar({
  nights,
  totalPassengers,
  departureDate,
  returnDate,
  infoTraveler,
  setInfoTraveler,
}) {
  const [roomType, setRoomType] = useState("2 people/room");
  const [roomCount, setRoomCount] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateRoomCount = () => {
    const count = Math.ceil(totalPassengers / 2);
    setRoomCount(count);
    return count;
  };

  const columns = [
    {
      title: "Check-in Date",
      dataIndex: "checkin",
      key: "checkin",
      render: (text) => <Typography.Text>{dayjs(departureDate).format('YYYY-MM-DD')}</Typography.Text>,
    },
    {
      title: "Check-out Date",
      dataIndex: "checkout",
      key: "checkout",
      render: (text) => <Typography.Text>{dayjs(returnDate).format('YYYY-MM-DD')}</Typography.Text>,
    },
    {
      title: "Nights",
      dataIndex: "nights",
      key: "nights",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
      render: (text) => <Typography.Text>{"2 people/room"}</Typography.Text>,
    },
    {
      title: "Room Count",
      dataIndex: "roomCount",
      key: "roomCount",
      render: (text) => <Typography.Text>{roomCount}</Typography.Text>,
    },
  ];

  const data = [
    {
      key: "1",
      nights: nights,
      roomType: roomType,
      roomCount: roomCount,
    },
  ];

  useEffect(() => {
    calculateRoomCount();
  }, [calculateRoomCount, nights, roomType]);

  const handleConfirm = () => {
    const hotelData = {
      nights,
      roomType,
      roomCount,
      checkin: departureDate,
      checkout: returnDate,
      totalPassengers,
    };

    setInfoTraveler((prevInfo) => ({
      ...prevInfo,
      hotels: [...(prevInfo.hotels || []), hotelData], // Add hotelData to hotels array
    }));
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="key"
        style={{ marginBottom: 16 }}
      />
      <Button type="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Card, InputNumber, Typography, Row, Col, Alert, message, Button } from "antd";

const RoomAllocation = () => {
  const [totalGuests, setTotalGuests] = useState(0);
  const [roomsWithOnePerson, setRoomsWithOnePerson] = useState(0);
  const [roomsWithThreePeople, setRoomsWithThreePeople] = useState(0);
  const [allocation, setAllocation] = useState({
    onePersonRooms: 0,
    twoPersonRooms: 0,
    threePersonRooms: 0,
    unallocatedGuests: 0,
  });

  // Effect to load data from localStorage on component mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("tourInfo");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Extract passengers from the stored data
        const passengers = parsedData.passengers || 0;

        // Set total guests
        setTotalGuests(passengers);

        // Optional: Show a message about loaded data
        message.info(`Loaded ${passengers} passengers from localStorage`);
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      message.error("Failed to load booking data");
    }
  }, []); // Empty dependency array means this runs once on mount

  // Allocation logic
  useEffect(() => {
    if (totalGuests === 0) {
      setAllocation({
        onePersonRooms: 0,
        twoPersonRooms: 0,
        threePersonRooms: 0,
        unallocatedGuests: 0,
      });
      return;
    }

    // Start with one-person rooms
    let remainingGuests = totalGuests;
    let onePersonRooms = Math.min(roomsWithOnePerson, remainingGuests);
    remainingGuests -= onePersonRooms;

    // Calculate three-person rooms
    let threePersonRooms = Math.min(
      roomsWithThreePeople,
      Math.floor(remainingGuests / 3)
    );
    remainingGuests -= threePersonRooms * 3;

    // Prioritize two-person rooms for remaining guests
    let twoPersonRooms = Math.min(
      Math.ceil(remainingGuests / 2),
      // If no specific room count provided, allocate all to two-person rooms
      roomsWithThreePeople === 0 && roomsWithOnePerson === 0
        ? Math.ceil(totalGuests / 2)
        : Math.ceil(remainingGuests / 2)
    );
    remainingGuests -= twoPersonRooms * 2;

    setAllocation({
      onePersonRooms,
      twoPersonRooms,
      threePersonRooms,
      unallocatedGuests: remainingGuests,
    });
  }, [totalGuests, roomsWithOnePerson, roomsWithThreePeople]);

  // Function to update localStorage

  // Function to save accommodation
  const handleConfirmAccommodation = () => {
    // Check if there are any unallocated guests or over-allocation
    if (allocation.unallocatedGuests !== 0) {
      message.error(
        "Cannot confirm allocation. Please adjust rooms or guests."
      );
      return;
    }

    try {
      // Retrieve existing localStorage data
      const storedData = localStorage.getItem("orderInfo");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Create accommodation object
        const accommodation = {
          onePersonRooms: allocation.onePersonRooms,
          twoPersonRooms: allocation.twoPersonRooms,
          threePersonRooms: allocation.threePersonRooms,
        };

        // Add accommodation to the stored data
        parsedData.accommodation = accommodation;

        // Save updated data back to localStorage
        localStorage.setItem("orderInfo", JSON.stringify(parsedData));

        message.success("Accommodation allocation confirmed and saved");
      } else {
        message.error("No booking data found in localStorage");
      }
    } catch (error) {
      console.error("Error saving accommodation:", error);
      message.error("Failed to save accommodation");
    }
  };

  return (
    <Card
      title="Guest Room Allocation"
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Typography.Text>Tổng khách:</Typography.Text>
          <InputNumber
            min={0}
            value={totalGuests}
            disabled
            onChange={(value) => {
              const newValue = value || 0;
              setTotalGuests(newValue);
            }}
            style={{ width: "100%" }}
            placeholder="Enter total guests"
          />
        </Col>
        <Col span={8}>
          <Typography.Text>1 khách/phòng</Typography.Text>
          <InputNumber
            min={0}
            value={roomsWithOnePerson}
            onChange={(value) => setRoomsWithOnePerson(value || 0)}
            style={{ width: "100%" }}
            placeholder="Number of 1-person rooms"
          />
        </Col>
        <Col span={8}>
          <Typography.Text>3 khách/phòng (extrad bed)</Typography.Text>
          <InputNumber
            min={0}
            value={roomsWithThreePeople}
            onChange={(value) => setRoomsWithThreePeople(value || 0)}
            style={{ width: "100%" }}
            placeholder="Number of 3-person rooms"
          />
        </Col>
      </Row>

      <Typography.Title level={4}>Allocation Result</Typography.Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Typography.Text strong>1-Person Rooms</Typography.Text>
            <div>{allocation.onePersonRooms} rooms</div>
            <div>({allocation.onePersonRooms} guests)</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Typography.Text strong>2-Person Rooms</Typography.Text>
            <div>{allocation.twoPersonRooms} rooms</div>
            <div>({allocation.twoPersonRooms * 2} guests)</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Typography.Text strong>3-Person Rooms</Typography.Text>
            <div>{allocation.threePersonRooms} rooms</div>
            <div>({allocation.threePersonRooms * 3} guests)</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Typography.Text strong>Unallocated</Typography.Text>
            <div>{allocation.unallocatedGuests} guests</div>
          </Card>
        </Col>
      </Row>

      {/* {allocation.unallocatedGuests < 0 && (
        <Alert
          message="Error"
          description="Over-allocation! The number of rooms cannot accommodate all guests."
          type="error"
          style={{ marginTop: 16 }}
        />
      )} */}

      {allocation.unallocatedGuests > 0 && (
        <Alert
          message="Warning"
          description="Some guests could not be allocated to rooms. Please adjust the number of rooms or total guests."
          type="warning"
          style={{ marginTop: 16 }}
        />
      )}

      <Row justify="center" style={{ marginTop: 16 }}>
        <Button
          type="primary"
          onClick={handleConfirmAccommodation}
          disabled={allocation.unallocatedGuests !== 0}
        >
          Confirm Accommodation
        </Button>
      </Row>
    </Card>
  );
};

export default RoomAllocation;

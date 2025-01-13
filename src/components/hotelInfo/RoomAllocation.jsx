import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  InputNumber,
  Typography,
  Row,
  Col,
  Alert,
  message,
  Button,
  Radio,
  Flex,
} from "antd";
import RoomTypeSelector from "./roomTypeSelector";
import moment from "moment";
import { accomService } from "../../services/accomService";

const RoomAllocation = () => {
  const [totalGuests, setTotalGuests] = useState(0);
  const [roomsWithOnePerson, setRoomsWithOnePerson] = useState(0);
  const [roomsWithThreePeople, setRoomsWithThreePeople] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [provisional, setProvisional] = useState(null);
  const [allocation, setAllocation] = useState({
    onePersonRooms: 0,
    twoPersonRooms: 0,
    threePersonRooms: 0,
    unallocatedGuests: 0,
  });
  const [date, setDate] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [accom, setAccom] = useState([]);
  // Effect to load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("tourInfo");

    try {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);
        // Extract passengers from the stored data
        const passengers = parsedData.passengers?.total || 0;
        const date = parsedData.date || 0;
        // Set total guests
        setTotalGuests(passengers);
        setDate(date);
        // Optional: Show a message about loaded data
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
        totalRooms: 0,
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
      totalRooms: onePersonRooms + twoPersonRooms + threePersonRooms,
      unallocatedGuests: remainingGuests,
    });
  }, [totalGuests, roomsWithOnePerson, roomsWithThreePeople]);

  const onChange = (e) => {
    setSelectedPrice(e.target.value); // Update the selected price
    // console.log(`Radio checked: ${e.target.value}`);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAccom = useCallback(async () => {
    try {
      if (!selectedRoom) return; // Ensure `selectedRoom` is valid before fetching
      const res = await accomService.getByType(selectedRoom);
      if (res && res.data) {
        setAccom(res.data);
      } else {
        console.warn("No data received from the API");
      }
    } catch (error) {
      console.error(
        "Error loading accom:",
        error.response?.data || error.message
      );
      alert(
        `Failed to load accom: ${error.response?.data?.message || "Unknown error"
        }`
      );
    }
  }, [selectedRoom]);

  const handleProvisional = useCallback(() => {
    if (allocation?.totalRooms && selectedPrice) {
      const total = (allocation.totalRooms * selectedPrice) * numberOfNights;
      setProvisional(total);
    }
  }, [allocation, selectedPrice]);

  useEffect(() => {
    if (selectedRoom) {
      getAccom(); // Only fetch accommodations if a room type is selected
    }
  }, [getAccom, selectedRoom]); // Dependencies: Only re-run when `selectedRoom` changes

  useEffect(() => {
    handleProvisional();
  }, [handleProvisional]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateNightsAndDays = () => {
    const departureDate = date[0];
    const returnDate = date[1];

    const msInADay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);

    const totalDays = Math.round((returnD - departure) / msInADay) + 1; // Add 1 to include the departure day
    const totalNights = totalDays - 1;
    // const days = `${totalDays}N${totalNights}D`;
    return { totalDays, totalNights };
  };

  useEffect(() => {
    if (date.length) {
      const { totalDays, totalNights } = calculateNightsAndDays(
        new Date(date[0]),
        new Date(date[1])
      );
      setNumberOfDays(totalDays);
      setNumberOfNights(totalNights);
    }
  }, [date]);

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
      const storedData = localStorage.getItem("tourInfo");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Create accommodation object
        const accommodation = {
          selectedRoom: selectedRoom,
          prices: selectedPrice,
          nights: numberOfNights,
          totalRooms: allocation.totalRooms,
          onePersonRooms: allocation.onePersonRooms,
          twoPersonRooms: allocation.twoPersonRooms,
          threePersonRooms: allocation.threePersonRooms,
          provisional: provisional,
        };

        // Add accommodation to the stored data
        parsedData.accommodation = accommodation;

        // Save updated data back to localStorage
        localStorage.setItem("tourInfo", JSON.stringify(parsedData));

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
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Phân bổ phòng khách</span>
          <RoomTypeSelector
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        </div>
      }
      style={{ margin: "0 auto" }}
    >
      <Row gutter={16} style={{ marginBottom: 16, height: 100 }} justify="center" align="middle">
        <Col span={16}>
          <Flex vertical gap="middle" style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Radio.Group onChange={onChange} value={selectedPrice}>
              {accom.map((item, index) => (
                <Radio key={index} value={item.prices}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </Flex>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Typography.Text strong>Check-in: </Typography.Text>
          <Typography.Text>
            {moment(date[0]).format("DD/MM/YYYY")}
          </Typography.Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Typography.Text strong>Check-out: </Typography.Text>
          <Typography.Text>
            {moment(date[1]).format("DD/MM/YYYY")}
          </Typography.Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Typography.Text strong>Số ngày: </Typography.Text>
          <Typography.Text>{numberOfDays} ngày</Typography.Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Typography.Text strong>Số đêm: </Typography.Text>
          <Typography.Text>{numberOfNights} đêm</Typography.Text>
        </Col>
      </Row>

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


      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Typography.Text strong>Phòng 1 người</Typography.Text>
            <div>{allocation.onePersonRooms} phòng</div>
            <div>({allocation.onePersonRooms} khách)</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Typography.Text strong>Phòng 2 người</Typography.Text>
            <div>{allocation.twoPersonRooms} phòng</div>
            <div>({allocation.twoPersonRooms * 2} khách)</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Typography.Text strong>Phòng 3 người</Typography.Text>
            <div>{allocation.threePersonRooms} phòng</div>
            <div>({allocation.threePersonRooms * 3} khách)</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Typography.Text strong>Chưa phân bổ</Typography.Text>
            <div>{allocation.unallocatedGuests} khách</div>
          </Card>
        </Col>
      </Row>
      <Typography.Title level={4}>Kết quả phân bổ: Cần {allocation.totalRooms} phòng, giá {Number(selectedPrice).toLocaleString()}/đêm x {numberOfNights} đêm ~ {Number(provisional).toLocaleString()}</Typography.Title>
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
          Xác nhận thông tin
        </Button>
      </Row>
    </Card>
  );
};

export default RoomAllocation;

import {
  Alert,
  Button,
  Card,
  Input,
  InputNumber,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { vehicleService } from "../../services/vehicleService";

const { Title, Text } = Typography;

export default function VehicleInfo() {
  const [passengers, setPassengers] = useState("");
  const [vehicle, setVehicle] = useState([]);
  const [result, setResult] = useState(null);
  const [tableData, setTableData] = useState([]);
  const data = useSelector((state) => state.orderData.orders); // Get orders from Redux store

  // const dispatch = useDispatch();
  const { orderId } = useParams();

  console.log(orderId)

  // Function to get vehicleId based on orderId
  const getVehicleId = (orderId) => {
    // Find the order with the matching orderId
    const order = data.find((item) => item.orderId === orderId);

    // If an order is found, return the vehicleId
    if (order) {
      return order.vehicleId;
    } else {
      console.log("Order not found!");
      return null;
    }
  };

  const vehicleId = getVehicleId(orderId);
  console.log(vehicleId); // Output the corresponding vehicleId

  // const vehicleId = getVehicleId(orderid);
  // console.log(vehicleId); // Output the corresponding vehicleId

  // console.log(vehicleID);

  const tourInfo = JSON.parse(localStorage.getItem("tourInfo"));
  const calculateTotal = () => {
    const total =
      parseInt(tourInfo?.passengers?.adults) +
      parseInt(tourInfo?.passengers?.childrenUnder11);
    setPassengers(total || tourInfo?.passengers);
    return total;
  };

  const GetAllVehicle = async (vehicleId) => {
    try {
      const res = await vehicleService.getByTypeId(vehicleId);
      if (res && res.data) {
        setVehicle(res.data);
      } else {
        console.warn("No data found for the provided vehicle type ID.");
      }
    } catch (error) {
      console.error("Error retrieving vehicles:", error);
      alert("Failed to retrieve vehicles.");
    }
  };

  useEffect(() => {
    GetAllVehicle(vehicleId);
  }, [vehicleId]);

  useEffect(() => {
    calculateTotal();
  }, []);

  const sortedVehicles = [...vehicle].sort((a, b) => b.seat - a.seat);

  const findOptimalCombination = (totalPassengers) => {
    const passengerCount = parseInt(totalPassengers);
    if (isNaN(passengerCount) || passengerCount <= 0) {
      return { error: "Please enter a valid number of passengers" };
    }

    let remainingPassengers = passengerCount;
    const vehicleDistribution = sortedVehicles.map((vehicle) => ({
      ...vehicle,
      count: 0,
      totalSeats: 0,
      priceNew: "", // Add priceNew field for editing
    }));

    // First pass: Use larger vehicles first
    for (
      let i = 0;
      i < vehicleDistribution.length && remainingPassengers > 0;
      i++
    ) {
      const vehicle = vehicleDistribution[i];
      const neededVehicles = Math.floor(remainingPassengers / vehicle.seat);
      vehicle.count = neededVehicles;
      vehicle.totalSeats = neededVehicles * vehicle.seat;
      remainingPassengers -= vehicle.totalSeats;
    }

    // Second pass: Handle remaining passengers with smallest suitable vehicle
    if (remainingPassengers > 0) {
      for (let i = vehicleDistribution.length - 1; i >= 0; i--) {
        const vehicle = vehicleDistribution[i];
        if (vehicle.seat >= remainingPassengers) {
          vehicle.count += 1;
          vehicle.totalSeats += vehicle.seat;
          remainingPassengers = 0;
          break;
        }
      }
    }

    // Calculate totals
    const totalVehicles = vehicleDistribution.reduce(
      (sum, v) => sum + v.count,
      0
    );
    const totalCapacity = vehicleDistribution.reduce(
      (sum, v) => sum + v.totalSeats,
      0
    );
    const utilizationRate = ((passengerCount / totalCapacity) * 100).toFixed(1);

    if (remainingPassengers > 0) {
      return {
        error:
          "Cannot accommodate this many passengers with available vehicles",
      };
    }

    return {
      distribution: vehicleDistribution,
      totalVehicles,
      totalCapacity,
      passengers: passengerCount,
      utilizationRate,
    };
  };

  const handleCalculate = () => {
    const result = findOptimalCombination(passengers);
    setResult(result);
    if (result && !result.error) {
      setTableData(result.distribution.filter((v) => v.count > 0)); // Populate table data
    }
  };

  console.log(result);

  const handleModalConfirm = () => {
    if (result && !result.error) {
      const confirmedData = {
        ...tourInfo,
        passengers: {
          ...tourInfo.passengers, // Retain existing passenger properties
          total:
            parseInt(tourInfo.passengers.adults || 0) +
            parseInt(tourInfo.passengers.childrenUnder11 || 0) +
            parseInt(tourInfo.passengers.childrenUnder5 || 0), // Calculate total passengers
        },
        totalVehicles: result.totalVehicles,
        totalCapacity: result.totalCapacity,
        utilizationRate: result.utilizationRate,
        vehicles: tableData.map((vehicle) => ({
          vehicleId: vehicle._id,
          vehicleName: vehicle.name,
          quantity: vehicle.count,
          seats: vehicle.seat,
          totalSeats: vehicle.totalSeats,
          type: vehicle.type,
          prices: vehicle.priceNew || vehicle.prices, // Include the updated price
        })),
      };

      localStorage.setItem("tourInfo", JSON.stringify(confirmedData));

      console.log("Vehicle confirm:", confirmedData);
    }
  };

  const handleInputChange = (value, record) => {
    const updatedTableData = tableData.map((item) =>
      item._id === record._id ? { ...item, priceNew: value } : item
    );
    setTableData(updatedTableData);
  };

  const columns = [
    {
      title: "Loại phương tiện",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ghế",
      dataIndex: "seat",
      key: "seat",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Tổng ghế",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: "Đơn giá (mặt định)",
      dataIndex: "prices",
      key: "prices",
      render: (value) => {
        // Format the number with commas
        return new Intl.NumberFormat("en-US").format(value);
      },
    },
    {
      title: "Đơn giá bán",
      dataIndex: "priceNew",
      key: "priceNew",
      render: (text, record) => (
        <Input
          value={record.priceNew}
          onChange={(e) => handleInputChange(e.target.value, record)}
          placeholder="Nhập giá bán"
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "prices",
      render: (_, record) => {
        // Calculate the total
        const total = record.count * (record.priceNew || record.prices) || 0;

        // Format the total with thousand separators
        return new Intl.NumberFormat("en-US").format(total);
      },
    },
  ];

  return (
    <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Chọn phương tiện
      </Title>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <InputNumber
          style={{ width: "100%" }}
          size="large"
          value={passengers}
          min={1}
          disabled
        />
        <Button type="primary" size="large" onClick={handleCalculate}>
          Calculate
        </Button>
      </div>
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
              <Text strong>Total Vehicles: {result.totalVehicles}</Text>
              <Text strong>Total Capacity: {result.totalCapacity} seats</Text>
              <Text strong>Passengers: {result.passengers}</Text>
              <Text strong>Utilization: {result.utilizationRate}%</Text>
            </div>
          </Card>

          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            rowKey="_id"
          />
          <div style={{ marginTop: 24, textAlign: "right" }}>
            <Button type="primary" onClick={handleModalConfirm} size="large">
              Confirm Selection
            </Button>
          </div>
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
}

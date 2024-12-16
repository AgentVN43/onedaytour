import { Alert, Button, Card, InputNumber, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { vehicleService } from "../../services/vehicleService";
const { Title, Text } = Typography;

export default function VehicleInfo() {
  const [passengers, setPassengers] = useState("");
  const [vehicle, setVehicle] = useState([]);
  const [result, setResult] = useState(null);

  const infoTraveler = JSON.parse(localStorage.getItem("order"));
  const calculateTotal = () => {
    const total =
      parseInt(infoTraveler.customer.passengers.adults) +
      parseInt(infoTraveler.customer.passengers.childrenUnder12);
    setPassengers(total);
    return total;
  };

  const vehicleID = JSON.parse(localStorage.getItem("selectedOption")).id;

  const GetAllVehicle = async (id) => {
    try {
      const res = await vehicleService.getByTypeId(id); // Pass `id` to the service
      if (res && res.data) {
        // Check if res and res.data are defined
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
    GetAllVehicle(vehicleID);
    calculateTotal();
  }, [vehicleID]);

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

    // If we still have remaining passengers, it means we can't accommodate everyone
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
  };

  const handleModalConfirm = () => {
    if (result && !result.error) {
      // Create the final data object
      const confirmedData = {
        ...infoTraveler,
        passengers: result.passengers,
        totalVehicles: result.totalVehicles,
        totalCapacity: result.totalCapacity,
        utilizationRate: result.utilizationRate,
        vehicles: result.distribution
          .filter((vehicle) => vehicle.count > 0)
          .map((vehicle) => ({
            vehicleId: vehicle._id,
            vehicleName: vehicle.name,
            quantity: vehicle.count,
            seats: vehicle.seat,
            totalSeats: vehicle.totalSeats,
            type: vehicle.type,
          })),
      };

      localStorage.setItem("order", JSON.stringify(confirmedData));

      console.log("Vehicle confirm:", confirmedData);
    }
  };

  // Configure table columns
  const columns = [
    {
      title: "Vehicle Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Seats",
      dataIndex: "seat",
      key: "seat",
    },
    {
      title: "Quantity Needed",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
  ];

  return (
    <>
      {/* Vehicle Optimizer */}
      <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          Vehicle Optimizer
        </Title>

        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <InputNumber
            style={{ width: "100%" }}
            size="large"
            value={passengers}
            //onChange={setPassengers}
            placeholder="Enter number of passengers"
            min={1}
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
              dataSource={result.distribution.filter((v) => v.count > 0)}
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
    </>
  );
}

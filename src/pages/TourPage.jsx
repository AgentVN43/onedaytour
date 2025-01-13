import { Button, message, Steps, theme } from "antd";
import React, { useEffect, useState } from "react";

// import { provincesService } from "../services/provincesService";
// import BreadcrumbC from "../components/Breadcrumb";
// import HotelsInfo from "../components/hotelsInfo";
// import TourSchedule from "../components/tourSchedule";
// import VehicleInfo from "../components/vehicleInfo";
// import MealsInfo from "../components/mealsInfo";
// import ServicesInfo from "../components/servicesInfo";

import MealsInfo from "../components/mealsInfo";
import ServicesInfo from "../components/servicesInfo";
// import TourQuotation from "../components/tourSchedule";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RoomAllocation from "../components/hotelInfo/RoomAllocation";
import TourQuotation from "../components/tourSchedule";
import { quoteService } from "../services/quoteService";
import VehicleInfo from "../components/VehicleInfo";

export default function TourPage() {
  const navigate = useNavigate();
  const steps = [
    {
      title: "Di chuyển",
      content: <VehicleInfo />,
    },
    {
      title: "Lưu trú",
      content: <RoomAllocation />,
    },
    {
      title: "Ăn uống",
      content: <MealsInfo />,
    },
    {
      title: "Thông tin dịch vụ",
      content: <ServicesInfo />,
    },
    {
      title: "Báo giá",
      content: <TourQuotation />,
    },
  ];

  // steps
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  // const order = JSON.parse(localStorage.getItem("orderInfo"));
  const { orderId } = useParams();

  const data = useSelector((state) => state.orderData.orders); // Get orders from Redux store
  const [totalCost, setTotalCost] = useState(0);
  const [mergedData, setMergedData] = useState({});
  const [details, setDetails] = useState("");
  // Function to get vehicleId based on orderId
  const getVehicleId = (orderId) => {
    // Find the order with the matching orderId
    const order = data.find((item) => item.orderId === orderId);

    // If an order is found, return the vehicleId
    if (order) {
      return order;
    } else {
      console.log("Order not found!");
      return null;
    }
  };

  const order = getVehicleId(orderId);
  useEffect(() => {
    const details = localStorage.getItem("tourInfo");
    if (details) {
      setDetails(JSON.parse(details));
    }
  }, []);
  // const details = JSON.parse(localStorage.getItem("tourInfo"));
  const totalServiceCost = details.service?.reduce(
    (total, service) => total + service.prices * (service.quantity || 1),
    0
  );

  const totalMealCost = details.meals?.reduce((total, meal) => {
    return (
      total +
      meal.sessions?.reduce(
        (sessionTotal, session) =>
          sessionTotal +
          parseInt(session.pricePerPortion || 0) * session.portionCount,
        0
      )
    );
  }, 0);

  const accomCost = details.accommodation?.provisional;
  const vehicleCost = details.vehicles?.reduce(
    (total, vehicle) => total + vehicle.prices,
    0
  );

  const totalCost = totalServiceCost + totalMealCost + accomCost + vehicleCost;

  const mergedData = {
    quoteId: `${order?.orderId}-Q${Math.floor(Math.random() * 1000)}`, // Append Q and a random number
    orderId: order?.orderId,
    totalPrice: totalCost,
    departureDate: details?.date[0],
    returnDate: details?.date[1],
    ...details,
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleStepClick = (stepIndex) => {
    setCurrent(stepIndex);
  };

  const handleSubmit = async () => {
    console.log("Collected Data:", mergedData);
    await quoteService.create(mergedData);
    message.success("Tour information submitted successfully!");
    navigate(`/quote/detail/${mergedData?.orderId}`);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <div className="flex space-x-4">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4">
            {/* <div className='flex justify-center mt-20'> */}
            <Steps
              current={current}
              items={items}
              onChange={handleStepClick} // Enable step clicking
              style={{ cursor: "pointer" }}
            />
            <div style={contentStyle}>{steps[current].content}</div>
            <div className="my-5">
              <div className="my-5">
                {current > 0 && (
                  <Button
                    style={{
                      margin: "0 8px",
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => handleSubmit()}>
                    Done
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

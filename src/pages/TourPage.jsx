import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme } from "antd";
import FormInfo from "../components/Annk/Form/OrderForm";

// import { provincesService } from "../services/provincesService";
// import BreadcrumbC from "../components/Breadcrumb";
// import HotelsInfo from "../components/hotelsInfo";
// import TourSchedule from "../components/tourSchedule";
// import VehicleInfo from "../components/vehicleInfo";
// import MealsInfo from "../components/mealsInfo";
// import ServicesInfo from "../components/servicesInfo";

import { provincesService } from "../services/provincesService";
import BreadcrumbC from "../components/Breadcrumb";
import HotelInfo from "../components/hotelInfo";
import VehicleInfo from "../components/vehicleInfo";
import MealsInfo from "../components/mealsInfo";
import ServicesInfo from "../components/servicesInfo";
// import TourQuotation from "../components/tourSchedule";
import { useNavigate } from "react-router-dom";
import RoomAllocation from "../components/hotelInfo/RoomAllocation";
import TourQuotation from "../components/tourSchedule/test";

export default function TourPage() {
  const steps = [
    {
      title: "Di chuyển",
      content: (
        <VehicleInfo />
      ),
    },
    {
      title: "Lưu trú",
      content: (
        <RoomAllocation />
      ),
    },
    {
      title: "Ăn uống",
      content: (
        <MealsInfo />
      ),
    },
    {
      title: "Thông tin dịch vụ",
      content: (
        <ServicesInfo />
      ),
    },
    {
      title: "Báo giá",
      content: <TourQuotation />,
    },
  ];

  // steps
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
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
            <Steps current={current} items={items} />
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
                  <Button
                    type="primary"
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-2/5">
          <div className="px-3 py-2 border rounded-xl">
            <h2 className="font-semibold text-lg">Thông tin đơn hàng</h2>
            <TourQuotation />
            <div className="flex justify-center items-center mt-3">
              <Button onClick={() => navigate('/quotation')}>Create Quotation</Button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

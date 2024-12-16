import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Steps, message, theme } from "antd";
import { provincesService } from "../../services/provincesService";

import { useEffect, useState } from "react";
import BreadcrumbC from "../Breadcrumb";
import TransactionForm from "../Annk/Form/OrderForm";
import TransportationManagement from "../Transportation";

export default function Quotation() {
  const [infoTraveler, setInfoTraveler] = useState({
    tourId: "",
    customerName: "",
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: {
      adults: 0,
      childrenUnder2: 0,
      childrenUnder12: 0,
    },
    assignedVehicle: null,
    status: "NEW",
    vehicleType: "",
    specialRequirements: "",
  });
  console.log("🚀 ~ TourPage ~ infoTraveler:", infoTraveler);
  const [open, setOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
//   const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const steps = [
    {
      title: "Nhập thông tin",
      content: (
        <TransactionForm
          provinces={provinces}
          infoTraveler={infoTraveler}
          setInfoTraveler={setInfoTraveler}
        />
      ),
    },
    {
      title: "Di chuyển",
      content: (
        <TransportationManagement
          infoTraveler={infoTraveler}
          setInfoTraveler={setInfoTraveler}
        />
      ),
    },
    // {
    //   title: "Lưu trú",
    //   content: (
    //     <HotelInfo
    //       infoTraveler={infoTraveler}
    //       setInfoTraveler={setInfoTraveler}
    //     />
    //   ),
    // },
    // {
    //   title: "Ăn uống",
    //   content: (
    //     <MealsInfo
    //       infoTraveler={infoTraveler}
    //       setInfoTraveler={setInfoTraveler}
    //     />
    //   ),
    // },
    // {
    //   title: "Thông tin dịch vụ",
    //   content: (
    //     <ServicesInfo
    //       infoTraveler={infoTraveler}
    //       setInfoTraveler={setInfoTraveler}
    //     />
    //   ),
    // },
    // {
    //   title: "Báo giá",
    //   content: <TourQuotation />,
    // },
  ];
  const breadcrumbItems = [{ title: "tour" }];

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
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const GetAllProvince = async () => {
    try {
      const res = await provincesService.getAll();
      if (res && res.data) {
        setProvinces(res.data);
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle.");
    }
  };

  useEffect(() => {
    GetAllProvince();
  }, []);

  console.log(provinces);

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={1024}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <BreadcrumbC items={breadcrumbItems} />
        <div className="flex space-x-4">
          <div className="w-3/5">
            <div className="max-w-7xl mx-auto px-4">
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
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5">
            <div className="px-3 py-2 border rounded-xl">
              <h2 className="font-semibold text-lg">Thông tin đơn hàng</h2>
              <div className="flex justify-center items-center mt-3">
                {/* <Button onClick={() => navigate("/quotation")}>
                  Create Quotation
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Divider,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Checkbox,
} from "antd";
import {
  CalendarOutlined,
  CarOutlined,
  UnorderedListOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { quoteService } from "../../services/quoteService";
import { useParams } from "react-router-dom";

// const quoteDetails = {
//   passengers: {
//     adults: 60,
//     childrenUnder5: 0,
//     childrenUnder11: 0,
//     total: 60
//   },
//   accommodation: {
//     selectedRoom: "676e348443d123f4937222c5",
//     onePersonRooms: 0,
//     twoPersonRooms: 30,
//     threePersonRooms: 0
//   },
//   _id: "677fdb327690d6bbdc04379b",
//   quoteId: "BGIBGI-32626479-479XE",
//   orderId: "BGIBGI-32626479-479XE",
//   departureDate: "2025-01-09T17:00:00.000Z",
//   returnDate: "2025-01-10T17:00:00.000Z",
//   vehicles: [
//     {
//       vehicleId: "671a14e25297e006bc7fe221",
//       vehicleName: "Xe du lịch 45",
//       seats: 45,
//       quantity: 1,
//       prices: 3000000,
//       _id: "677fdb327690d6bbdc04379c"
//     },
//     {
//       vehicleId: "67234b8d7c85e443d6199f8f",
//       vehicleName: "Xe du lịch 29",
//       seats: 29,
//       quantity: 1,
//       prices: 1000000,
//       _id: "677fdb327690d6bbdc04379d"
//     }
//   ],
//   meals: [
//     {
//       date: "10/1/2025",
//       sessions: [
//         {
//           session: "Sáng",
//           restaurant: "",
//           portionCount: 60,
//           pricePerPortion: "6761a5bee08f7dbdc19b13ac",
//           note: "",
//           _id: "677fdb327690d6bbdc04379f"
//         },
//         {
//           session: "Trưa",
//           restaurant: "",
//           portionCount: 60,
//           pricePerPortion: "6761a5bee08f7dbdc19b13ac",
//           note: "",
//           _id: "677fdb327690d6bbdc04379f"
//         }
//       ],
//       _id: "677fdb327690d6bbdc04379e"
//     },
//     {
//       date: "11/1/2025",
//       sessions: [
//         {
//           session: "Sáng",
//           restaurant: "",
//           portionCount: 60,
//           pricePerPortion: "6761a5bee08f7dbdc19b13ac",
//           note: "",
//           _id: "677fdb327690d6bbdc0437a1"
//         }
//       ],
//       _id: "677fdb327690d6bbdc0437a0"
//     }
//   ],
//   utilizationRate: 81.1,
//   totalVehicles: 2,
//   totalPrice: 14446820,
//   isApproved: false,
//   services: [],
//   createdAt: "2025-01-09T14:20:34.742Z",
//   updatedAt: "2025-01-09T14:20:34.742Z",
//   __v: 0
// };

const DetailQuotes = ({ onSave }) => {
  const [form] = Form.useForm();
  const { quoteId } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState(null);
  console.log("🚀 ~ DetailQuotes ~ quoteDetails:", quoteDetails);

  const fetchQuote = async () => {
    try {
      const response = await quoteService.getById(quoteId);
      setQuoteDetails(response.data.data); // Update state with fetched quote
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };
  useEffect(() => {
    if (quoteId) fetchQuote(); // Fetch only if `id` is provided
  }, []);

  if (!quoteDetails) return <div>Loading...</div>;

  console.log(quoteDetails);

  // Convert date strings to dayjs objects
  const initialValues = {
    ...quoteDetails,
    departureDate: dayjs(quoteDetails?.departureDate),
    returnDate: dayjs(quoteDetails?.returnDate),
  };

  console.log("This is initial:", initialValues);

  const mealData = quoteDetails?.meals?.flatMap((meal) =>
    meal.sessions.map((session) => ({
      date: meal.date,
      session: session.session,
      portionCount: session.portionCount,
      pricePerPortion: session.pricePerPortion,
    }))
  );
  // useEffect(() => {
  //   if (quoteDetails) {
  //     const initialValues1 = {
  //       ...initialValues,
  //       departureDate: dayjs(quoteDetails?.departureDate),
  //       returnDate: dayjs(quoteDetails?.returnDate),
  //     };
  //     console.log("🚀 ~ useEffect ~ initialValues:", initialValues)
  //     form.setFieldsValue(initialValues1);
  //   }
  // }, [quoteDetails]);
  // console.log("🚀 ~ DetailQuotes ~ initialValues:", initialValues)

  //   // Vehicle columns with Form.List
  const vehicleColumns = [
    {
      title: "Vehicle Name",
      dataIndex: "vehicleName",
      key: "vehicleName",
      render: (_, record, index) => (
        <Form.List name={["vehicles", index, "vehicleName"]}>
          {() => (
            <Form.Item
              name={[index, "vehicleName"]}
              initialValue={record.vehicleName}
              noStyle
            >
              <Input disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
      render: (_, record, index) => (
        <Form.List name={["vehicles", index, "seats"]}>
          {() => (
            <Form.Item
              name={[index, "seats"]}
              initialValue={record.seats}
              noStyle
            >
              <InputNumber disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record, index) => (
        <Form.List name={["vehicles", index, "quantity"]}>
          {() => (
            <Form.Item
              name={[index, "quantity"]}
              initialValue={record.quantity}
              noStyle
            >
              <InputNumber disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
    {
      title: "Price",
      dataIndex: "prices",
      key: "prices",
      render: (_, record, index) => (
        <Form.List name={["vehicles", index, "prices"]}>
          {() => (
            <Form.Item
              name={[index, "prices"]}
              initialValue={record.prices}
              noStyle
            >
              <InputNumber disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
  ];

  // Meal columns with Form.List
  const mealColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record, index) => (
        <Form.List name={["meals", index, "date"]}>
          {() => (
            <Form.Item
              name={[index, "date"]}
              initialValue={record.date ? dayjs(record.date, "D/M/YYYY") : null} // Sử dụng 'D/M/YYYY'
              noStyle
            >
              <DatePicker disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
      render: (_, record, index) => (
        <Form.List name={["meals", index, "session"]}>
          {() => (
            <Form.Item
              name={[index, "session"]}
              initialValue={record.session}
              noStyle
            >
              <Input disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
    {
      title: "Portion Count",
      dataIndex: "portionCount",
      key: "portionCount",
      render: (_, record, index) => (
        <Form.List name={["meals", index, "portionCount"]}>
          {() => (
            <Form.Item
              name={[index, "portionCount"]}
              initialValue={record.portionCount}
              noStyle
            >
              <InputNumber disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
    {
      title: "Price Per Portion",
      dataIndex: "pricePerPortion",
      key: "pricePerPortion",
      render: (_, record, index) => (
        <Form.List name={["meals", index, "pricePerPortion"]}>
          {() => (
            <Form.Item
              name={[index, "pricePerPortion"]}
              initialValue={record.pricePerPortion}
              noStyle
            >
              <Input disabled={!isEditable} />
            </Form.Item>
          )}
        </Form.List>
      ),
    },
  ];
  const onFinish = (values) => {
    onSave(values);
  };

  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card title={`Quote Detail - ${quoteDetails.quoteId}`} bordered={false}>
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Card title="Passenger Information" bordered={false}>
                <Form.Item label="Adults" name={["passengers", "adults"]}>
                  <InputNumber disabled={!isEditable} />
                </Form.Item>
                <Form.Item
                  label="Children (under 5)"
                  name={["passengers", "childrenUnder5"]}
                >
                  <InputNumber disabled={!isEditable} />
                </Form.Item>
                <Form.Item
                  label="Children (under 11)"
                  name={["passengers", "childrenUnder11"]}
                >
                  <InputNumber disabled={!isEditable} />
                </Form.Item>
                <Form.Item
                  label="Total Passengers"
                  name={["passengers", "total"]}
                >
                  <InputNumber disabled />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Accommodation" bordered={false}>
                <Form.Item
                  label="Selected Room ID"
                  name={["accommodation", "selectedRoom"]}
                >
                  <Input disabled={!isEditable} />
                </Form.Item>
                <Form.Item
                  label="1-Person Rooms"
                  name={["accommodation", "onePersonRooms"]}
                >
                  <InputNumber disabled={!isEditable} />
                </Form.Item>
                <Form.Item
                  label="2-Person Rooms"
                  name={["accommodation", "twoPersonRooms"]}
                >
                  <InputNumber disabled={!isEditable} />
                </Form.Item>
                <Form.Item
                  label="3-Person Rooms"
                  name={["accommodation", "threePersonRooms"]}
                >
                  <InputNumber disabled={!isEditable} />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Divider />

          <Row gutter={24}>
            <Col span={24}>
              <Card title="Vehicles" bordered={false}>
                <Table
                  columns={vehicleColumns}
                  dataSource={quoteDetails.vehicles}
                  pagination={false}
                  rowKey="_id"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Meals" bordered={false}>
                <Table
                  columns={mealColumns}
                  dataSource={mealData}
                  pagination={false}
                  rowKey="_id"
                />
              </Card>
            </Col>
          </Row>

          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Departure Date" name="departureDate">
                <DatePicker disabled={!isEditable} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Return Date" name="returnDate">
                <DatePicker disabled={!isEditable} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Utilization Rate" name="utilizationRate">
                <InputNumber disabled={!isEditable} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Total Price" name="totalPrice">
                <InputNumber disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!isEditable}>
              Save Changes
            </Button>
          </Form.Item>

          <Button
            onClick={toggleEdit}
            type="default"
            style={{ marginLeft: "10px" }}
          >
            {isEditable ? "Cancel Edit" : "Edit"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default DetailQuotes;

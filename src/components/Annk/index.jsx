import { CarOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Tabs } from "antd";
import { useState } from "react";
import AccommodationManagement from "../Accommodation";
import OrderForm from "../Annk/Form/OrderForm";
import OrderList from "./List/OrderList";

const { Content } = Layout;

const AnnkTest = () => {
  const [activeKey, setActiveKey] = useState("1");

  const tabItems = [
    {
      label: " Tạo đơn hàng",
      key: "1",
      icon: <CarOutlined />,
      children: <OrderForm />,
    },
    {
      label: "Danh sách đơn hàng",
      key: "2",
      icon: <HomeOutlined />,
      children: <OrderList />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Tabs
          type="card"
          items={tabItems}
          activeKey={activeKey}
          onChange={setActiveKey}
        />
      </Content>
    </Layout>
  );
};

export default AnnkTest;

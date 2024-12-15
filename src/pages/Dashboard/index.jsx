import { CarOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Tabs } from "antd";
import { useState } from "react";
import AccommodationManagement from "../../components/Accommodation";
import AnNK from "../../components/Annk";
import GuideServiceManagement from "../../components/GuideService";
import MealManagement from "../../components/Meal";
import Province from "../../components/Province";
import TourQuotation from "../../components/TourQuotation";
import TransportationManagement from "../../components/Transportation";

const { Content } = Layout;

// Main Admin Dashboard
const AdminDashboard = () => {
  const [activeKey, setActiveKey] = useState("1");

  const tabItems = [
    {
      label: "Transportation",
      key: "1",
      icon: <CarOutlined />,
      children: <TransportationManagement />,
    },
    {
      label: "Accommodation",
      key: "2",
      icon: <HomeOutlined />,
      children: <AccommodationManagement />,
    },
    {
      label: "Meal Packages",
      key: "3",
      children: <MealManagement />,
    },
    {
      label: "Guide Services",
      key: "4",
      icon: <UserOutlined />,
      children: <GuideServiceManagement />,
    },
    {
      label: "Province",
      key: "5",
      icon: <UserOutlined />,
      children: <Province />,
    },
    {
      label: "Quotation",
      key: "6",
      icon: <UserOutlined />,
      children: <TourQuotation />,
    },
    {
      label: "AnNK Test",
      key: "7",
      icon: <UserOutlined />,
      children: <AnNK />,
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

export default AdminDashboard;

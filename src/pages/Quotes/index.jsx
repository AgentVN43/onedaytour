import { Layout } from "antd";
import OrderList from "../../components/Annk/List/OrderList";


const { Content } = Layout;

const Quotes = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        {/* <Tabs
          type="card"
          items={tabItems}
          activeKey={activeKey}
          onChange={setActiveKey}
        /> */}
        <OrderList />
      </Content>
    </Layout>
  );
};

export default Quotes;

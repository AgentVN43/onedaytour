import React, { useState } from 'react';
import { AppstoreOutlined, CarOutlined, GlobalOutlined, HomeOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, StrikethroughOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
const items = [
  { key: '/transportation', icon: <CarOutlined />, label: <Link to="/transportation">Phương tiện</Link> },
  { key: '/accommodation', icon: <HomeOutlined />, label: <Link to="/accommodation">Lưu trú</Link> },
  { key: '/food-packages', icon: <AppstoreOutlined />, label: <Link to="/food-packages">Gói ăn uống</Link> },
  { key: '/guides', icon: <UserOutlined />, label: <Link to="/guides">Hướng dẫn viên</Link> },
  { key: '/locations', icon: <GlobalOutlined />, label: <Link to="/locations">Tỉnh thành</Link> },
  { key: '/orders', icon: <StrikethroughOutlined />, label: <Link to="/orders">Đơn hàng</Link> },
];
const Menus = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: collapsed ? 80 : 256, // Chiều rộng thay đổi tùy thuộc vào trạng thái `collapsed`
        height: '100vh',
        transition: 'width 0.2s', // Thêm hiệu ứng chuyển đổi
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          margin: '8px auto',
          display: 'block',
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        selectedKeys={[location.pathname]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default Menus;
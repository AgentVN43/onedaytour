import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const RoomTypeSelector = ({ selectedRoom, setSelectedRoom }) => {

  const handleChange = (value) => {
    setSelectedRoom(value);
    console.log(`Selected room type: ${value}`);
  };

  return (
    <div className='flex'>
      <h2 className="mr-2">Chọn hạng phòng</h2>
      <Select
        placeholder="Chọn hạng phòng"
        style={{ width: 150 }}
        onChange={handleChange}
        value={selectedRoom}
      >
        <Option value="standard">Tiêu chuẩn</Option>
        <Option value="deluxe">Cao cấp</Option>
        <Option value="suite">Thượng hạng</Option>
      </Select>
    </div>
  );
};

export default RoomTypeSelector;

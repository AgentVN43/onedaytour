import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { accomTypeService } from "../../services/accomType";

const { Option } = Select;

const RoomTypeSelector = ({ selectedRoom, setSelectedRoom }) => {
  const [accomType, setAccomtype] = useState([]);

  const getAccomType = async () => {
    try {
      const res = await accomTypeService.getAll();
      if (res && res.data) {
        setAccomtype(res.data);
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle.");
    }
  };

  useEffect(() => {
    getAccomType();
  }, []);

  const handleChange = (value) => {
    setSelectedRoom(value);
    console.log(`Selected room type: ${value}`);
  };

  return (
    <div className="flex">
      <h2 className="mr-2">Chọn hạng phòng</h2>
      <Select
        placeholder="Chọn hạng phòng"
        style={{ width: 150 }}
        onChange={handleChange}
        value={selectedRoom}
      >
      {
        accomType.map((item) => (
          <Option key={item._id} value={item._id}>
            {item.type}
          </Option>
        ))
      }
      </Select>
    </div>
  );
};

export default RoomTypeSelector;

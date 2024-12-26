import React, { useState, useEffect } from 'react';
import { Collapse, Table, Input, InputNumber, Button, Select, message } from 'antd';
import { service } from '../../services/service';

const { Panel } = Collapse;
const { Option } = Select;

const getDatesInRange = (startDate, endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    let formattedDate = currentDate.toLocaleDateString("vi-VN");
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const ListMeal = [
  {
    id: 1,
    name: 'Sáng'
  },
  {
    id: 2,
    name: 'Trưa'
  },
  {
    id: 3,
    name: 'Tối'
  },
]

const MealManagement = () => {
  const [services, setService] = useState([])
  const infoTraveler = JSON.parse(localStorage.getItem("tourInfo"));
  const [data, setData] = useState([]);

  const getServiceCategoryById = async (categoryId) => {
    const res = await service.getServiceCategoryById(categoryId)
    if (res && res.data) {
      setService(res.data)
    }
  }

  useEffect(() => {
    const dateList = getDatesInRange(infoTraveler.date[0], infoTraveler.date[1]);
    const initialData = dateList.map((date, index) => ({
      key: index,
      date: date,
      sessions: []
    }));
    setData(initialData);
    getServiceCategoryById('6761959fd9fad3b6181add09')
  }, []);

  const handleFieldChange = (dayIndex, sessionIndex, field, value) => {
    const newData = [...data];
    newData[dayIndex].sessions[sessionIndex][field] = value;
    setData(newData);
  };

  const addSession = (dayIndex) => {
    const newData = [...data];
    const currentSessions = newData[dayIndex].sessions.length;

    if (currentSessions < ListMeal.length) {
      const newSessionIndex = currentSessions % ListMeal.length;
      newData[dayIndex].sessions.push({
        key: `${dayIndex}-${currentSessions}`,
        session: ListMeal[newSessionIndex].name,
        restaurant: '',
        portionCount: infoTraveler?.passengers || 0,
        note: '',
        // pricePerPortion: '',
      });
      setData(newData);
    } else {
      alert(`Không thể thêm quá ${ListMeal.length} buổi ăn cho một ngày.`);
    }
  };
  const deleteSession = (dayIndex, sessionIndex) => {
    const newData = [...data];
    newData[dayIndex].sessions.splice(sessionIndex, 1);
    setData(newData);
  };

  const renderSessionTable = (sessions, dayIndex) => {
    const columns = [
      {
        title: 'Buổi', dataIndex: 'session', key: 'session', render: (text, _, index) => (
          <Select value={text} onChange={(value) => handleFieldChange(dayIndex, index, 'session', value)}>
            {ListMeal.map((item, index) => (
              <Option key={`${item.id} - ${index}`} value={item.name}>{item.name}</Option>
            ))}
          </Select>
        )
      },
      {
        title: 'Số phần', dataIndex: 'portionCount', key: 'portionCount', render: (text, _, index) => (
          <InputNumber
            min={0}
            value={text || infoTraveler?.passengers || 0}
            onChange={(value) => handleFieldChange(dayIndex, index, "portionCount", value)}
          />
        )
      },
      {
        title: 'Giá (VND/phần)', dataIndex: 'pricePerPortion', key: 'pricePerPortion', render: (text, _, index) => (
          <Select placeholder='Chọn bữa ăn' value={text} onChange={(value) => handleFieldChange(dayIndex, index, 'pricePerPortion', value)}>
            {services.map((item, index) => (
              <Option key={`${item.id} - ${index}`} value={item._id}>{item.services}</Option>
            ))}
          </Select>
        )
      },
      {
        title: 'Nhà hàng (nếu có)', dataIndex: 'restaurant', key: 'restaurant', render: (text, _, index) => (
          <Input
            placeholder="Nhập tên nhà hàng"
            value={text}
            onChange={(e) => handleFieldChange(dayIndex, index, 'restaurant', e.target.value)}
          />
        )
      },
      {
        title: 'Ghi chú', dataIndex: 'note', key: 'note', render: (text, _, index) => (
          <Input
            placeholder="Nhập ghi chú"
            value={text}
            onChange={(e) => handleFieldChange(dayIndex, index, 'note', e.target.value)}
          />
        )
      },
      {
        title: 'Thao tác',
        key: 'action',
        render: (_, __, sessionIndex) => (
          <Button type="link" onClick={() => deleteSession(dayIndex, sessionIndex)}>Xóa</Button>
        ),
      },
    ];

    return <Table columns={columns} dataSource={sessions} pagination={false} rowKey="session" />;
  };
  const handleConfirmMeals = () => {
    const confirmedData = { ...infoTraveler, meals: data }


    localStorage.setItem("tourInfo", JSON.stringify(confirmedData));

    message.success("Meals data saved successfully");
  };
  return (
    <div>
      <Collapse >
        {data.map((day, dayIndex) => (
          <Panel header={`Ngày: ${day.date}`} key={day.key}>
            {renderSessionTable(day.sessions, dayIndex)}
            <div className='flex items-center justify-center'>
              <Button
                onClick={() => addSession(dayIndex)}
                type="dashed"
                style={{ marginTop: 16 }}
              >
                Thêm buổi ăn
              </Button>
            </div>
          </Panel>
        ))}
      </Collapse>
      <div className='flex items-center justify-center mb-4'>
        <Button type="primary" onClick={handleConfirmMeals} style={{ marginTop: '16px' }}>
          Xác nhận tạo bữa ăn
        </Button>
      </div>
    </div>
  );
};

export default MealManagement
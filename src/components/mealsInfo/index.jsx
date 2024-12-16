import React, { useState, useEffect } from 'react';
import { Collapse, Table, Input, InputNumber, Button, Select } from 'antd';

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
  const infoTraveler = JSON.parse(localStorage.getItem("order"));
  console.log("🚀 ~ MealManagement ~ infoTraveler:", infoTraveler.passengers)
  const [data, setData] = useState([]);
  console.log("🚀 ~ MealManagement ~ data:", data)

  useEffect(() => {
    const dateList = getDatesInRange(infoTraveler.customer.departureDate, infoTraveler.customer.returnDate);
    const initialData = dateList.map((date, index) => ({
      key: index,
      date: date,
      sessions: []
    }));
    setData(initialData);
  }, [infoTraveler.customer.departureDate, infoTraveler.customer.returnDate]);

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
        portionCount: 0,
        pricePerPortion: 0,
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
        title: 'Nhà hàng', dataIndex: 'restaurant', key: 'restaurant', render: (text, _, index) => (
          <Input value={text} onChange={(e) => handleFieldChange(dayIndex, index, 'restaurant', e.target.value)} />
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
          <InputNumber min={0} value={text} onChange={(value) => handleFieldChange(dayIndex, index, 'pricePerPortion', value)} />
        )
      },
      // {
      //   title: 'Hóa đơn', dataIndex: 'invoice', key: 'invoice', render: (text, _, index) => (
      //     <Input value={text} onChange={(e) => handleFieldChange(dayIndex, index, 'invoice', e.target.value)} />
      //   )
      // },
      // { title: 'Chưa VAT', dataIndex: 'preVATAmount', key: 'preVATAmount' },
      // { title: 'VAT', dataIndex: 'VAT', key: 'VAT' },
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


    localStorage.setItem("order", JSON.stringify(confirmedData));

    console.log("Meals data saved successfully:", data);
  };
  return (
    <div>
      <Collapse >
        {data.map((day, dayIndex) => (
          <Panel header={`Ngày: ${day.date}`} key={day.key}>
            {renderSessionTable(day.sessions, dayIndex)}
            <Button
              onClick={() => addSession(dayIndex)}
              type="dashed"
              style={{ marginTop: 16 }}
            >
              Thêm buổi ăn
            </Button>
          </Panel>
        ))}
      </Collapse>

      <Button type="primary" onClick={handleConfirmMeals} style={{ marginTop: '16px' }}>
        Xác nhận tạo bữa ăn
      </Button>
    </div>
  );
};

export default MealManagement
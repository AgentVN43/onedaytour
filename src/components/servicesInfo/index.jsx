import { Card, Typography, Tabs, Collapse, Button, Checkbox, Table, Empty, Col, message } from "antd";
import React, { useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";
import { service } from "../../services/service";
import PriceManagement from "../priceManagement";
import DetailService from "../detailService";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function ServicesInfo() {
  const [categorys, setCategorys] = useState([])
  const [services, setServices] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  console.log("🚀 ~ ServicesInfo ~ selectedServices:", selectedServices)

  const getAllCategory = async () => {
    const resCategory = await categoryService.getAll()
    if (resCategory && resCategory?.data)
      setCategorys(resCategory?.data)
  }

  console.log(categorys)

  const getServiceCategoryById = async (categoryId) => {
    try {
      const res = await service.getServiceCategoryById(categoryId);
      if (res && res.data) {
        setServices(res.data);
      }
    } catch (error) {
      console.error("Error fetching service category:", error);
      setServices([]); // Optionally reset state on error
    }
  };

  // Handle Collapse change
  const handleCollapseChange = (activeKey) => {
    setActiveCategoryId(activeKey[0]); // Update active category ID
    if (activeKey) {
      getServiceCategoryById(activeKey); // Fetch services for the selected category
    }
  };

  const handleCheckboxChange = (service) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.some(selectedService => selectedService._id === service._id)) {
        // Remove service from selected list
        return prevSelected.filter((prevSelected) => prevSelected._id !== service._id);
      } else {
        // Add service to selected list
        return [...prevSelected, service];
      }
    });
  };
  const handleConfirm = () => {
    const infoTraveler = JSON.parse(localStorage.getItem("tourInfo"));
    const confirmedData = { ...infoTraveler, service: selectedServices }

    localStorage.setItem("tourInfo", JSON.stringify(confirmedData));
    message.success("Service data saved successfully");
  };

  useEffect(() => {
    getAllCategory()
  }, [])
  return (
    <>
      <Card style={{ width: "100%", margin: "0 auto" }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          Dịch vụ khác
        </Title>
        <div className="flex gap-4">
          <Collapse className="w-1/3" accordion onChange={handleCollapseChange} activeKey={activeCategoryId}>
            {categorys.map((item) => (
              <Collapse.Panel header={item.categoryName} key={item._id}>
                {activeCategoryId === item._id && (
                  <div className="flex flex-col">
                    {services.length === 0 ?
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      : services.map((service) => (
                        <Checkbox
                          key={service._id}
                          checked={selectedServices.some(selectedService => selectedService._id === service._id)}
                          onChange={() => handleCheckboxChange(service)}
                        >
                          {service.services}
                        </Checkbox>
                      ))}
                  </div>
                )}
              </Collapse.Panel>
            ))}
          </Collapse>

          <div className="w-2/3">
            <DetailService services={selectedServices} setServices={setSelectedServices} />
          </div>
        </div>
      </Card>
      <div className='flex items-center justify-center mb-4'>
        <Button type="primary" onClick={handleConfirm} style={{ marginTop: '16px' }}>
          Xác nhận thông tin
        </Button>
      </div>
    </>
  );
}

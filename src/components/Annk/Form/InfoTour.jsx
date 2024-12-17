import { Button, DatePicker, Form, Input, message, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { provincesService } from "../../../services/provincesService";
import { vehicleTypeService } from "../../../services/vehicleTypeService";
import { orderService } from "../../../services/orderService";
import { generateTourId } from "../../../utils/generateTourId";
import VehicleOption from "../../vehicleOption";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const InfoTour = ({ form }) => {
    const { RangePicker } = DatePicker;

    const handleAddOrder = async (values) => {
        const newInfo = {
            departureDate: values.date ? values.date[0].format("YYYY-MM-DD") : "",
            returnDate: values.date ? values.date[1].format("YYYY-MM-DD") : "",
            passengers: values.passengers,
        };
    };

    return (
        <div className="max-w-full mx-auto p-5">
            <h2 className="text-2xl font-bold mb-6">
                Thông tin chuyến đi
            </h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleAddOrder}
                autoComplete="off"
                initialValues={{
                    passengers: {
                        adults: 0,
                        childrenUnder11: 0,
                        childrenUnder5: 0,
                    },
                }}
            >
                <Form.Item
                    label="Ngày đi - Ngày về"
                    name="date"
                    rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
                >
                    <RangePicker
                        placeholder={['Nhập ngày bắt đầu', 'Nhập ngày kết thúc']}
                        className="w-full"
                    />
                </Form.Item>
                <div>
                    <p className='text-start'>Số lượng hành khách</p>
                    <div className='grid grid-cols-3 gap-5'>
                        <Form.Item
                            label="Người lớn (11 tuổi trở lên)"
                            name={["passengers", "adults"]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng hợp lệ!',
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject(new Error('Vui lòng nhập số lượng!'));
                                        }
                                        if (isNaN(value) || value <= 0) {
                                            return Promise.reject(new Error('Số lượng phải là số dương!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Trẻ em (dưới 11 tuổi)"
                            name={["passengers", "childrenUnder11"]}
                        >
                            <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Trẻ nhỏ (dưới 5 tuổi)"
                            name={["passengers", "childrenUnder5"]}
                        >
                            <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default InfoTour;

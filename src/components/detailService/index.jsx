import React, { useEffect, useMemo } from 'react';
import { Table, InputNumber, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.css'

const DetailService = ({ services, setServices }) => {
    console.log("🚀 ~ DetailService ~ services:", services)
    const servicesWithQuantity = useMemo(() => {
        return services.map((service) => ({
            ...service,
            quantity: service.quantity || 1, // Add default quantity if not exists
        }));
    }, [services]);
    useEffect(() => {
        setServices(servicesWithQuantity)
    }, [])
    // Handle quantity change
    const handleQuantityChange = (id, quantity) => {
        setServices((prev) =>
            prev.map((service) =>
                service._id === id ? { ...service, quantity: quantity || 1 } : service
            )
        );
    };

    // Handle delete service
    const handleDelete = (id) => {
        setServices((prev) => prev.filter((service) => service._id !== id));
    };

    const totalAmount = servicesWithQuantity.reduce(
        (total, service) => total + service.prices * service.quantity,
        0
    );
    // Table columns configuration
    const columns = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'services',
            key: 'services',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'prices',
            key: 'prices',
            render: (price) => `${price?.toLocaleString()} VND`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    value={record.quantity || 1}
                    onChange={(value) => handleQuantityChange(record._id, value)}
                />
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            render: (_, record) => `${(record.prices * (record.quantity || 1)).toLocaleString()} VND`,
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa dịch vụ này?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <h2 className='text-lg pb-1'>Chi tiết các dịch vụ đã chọn</h2>
            <Table
                className='detailService h-[70vh] modal-body overflow-y-auto'
                dataSource={servicesWithQuantity}
                columns={columns}
                rowKey="id"
                pagination={false}
                bordered
            />
            <div className='flex justify-between my-2'>
                <strong>Tổng cộng:</strong>
                <strong>{totalAmount.toLocaleString()} VNĐ</strong>
            </div>
        </div>
    );
};

export default DetailService;

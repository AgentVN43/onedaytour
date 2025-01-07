import React from 'react';
import { Table, Typography, Divider, Collapse } from 'antd';
const { Panel } = Collapse;

const { Title } = Typography;

const CompareQuotes = () => {
    const data1 = {
        passengers: {
            adults: 2,
            childrenUnder5: 1,
            childrenUnder11: 0,
            total: 3
        },
        accommodation: {
            selectedRoom: 'Deluxe Room',
            onePersonRooms: 1,
            twoPersonRooms: 1,
            threePersonRooms: 0
        },
        vehicles: [
            {
                vehicleId: '64b7fbd5e4b00c3e00123456',
                vehicleName: 'Toyota Hiace',
                seats: 12,
                quantity: 1,
                priceNew: 500
            }
        ],
        meals: [
            {
                date: '2024-01-15',
                sessions: [
                    {
                        session: 'Lunch',
                        restaurant: 'Sea View Restaurant',
                        portionCount: 3,
                        pricePerPortion: '64b7fbd5e4b00c3e00987654',
                        note: 'Vegetarian options available'
                    },
                    {
                        session: 'Dinner',
                        restaurant: 'Sunset Grill',
                        portionCount: 3,
                        pricePerPortion: '64b7fbd5e4b00c3e00987655',
                        note: 'Seafood specialties'
                    }
                ]
            }
        ],
        services: [
            {
                serviceId: '64b7fbd5e4b00c3e00111111',
                serviceName: 'Tour Guide',
                category: 'Human Resources',
                price: 100,
                quantity: 1
            },
            {
                serviceId: '64b7fbd5e4b00c3e00222222',
                serviceName: 'Travel Insurance',
                category: 'Insurance',
                price: 50,
                quantity: 3
            }
        ],
        utilizationRate: 85.5,
        totalVehicles: 1,
        totalPrice: 1500
    };

    const data2 = {
        passengers: {
            adults: 5,
            childrenUnder5: 0,
            childrenUnder11: 3,
            total: 8
        },
        accommodation: {
            selectedRoom: '676e348443d123f4937222c5',
            onePersonRooms: 0,
            twoPersonRooms: 4,
            threePersonRooms: 0
        },
        vehicles: [
            {
                vehicleId: '67234b8d7c85e443d6199f8f',
                vehicleName: 'Xe du lịch 29',
                seats: 29,
                quantity: 1,
                prices: 1500000
            }
        ],
        meals: [
            {
                date: '1/1/2025',
                sessions: [
                    {
                        session: 'Sáng',
                        restaurant: '',
                        portionCount: 8,
                        pricePerPortion: '6761a5bee08f7dbdc19b13ac',
                        note: ''
                    }
                ]
            },
            {
                date: '2/1/2025',
                sessions: [
                    {
                        session: 'Sáng',
                        restaurant: '',
                        portionCount: 8,
                        pricePerPortion: '6761a5bee08f7dbdc19b13ac',
                        note: ''
                    }
                ]
            },
            {
                date: '3/1/2025',
                sessions: [
                    {
                        session: 'Sáng',
                        restaurant: '',
                        portionCount: 8,
                        pricePerPortion: '6761a5bee08f7dbdc19b13ac',
                        note: ''
                    }
                ]
            }
        ],
        services: [
            {
                serviceId: '64b7fbd5e4b00c3e00111111',
                serviceName: 'Tour Guide',
                category: 'Human Resources',
                price: 100,
                quantity: 1
            },
            {
                serviceId: '64b7fbd5e4b00c3e00222222',
                serviceName: 'Travel Insurance',
                category: 'Insurance',
                price: 50,
                quantity: 3
            }
        ],
        utilizationRate: 27.6,
        totalVehicles: 1,
        totalPrice: 319776401500000
    };

    const columns = [
        { title: 'Field', dataIndex: 'field', key: 'field', render: (text) => <strong>{text}</strong> },
        { title: 'Quote 1', dataIndex: 'quote1', key: 'quote1' },
        { title: 'Quote 2', dataIndex: 'quote2', key: 'quote2' }
    ];

    const tableStyle = {
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        color: '#555',
    };

    const rowStyle = {
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
    };

    const generateTableData = (data, quote1) => {
        if (!data || !quote1) {
            return []; // Return empty array if data or quote1 is undefined
        }

        return [
            { key: 'adults', field: 'Adults', quote1: data.passengers?.adults ?? 0, quote2: quote1.passengers?.adults ?? 0 },
            { key: 'childrenUnder5', field: 'Children Under 5', quote1: data.passengers?.childrenUnder5 ?? 0, quote2: quote1.passengers?.childrenUnder5 ?? 0 },
            { key: 'childrenUnder11', field: 'Children Under 11', quote1: data.passengers?.childrenUnder11 ?? 0, quote2: quote1.passengers?.childrenUnder11 ?? 0 },
            { key: 'total', field: 'Total Passengers', quote1: data.passengers?.total ?? 0, quote2: quote1.passengers?.total ?? 0 },
        ];
    };

    const generateAccommodationData = (data, quote1) => {
        return [
            { key: 'selectedRoom', field: 'Selected Room', quote1: data.accommodation.selectedRoom, quote2: quote1.accommodation.selectedRoom },
            { key: 'onePersonRooms', field: 'One Person Rooms', quote1: data.accommodation.onePersonRooms, quote2: quote1.accommodation.onePersonRooms },
            { key: 'twoPersonRooms', field: 'Two Person Rooms', quote1: data.accommodation.twoPersonRooms, quote2: quote1.accommodation.twoPersonRooms },
            { key: 'threePersonRooms', field: 'Three Person Rooms', quote1: data.accommodation.threePersonRooms, quote2: quote1.accommodation.threePersonRooms },
        ];
    };

    const generateVehiclesData = (data, quote1) => {
        return data.vehicles.map((vehicle, index) => ({
            key: index,
            field: vehicle.vehicleName,
            quote1: `${vehicle.quantity} x ${vehicle.seats} seats @ ${vehicle.priceNew} each`,
            quote2: `${quote1.vehicles[index]?.quantity} x ${quote1.vehicles[index]?.seats} seats @ ${quote1.vehicles[index]?.prices} each`,
        }));
    };

    const generateServicesData = (data, quote1) => {
        return data.services.map((service, index) => ({
            key: index,
            field: service.serviceName,
            quote1: `${service.quantity} x $${service.price}`,
            quote2: `${quote1?.services[index]?.quantity} x $${quote1?.services[index]?.price}`,
        }));
    };

    const generateSummaryData = (data, quote1) => {
        return [
            { key: 'totalPrice', field: 'Total Price', quote1: `$${data.totalPrice}`, quote2: `$${quote1.totalPrice}` },
            { key: 'utilizationRate', field: 'Utilization Rate', quote1: `${data.utilizationRate}%`, quote2: `${quote1.utilizationRate}%` },
        ];
    };


    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Compare Quotes</Title>
            <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
                {/* Passenger Information */}
                <Panel header={<Divider orientation="left" style={{ fontSize: '14px', margin: '0px' }}>Passenger Information</Divider>} key="1">
                    <Table
                        columns={columns}
                        dataSource={generateTableData(data1, data2)}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        rowClassName="table-row"
                        tableLayout="auto"
                        components={{
                            header: {
                                cell: (props) => <th {...props} style={headerStyle} />,
                            },
                        }}
                    />
                </Panel>

                {/* Accommodation */}
                <Panel header={<Divider orientation="left" style={{ fontSize: '14px', margin: '0px' }}>Accommodation</Divider>} key="2">
                    <Table
                        columns={columns}
                        dataSource={generateAccommodationData(data1, data2)}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        rowClassName="table-row"
                        tableLayout="auto"
                        components={{
                            header: {
                                cell: (props) => <th {...props} style={headerStyle} />,
                            },
                        }}
                    />
                </Panel>

                {/* Vehicles */}
                {/* Repeat similar pattern for vehicles, services, and summary */}
                {/* Vehicles */}
                <Panel header={<Divider orientation="left" style={{ fontSize: '14px', margin: '0px' }}>Vehicles</Divider>} key="3">
                    <Table
                        columns={columns}
                        dataSource={generateVehiclesData(data1, data2)}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        rowClassName="table-row"
                        tableLayout="auto"
                        components={{
                            header: {
                                cell: (props) => <th {...props} style={headerStyle} />,
                            },
                        }}
                    />
                </Panel>

                {/* Services */}
                <Panel header={<Divider orientation="left" style={{ fontSize: '14px', margin: '0px' }}>Services</Divider>} key="4">
                    <Table
                        columns={columns}
                        dataSource={generateServicesData(data1, data2)}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        rowClassName="table-row"
                        tableLayout="auto"
                        components={{
                            header: {
                                cell: (props) => <th {...props} style={headerStyle} />,
                            },
                        }}
                    />
                </Panel>

                {/* Summary */}
                <Panel header={<Divider orientation="left" style={{ fontSize: '14px', margin: '0px' }}>Summary</Divider>} key="5">
                    <Table
                        columns={columns}
                        dataSource={generateSummaryData(data1, data2)}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        rowClassName="table-row"
                        tableLayout="auto"
                        components={{
                            header: {
                                cell: (props) => <th {...props} style={headerStyle} />,
                            },
                        }}
                    />
                </Panel>
            </Collapse>
        </div>
    );
};

export default CompareQuotes;

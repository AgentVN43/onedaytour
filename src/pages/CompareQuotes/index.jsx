import React, { useState } from 'react';
import { Table, Typography, Divider, Collapse, Select } from 'antd';
const { Panel } = Collapse;

const { Title } = Typography;

const CompareQuotes = () => {
    const data1 = {
        passengers: {
            adults: 2,
            childrenUnder5: 1,
            childrenUnder11: 1,
            total: 4,
        },
        accommodation: {
            selectedRoom: 'Deluxe',
            onePersonRooms: 1,
            twoPersonRooms: 2,
            threePersonRooms: 1,
        },
        vehicles: [
            { vehicleName: 'Bus', quantity: 1, seats: 20, priceNew: 100 },
            { vehicleName: 'Car', quantity: 2, seats: 4, priceNew: 50 },
        ],
        services: [
            { serviceName: 'Guide', quantity: 2, price: 30 },
            { serviceName: 'Meal', quantity: 4, price: 20 },
        ],
        totalPrice: 1000,
        utilizationRate: 80,
    };

    const data2 = {
        passengers: {
            adults: 3,
            childrenUnder5: 2,
            childrenUnder11: 1,
            total: 6,
        },
        accommodation: {
            selectedRoom: 'Standard',
            onePersonRooms: 2,
            twoPersonRooms: 1,
            threePersonRooms: 2,
        },
        vehicles: [
            { vehicleName: 'Bus', quantity: 2, seats: 20, priceNew: 120 },
            { vehicleName: 'Car', quantity: 3, seats: 4, priceNew: 60 },
        ],
        services: [
            { serviceName: 'Guide', quantity: 3, price: 35 },
            { serviceName: 'Meal', quantity: 6, price: 25 },
        ],
        totalPrice: 1200,
        utilizationRate: 85,
    };

    const data3 = {
        passengers: {
            adults: 4,
            childrenUnder5: 1,
            childrenUnder11: 2,
            total: 7,
        },
        accommodation: {
            selectedRoom: 'Suite',
            onePersonRooms: 1,
            twoPersonRooms: 3,
            threePersonRooms: 1,
        },
        vehicles: [
            { vehicleName: 'Bus', quantity: 2, seats: 25, priceNew: 150 },
            { vehicleName: 'Car', quantity: 2, seats: 6, priceNew: 70 },
        ],
        services: [
            { serviceName: 'Guide', quantity: 4, price: 40 },
            { serviceName: 'Meal', quantity: 7, price: 30 },
        ],
        totalPrice: 1500,
        utilizationRate: 90,
    };

    const quotes = [data1, data2, data3];

    const [selectedQuoteIndex1, setSelectedQuoteIndex1] = useState(0);
    const [selectedQuoteIndex2, setSelectedQuoteIndex2] = useState(1);

    const handleQuote1Change = (value) => {
        setSelectedQuoteIndex1(value);
    };

    const handleQuote2Change = (value) => {
        setSelectedQuoteIndex2(value);
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
            return [];
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
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <Select defaultValue={0} onChange={handleQuote1Change} style={{ width: 200, marginRight: 20 }}>
                    {quotes.map((_, index) => (
                        <Select.Option key={index} value={index}>
                            Báo giá {index + 1}
                        </Select.Option>
                    ))}
                </Select>
                <Select defaultValue={1} onChange={handleQuote2Change} style={{ width: 200 }}>
                    {quotes.map((_, index) => (
                        <Select.Option key={index} value={index}>
                            Báo giá {index + 1}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
                {/* Passenger Information */}
                <Panel header={<Divider orientation="left" style={{ fontSize: '14px', margin: '0px' }}>Passenger Information</Divider>} key="1">
                    <Table
                        columns={columns}
                        dataSource={generateTableData(quotes[selectedQuoteIndex1], quotes[selectedQuoteIndex2])}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        showHeader={false}
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
                        dataSource={generateAccommodationData(quotes[selectedQuoteIndex1], quotes[selectedQuoteIndex2])}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        showHeader={false}
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
                <Panel header={<Divider orientation="left" style={{ fontSize: '14px', margin: '0px' }}>Vehicles</Divider>} key="3">
                    <Table
                        columns={columns}
                        dataSource={generateVehiclesData(quotes[selectedQuoteIndex1], quotes[selectedQuoteIndex2])}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        showHeader={false}
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
                        dataSource={generateServicesData(quotes[selectedQuoteIndex1], quotes[selectedQuoteIndex2])}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        showHeader={false}
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
                        dataSource={generateSummaryData(quotes[selectedQuoteIndex1], quotes[selectedQuoteIndex2])}
                        bordered
                        pagination={false}
                        style={tableStyle}
                        showHeader={false}
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

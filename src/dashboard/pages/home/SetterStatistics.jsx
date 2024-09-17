import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import MonthSelect from './MonthSelect';
import { useStateContext } from '../../../hook/ContextProvider';
import useAxiosFetch from '../../../hook/useAxiosFetch';
import './statistics.css';
import api from '../../../api/DashboardAPI'

const initialData = [
    { month: 'Jan', percentage: 60 },
    { month: 'Feb', percentage: 45 },
    { month: 'Mar', percentage: 63 },
    { month: 'Apr', percentage: 40 },
    { month: 'May', percentage: 77 },
    { month: 'Jun', percentage: 58 },
    { month: 'Jul', percentage: 87 },
    { month: 'Aug', percentage: 55 },
    { month: 'Sep', percentage: 100 },
    { month: 'Oct', percentage: 88 },
    { month: 'Nov', percentage: 49 },
    { month: 'Dec', percentage: 98 },
];

const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    const isZero = payload.value === 0;
    
    return (
        <text
            x={x}
            y={y}
            fill="#666"
            fontFamily="Space Grotesk"
            fontSize={12}
            fontWeight={500}
            textAnchor="end"
            style={{
                transform: `translateX(${isZero ? '-25px' : '-10px'})`
            }}
        >
            {isZero ? '0 ' : `${payload.value}%`}
        </text>
    );
};

const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
        <text
            x={x}
            y={y}
            fill="#666"
            fontFamily="Space Grotesk"
            fontSize={14}
            fontWeight={500}
            textAnchor="middle"
            style={{ transform: 'translateY(25px)' }} 
        >
            {payload.value}
        </text>
    );
};

const RoundedBar = (props) => {
    const { x, y, width, height, percentage } = props;
    const radius = 8;
    const fillColor = percentage === 100 ? '#23C1FF' : '#0002FF';

    return (
        <g>
            <rect x={x} y={y} width={width} height={height} fill={fillColor} rx={radius} ry={radius}  />
        </g>
    );
};

const getCurrentMonthName = () => {
    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[now.getMonth()];
};


const SetterStatistics = () => {
    const [chartData, setChartData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('7 month');
    const { percentage } = useStateContext(); 
    const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');
  
    const currentMonthName = getCurrentMonthName();

    const updatedData = initialData.map((item) => 
        item.month === currentMonthName ? { ...item, percentage } : item
    );

    const getChartData = (numMonths) => {
        const totalMonths = updatedData.length;
        const endIndex = totalMonths;
        const startIndex = Math.max(totalMonths - numMonths, 0);
        return updatedData.slice(startIndex, endIndex);
    };

    const handleMonthSelect = (value) => {
        setSelectedValue(value);
        const numMonths = parseInt(value, 10);
        setChartData(getChartData(numMonths));
    };

    useEffect(() => {
        handleMonthSelect(selectedValue);
    }, [percentage]);

   // Connect with API
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get('/DashboardAPI');
            console.log('Response:', response.data); // Check the response from the server
      } catch (error) {
      
        console.error('Error fetching data:', error);
      } 
    };

    fetchData();
  }, []); 


    return (
        <div className="setter-statistics">
            <div className="setter-statistics-header">
                <h2>Setter Statistics</h2>
                <div className="month-container">
                    <MonthSelect onChange={handleMonthSelect} />
                </div>
            </div>
            <div className="chart-container">
                {isLoading && <p className='statusMsg'>Loading...</p>}
                {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
                {!isLoading && !fetchError && (
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 50,
                                bottom: 20,
                            }}
                            barSize={36}
                        >
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={<CustomXAxisTick />} />
                            <YAxis
                                tickFormatter={(tick) => (tick !== 0 ? `${tick}%` : '0  ')}
                                domain={[0, 100]}
                                axisLine={false}
                                tickLine={false}
                                tick={<CustomYAxisTick />}
                            />
                            <Bar 
                                dataKey="percentage" 
                                shape={props => <RoundedBar {...props} percentage={props.payload.percentage} />} 
                                marginLeft={5}  
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default SetterStatistics;

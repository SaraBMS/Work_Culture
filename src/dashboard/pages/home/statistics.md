import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import MonthSelect from './MonthSelect';
import './statistics.css';

// All data
const allData = [
    { month: 'Jan', percentage: 60 },
    { month: 'Feb', percentage: 45 },
    { month: 'Mar', percentage: 63 },
    { month: 'Apr', percentage: 100 },
    { month: 'May', percentage: 77 },
    { month: 'Jun', percentage: 72 },
    { month: 'Jul', percentage: 87 },
    { month: 'Aug', percentage: 55 },
    { month: 'Sep', percentage: 20 },
    { month: 'Oct', percentage: 88 },
    { month: 'Nov', percentage: 49 },
    { month: 'Dec', percentage: 98 },
];

// Custom Y-axis tick with extra space for `0`
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
            lineHeight="22px"
            textAnchor="end"
            style={{
                transform: `translateX(${isZero ? '-25px' : '-10px'})` // Adjust the value to fit your layout
            }}
        >
            {isZero ? '0 ' : `${payload.value}%`}
        </text>
    );
};

// Custom X-axis tick
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
            lineHeight="24px"
            textAnchor="middle"
            style={{ transform: 'translateY(25px)' }} 
        >
            {payload.value}
        </text>
    );
};

// Custom Bar Component
const RoundedBar = (props) => {
    const { x, y, width, height, fill, current } = props;
    const radius = 8;

    const barColor = current ? 'rgb(3, 149, 204)' : fill;

    return (
        <g>
            <rect x={x} y={y} width={width} height={height} fill={barColor} rx={radius} ry={radius} />
        </g>
    );
};

// Main component
const SetterStatistics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        handleMonthSelect('7 month');
    }, []);

    const handleMonthSelect = (value) => {
        const months = parseInt(value.split(' ')[0], 10);
        const currentMonth = new Date().getMonth(); // 0 for January, 1 for February, etc.

        let startMonthIndex = (currentMonth + 1 - months + 12) % 12;

        const rearrangedData = [];
        for (let i = 0; i < months; i++) {
            const monthIndex = (startMonthIndex + i) % 12;
            rearrangedData.push({
                ...allData[monthIndex],
                current: monthIndex === currentMonth,
            });
        }

        // If the selected value of months is greater than the current month index,
        // remove the first month from the left and add the next month.
        if (months > currentMonth + 1) {
            rearrangedData.shift(); // Remove the first month
            rearrangedData.push({
                ...allData[(currentMonth + 1 ) ], // Add the next month
                current: false
            });
        }

        setData(rearrangedData);
    };

    return (
        <div className="setter-statistics">
            <div className="setter-statistics-header">
                <h2>Setter Statistics</h2>
                <div className="month-container">
                    <MonthSelect onSelect={handleMonthSelect} />
                </div>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                        data={data}
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
                        <Bar dataKey="percentage" fill="#0002FF" shape={<RoundedBar />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SetterStatistics;


// Sample data (without current month data initially)
const initialData = [
    { month: 'Jan', percentage: 60 },
    { month: 'Feb', percentage: 45 },
    { month: 'Mar', percentage: 63 },
    { month: 'Apr', percentage: 100 },
    { month: 'May', percentage: 77 },
    { month: 'Jun', percentage: 58 },
    { month: 'Jul', percentage: 87 },
    { month: 'Aug', percentage: 55 },
    { month: 'Sep', percentage: 20 },
    { month: 'Oct', percentage: 88 },
    { month: 'Nov', percentage: 49 },
    { month: 'Dec', percentage: 98 },
];

// Helper function to get the current month name
const getCurrentMonthName = () => {
    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[now.getMonth()];
};
 const { percentage } = useStateContext(); // Access the context
    const [chartData, setChartData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('7 month');
    
    // Get the current month name
    const currentMonthName = getCurrentMonthName();

    // Update initial data to include the context percentage value
    const updatedData = initialData.map((item) => 
        item.month === currentMonthName ? { ...item, percentage } : item
    );

    // Function to get the data window based on the number of months
    const getChartData = (numMonths) => {
        const totalMonths = updatedData.length;
        const currentMonthIndex = updatedData.findIndex(data => data.month === currentMonthName);

        // Ensure the current month is included
        const endIndex = Math.min(totalMonths, currentMonthIndex + 1);
        const startIndex = Math.max(0, endIndex - numMonths);

        return updatedData.slice(startIndex, endIndex);
    };

    // Handle month selection and update chart data
    const handleMonthSelect = (value) => {
        setSelectedValue(value);
        const numMonths = parseInt(value, 10); // Extract number of months from string
        setChartData(getChartData(numMonths));
    };

    // Initialize chart data on component mount
    useEffect(() => {
        handleMonthSelect(selectedValue); // Set default data
    }, [percentage]); // Re-run when percentage changes








do this  useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Here you would typically fetch data from an API
                setChartData(getChartData(parseInt(selectedValue, 10)));
                setIsLoading(false);
            } catch (error) {
                setFetchError('Failed to load data');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [percentage, selectedValue]); // Re-run whe  like this like 
    
      const handleEditGoal = async (goalId, newDescription, newCompleted, selectedValue) => {
        try {
            const id = goalId.toString();
            const updatedGoalData = { type: selectedValue, description: newDescription, completed: newCompleted, email, percentage };
            const response = await api.put(`/DashboardAPI/${id}`, updatedGoalData);
            const updatedGoals = goals.map(goal =>
                goal.id === id ? response.data : goal
            );
            const newPercentage = calculatePercentage(updatedGoals);

            // Update the goal with the new percentage
            const updatedGoalsWithPercentage = updatedGoals.map(goal =>
                goal.id === id ? { ...goal, percentage: newPercentage } : goal
            );

            setGoals(updatedGoalsWithPercentage);
            setGoalDescrip('');
            setSelectedGoal(null);
            updatePercentage(newPercentage);
            await updatePercentageInDatabase(newPercentage);
        } catch (error) {
            console.log(`Error editing goal: ${error.message}`);
        }import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import MonthSelect from './MonthSelect';
import { useStateContext } from '../../../hook/ContextProvider';
import useAxiosFetch from '../../../hook/useAxiosFetch';
import './statistics.css';

// Sample data
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

// Custom Y-axis tick with extra space for `0`
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
            lineHeight="22px"
            textAnchor="end"
            style={{
                transform: `translateX(${isZero ? '-25px' : '-10px'})` // Adjust the value to fit your layout
            }}
        >
            {isZero ? '0 ' : `${payload.value}%`}
        </text>
    );
};

// Custom X-axis tick
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
            lineHeight="24px"
            textAnchor="middle"
            style={{ transform: 'translateY(25px)' }} 
        >
            {payload.value}
        </text>
    );
};

// Custom Bar Component
const RoundedBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 8;
    
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} fill={fill} rx={radius} ry={radius}  />
        </g>
    );
};

// Helper function to get the current month name
const getCurrentMonthName = () => {
    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[now.getMonth()];
};

// Main component
const SetterStatistics = () => {
    const [chartData, setChartData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('7 month');
    const { percentage } = useStateContext(); // Access the context
    const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');
  
     // Get the current month name
     const currentMonthName = getCurrentMonthName();

     // Update initial data to include the context percentage value
     const updatedData = initialData.map((item) => 
         item.month === currentMonthName ? { ...item, percentage } : item
     );
 
    // Function to get the data window based on the number of months
    const getChartData = (numMonths) => {
        const totalMonths = updatedData.length;
        const endIndex = totalMonths;  // End index is the last element
        const startIndex = Math.max(totalMonths - numMonths, 0);  // Start index to include the most recent months
        return updatedData.slice(startIndex, endIndex);
        
    };

    // Handle month selection and update chart data
    const handleMonthSelect = (value) => {
        setSelectedValue(value);
        const numMonths = parseInt(value, 10); // Extract number of months from string
        setChartData(getChartData(numMonths));
    };

    // Initialize chart data on component mount
   
     useEffect(() => {
        handleMonthSelect(selectedValue); // Set default data
    }, [percentage]); // Re-run when percentage changes
    return (
        <div className="setter-statistics">
            <div className="setter-statistics-header">
                <h2>Setter Statistics</h2>
                <div className="month-container">
                    <MonthSelect onChange={handleMonthSelect} />
                </div>
            </div>
            <div className="chart-container">
            {isLoading && <p className='statusMsg'>Loading goals...</p>}
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
                        <Bar dataKey="percentage" fill="#0002FF" shape={<RoundedBar />} marginLeft={5}  />
                    </BarChart>
                </ResponsiveContainer>)}
            </div>
        </div>
    );
};

export default SetterStatistics;
to this component or can it do the fetching in the hook like other data  import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/DashboardAPI";
import { useEmail } from './EmailProvider';
import useAxiosFetch from "./useAxiosFetch";
import { useStateContext } from "./ContextProvider";

const GoalContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [goals, setGoals] = useState([]);
    const [goalDescrip, setGoalDescrip] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const { email } = useEmail();
    const { data } = useAxiosFetch('http://localhost:3400/DashboardAPI');
    const { percentage, updatePercentage } = useStateContext();

    const calculatePercentage = (goals) => {
        const totalGoals = goals.length;
        const completedGoals = goals.filter(goal => goal.completed).length;
        return totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0;
    };

    const updatePercentageInDatabase = async (percentage) => {
        // Simulate updating the percentage in the backend
        console.log(`Updating percentage in database to ${percentage}`);
        // Actual API call to update the percentage
        // await api.put('/DashboardAPI/percentage', { percentage });
    };

    const handleSaveGoal = async (selectedValue) => {
        if (selectedGoal) {
            await handleEditGoal(selectedGoal.id, goalDescrip, selectedGoal.completed, selectedValue);
        } else {
            const newId = (goals.length ? Math.max(...goals.map(g => parseInt(g.id, 10))) + 1 : 1).toString();
            const newGoal = { id: newId, email, completed: false, description: goalDescrip, type: selectedValue, percentage: 0 };

            try {
                const response = await api.post('/DashboardAPI', newGoal);
                const addedGoal = response.data;
                const updatedGoals = [...goals, addedGoal];
                const newPercentage = calculatePercentage(updatedGoals);

                // Update the new goal with the calculated percentage
                const updatedGoalWithPercentage = { ...addedGoal, percentage: newPercentage };
                const updatedGoalsWithPercentage = updatedGoals.map(goal =>
                    goal.id === newId ? updatedGoalWithPercentage : goal
                );

                setGoals(updatedGoalsWithPercentage);
                setGoalDescrip('');

                updatePercentage(newPercentage);
                await updatePercentageInDatabase(newPercentage);
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    const toggleGoalCompletion = async (goalId) => {
        const id = goalId.toString();
        const goal = goals.find(goal => goal.id === id);
        if (goal) {
            const updatedGoal = { ...goal, completed: !goal.completed };
            try {
                const response = await api.put(`/DashboardAPI/${id}`, updatedGoal);
                const updatedGoals = goals.map(g =>
                    g.id === id ? response.data : g
                );
                const newPercentage = calculatePercentage(updatedGoals);

                // Update the goal with the new percentage
                const updatedGoalsWithPercentage = updatedGoals.map(goal =>
                    goal.id === id ? { ...goal, percentage: newPercentage } : goal
                );

                setGoals(updatedGoalsWithPercentage);
                updatePercentage(newPercentage);
                await updatePercentageInDatabase(newPercentage);
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    const handleEditGoal = async (goalId, newDescription, newCompleted, selectedValue) => {
        try {
            const id = goalId.toString();
            const updatedGoalData = { type: selectedValue, description: newDescription, completed: newCompleted, email, percentage };
            const response = await api.put(`/DashboardAPI/${id}`, updatedGoalData);
            const updatedGoals = goals.map(goal =>
                goal.id === id ? response.data : goal
            );
            const newPercentage = calculatePercentage(updatedGoals);

            // Update the goal with the new percentage
            const updatedGoalsWithPercentage = updatedGoals.map(goal =>
                goal.id === id ? { ...goal, percentage: newPercentage } : goal
            );

            setGoals(updatedGoalsWithPercentage);
            setGoalDescrip('');
            setSelectedGoal(null);
            updatePercentage(newPercentage);
            await updatePercentageInDatabase(newPercentage);
        } catch (error) {
            console.log(`Error editing goal: ${error.message}`);
        }
    };

    const openGoal = (goalId) => {
        if (goalId == null) {
            setSelectedGoal(null);
            setGoalDescrip('');
        } else {
            const id = goalId.toString();
            const goal = goals.find(goal => goal.id === id);
            setSelectedGoal(goal);
            setGoalDescrip(goal ? goal.description : '');
        }
    };

    useEffect(() => {
        const normalizedData = data.map(goal => ({
            ...goal,
            id: goal.id.toString(),
            percentage: calculatePercentage(data) // Ensure percentage is calculated on initial load
        }));
        setGoals(normalizedData);
        const newPercentage = calculatePercentage(normalizedData);
        updatePercentage(newPercentage);
    }, [data]);

    return (
        <GoalContext.Provider value={{
            goals, goalDescrip, setGoalDescrip, handleSaveGoal,
            toggleGoalCompletion, selectedGoal, openGoal, handleEditGoal, percentage
        }}>
            {children}
        </GoalContext.Provider>
    );
};

export const useGoals = () => useContext(GoalContext);








import { useEffect, useState } from 'react';
import axios from 'axios';
import './teammates.css';
import { useLocation } from 'react-router-dom';
import teammates from '../../../assets/images/teammates 1.svg';
import refreshButton from '../../../assets/images/refreshButton.svg';
import arrowButton from '../../../assets/images/arrowButton.svg';
import MedalOne from '../../../assets/images/first_1.svg';
import Avatar from '../../../assets/images/Avatar.svg';
import MedalTwo from '../../../assets/images/first_2.svg';
import MedalThree from '../../../assets/images/first- 3.svg';
import { useImage } from '../../../hook/EmailProvider';
import { useEmail, useRole } from '../../../hook/EmailProvider';
import useAxiosFetch from '../../../hook/useAxiosFetch';
import MonthSelect from './MonthSelect';
import { useStateContext } from '../../../hook/ContextProvider';


const api1 = axios.create({
    baseURL: 'http://localhost:3400'
});

const api2 = axios.create({
    baseURL: 'http://localhost:3500'
});

const agencyStyles = {
    'DevSyro': {
        agency_color: "#fff",
        color: '#05CD99',
        background: '#05CD991A',
    },
    'Product Syro': {
        agency_color: "#23C1FF",
        color: '#EE5D50',
        background: '#EE5D501A',
    },
    'ArtSyro': {
        agency_color: "#A744FF",
        color: '#FFEB37',
        background: '#FFEB371A',
    },
    'AiSyro': {
        agency_color: "#EE9C50",
        color: '#fff',
        background: '#333',
    },
};

const TeamMates = () => {
    const { image } = useImage();
    const [search, setSearch] = useState('');
    const { email } = useEmail();
    const [teamMates, setTeamMates] = useState([]);
    const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');
    const location = useLocation();
    const isTeamPage = location.pathname === '/admin/team';
    const isQuestionPage = location.pathname === '/admin/question';
    const [selectedValue, setSelectedValue] = useState('All Agencies');
    const [searchResults, setSearchResults] = useState([]);
    const{sendReminder} = useStateContext();
    const{role} = useRole();
    
    const renderQuestionPgae = (role === 'admin' && isQuestionPage);
    const handleSearch = () => {
        const filteredResults = teamMates.filter(teamMate =>
            (teamMate.name && teamMate.name.toLowerCase().includes(search.toLowerCase())) ||
            (teamMate.agency && teamMate.agency.toLowerCase().includes(search.toLowerCase()))
        );
        setSearchResults(filteredResults);
    };

    useEffect(() => {
        handleSearch();
    }, [search,teamMates]);

    const handleAgencySelect = (value) => {
        setSelectedValue(value);
    };

    const filteredTeamMates = selectedValue === 'All Agencies'
        ? searchResults
        : searchResults.filter(teamMate => teamMate.agency === selectedValue);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dashboardResponse, signupResponse] = await Promise.all([
                    api1.get('/DashboardAPI'),
                    api2.get('/SignUpAPI')
                ]);

                const dashboardData = dashboardResponse.data; 
                const signupData = signupResponse.data; 

                const combinedData = signupData.map(signupItem => {
                    const matchingDashboardItem = dashboardData.find(
                        dashboardItem => dashboardItem.email === signupItem.email
                    );
                
                    const agencyStyle = agencyStyles[signupItem.selectedOption2] || {
                        agency_color: '#000',  
                        color: '#000',
                        background: '#0000001A',
                    };
                
                    const profileImage = signupItem.image && signupItem.image.startsWith('blob:')
                        ? signupItem.image
                        : Avatar; 
                
                    return {
                        name: signupItem.name,
                        profile: profileImage,
                        agency: signupItem.selectedOption2,
                        agency_color: agencyStyle.agency_color,
                        color: agencyStyle.color,
                        background: agencyStyle.background,
                        percentage: matchingDashboardItem ? matchingDashboardItem.percentage : 0,
                        email: email,
                    };
                });

                setTeamMates(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [email]);

    const assignMedalOrRank = (index) => {
        if (index === 0) return { type: 'medal', content: MedalOne };
        if (index === 1) return { type: 'medal', content: MedalTwo };
        if (index === 2) return { type: 'medal', content: MedalThree };
        return { type: 'rank', content: index + 1 };
    };

    return (
        <div className='team_mates'>
            {!isTeamPage && (
                <div className="team_mates-header">
                    <div className="team_mates-header-text">
                        <img src={teammates} alt="teammates" />
                        <h2>Team Mates</h2>
                        {role==='admin' && (
                            <div className="team_mates-header-search">
                                <label htmlFor="searchMate">Search Mate</label>
                                <input
                                    type="search"
                                    name="mate" 
                                    id="searchMate"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type='button' onClick={handleSearch}>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_960_9617)">
                                            <path d="M9.47556 0C13.0699 0 16.0002 2.74723 16.0002 6.11689C16.0002 9.48656 13.0699 12.2338 9.47556 12.2338C7.96559 12.2338 6.57368 11.7485 5.46578 10.9363L1.3654 14.7804C1.05309 15.0732 0.546776 15.0732 0.234464 14.7804C-0.0777855 14.4877 -0.0777855 14.013 0.234464 13.7202L4.33484 9.87609C3.46821 8.83772 2.94931 7.53252 2.94931 6.11692C2.94931 2.74726 5.88124 0 9.47556 0ZM9.47556 1.49959C6.74571 1.49959 4.54884 3.55767 4.54884 6.11692C4.54884 8.67615 6.74568 10.7343 9.47556 10.7343C12.2054 10.7343 14.4007 8.67615 14.4007 6.11692C14.4007 3.55767 12.2054 1.49959 9.47556 1.49959Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_960_9617">
                                                <rect width="16" height="15" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button> 
                            </div>
                        )}
                    </div>
                    <div className="team_mates-header-buttons">
                        {role ==='admin' && (
                            <div className="agency_select-container">
                                <MonthSelect onChange={handleAgencySelect} type="team"  />
                            </div>
                        )}
                        <button type='button'>
                            <img src={refreshButton} alt="refreshButton" />
                        </button>
                        {role !=='admin' && (
                            <button type='button'>
                                <img src={arrowButton} alt="arrowButton" />
                            </button>
                        )}
                    </div>
                </div>
            )}
            {isLoading && <p className='statusMsg'>Loading...</p>}
            {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
            {!isLoading && !fetchError && (
                filteredTeamMates.length === 0 ? (
                    <p className='statusMsg'>No match found.</p>
                ) : (
                    <div className="team_mates-mates_container">
                        {filteredTeamMates.map((teamMate, index) => {
                              const medalOrRank = !isQuestionPage ? assignMedalOrRank(index) : '';
                            return (
                                <div className="team_mates-mates_container-feild" key={index}>
                                    <div className="team_mates-mates_container-feild-container">
                                        <div className={`team_mates-mates_container-feild-container-info ${role==='admin' ? 'w_42' : ''}`}>
                                            {medalOrRank.type === 'medal' ? (
                                                <img src={medalOrRank.content} alt="Medal" />
                                            ) : (
                                                <div className="rank-number">{medalOrRank.content}</div>
                                            )}
                                            <div className="team_mates-mates_container-feild-container-info-profile">
                                                <img
                                                    src={image || teamMate.profile}
                                                    alt="profile_image"
                                                    className="pro_img mate"
                                                    style={{ borderColor: teamMate.agency_color }} 
                                                />
                                                <div className='team_mates-mates_container-feild-container-info-profile-name'>
                                                    {teamMate.name}
                                                    <span className='teame_agency' style={{ color: teamMate.agency_color }}>
                                                        {teamMate.agency}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {!isQuestionPage ?
                                        <div
                                            className="team_mates-mates_container-feild-container-percentage"
                                            style={{ backgroundColor: teamMate.background, color: teamMate.color }}
                                        >
                                            {teamMate.percentage}%
                                        </div> : 'button'}
                                        {role ==='admin' && (
                                            <div className="team_mates-mates_container-feild-container-button">
                                                <button type='button' onClick={sendReminder}>Send Reminder</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
        </div>
    );
};

export default TeamMates;


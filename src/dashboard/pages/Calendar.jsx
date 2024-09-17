import React, { useState, useEffect } from 'react';
import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './calendar.css';
import arrowLeft from '../../assets/images/arrowLeft.svg';
import arrowRight from '../../assets/images/arrowRight.svg';
import { useStateContext } from '../../hook/ContextProvider';
import useAxiosFetch from '../../hook/useAxiosFetch';
import api from '../../api/DashboardAPI'; 

const CustomHeader = ({ date, onMoveForward, onMoveBackward }) => (
  <div className="custom-header">
    <div className="month_calendar">
      <span>{date.toLocaleString('default', { month: 'long'  })}</span>
      <div className="header-arrows">
        <button onClick={onMoveBackward} className="arrow-button">
          <img src={arrowLeft} alt="arrowLeft" />
        </button>
        <button onClick={onMoveForward} className="arrow-button">
          <img src={arrowRight} alt="arrowRight" />
        </button>
      </div>
    </div>
    <span className="year">{date.getFullYear()}</span>
  </div>
);

const CalendarC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { percentage } = useStateContext();
  const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const rectangles = [
    { id: 1, top: 200, percentage: 20 },
    { id: 2, top: 300, percentage: 30 },
    { id: 3, top: 400, percentage: 40 },
    { id: 4, top: 500, percentage: 50 },
    { id: 5, top: 600, percentage: 60 },
  ];

  const getWeekNumberInMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const dayOfWeek = firstDayOfMonth.getDay();
    return Math.ceil((dayOfMonth + dayOfWeek) / 7);
  };

  const isCurrentMonthAndYear = (date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  };

  const currentWeekInMonth = getWeekNumberInMonth(selectedDate);
  const weekIndex = currentWeekInMonth - 1;

  const updatedRectangles = rectangles.map((rect, index) => {
    if (isCurrentMonthAndYear(selectedDate) && index === weekIndex) {
      return {
        ...rect,
        percentage: percentage !== undefined ? percentage : rect.percentage,
      };
    }
    return rect;
  });

  useEffect(() => {
    // Apply the 'current-week' class to the appropriate rows
    const rows = document.querySelectorAll('.rs-calendar-table-row');
    rows.forEach((row, index) => {
      row.classList.remove('current-week');
      if (isCurrentMonthAndYear(selectedDate) && index === weekIndex + 1) {
        row.classList.add('current-week');
      }
    });
  }, [selectedDate, updatedRectangles]);

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
    <div className="calendar">
      {isLoading && <p className="statusMsg">Loading...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: 'red' }}>
          {fetchError}
        </p>
      )}
      {!isLoading && !fetchError && (
        <div className="calendar-container">
          <CustomHeader
            date={selectedDate}
            onMoveForward={() => {
              const nextMonth = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
              handleDateChange(nextMonth);
            }}
            onMoveBackward={() => {
              const prevMonth = new Date(selectedDate.setMonth(selectedDate.getMonth() - 1));
              handleDateChange(prevMonth);
            }}
          />
          <Calendar value={selectedDate} onChange={handleDateChange} />

          <div className="rectangle_container">
            {updatedRectangles.map((rect, index) => (
              <div
                key={rect.id}
                className="custom-rectangle"
                style={{
                  top: rect.top,
                  backgroundColor:
                    isCurrentMonthAndYear(selectedDate) && index === weekIndex
                      ? "#0002FE"
                      : undefined,
                }}
              >
                {isCurrentMonthAndYear(selectedDate) && index === weekIndex ? (
                  <div className="custom-rectangle-setter_percentage">
                    This Setter #{rect.id} : {rect.percentage}%
                  </div>
                ) : (
                  <div className="custom-rectangle-setter_percentage">
                    Setter {rect.id} : {rect.percentage}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarC;

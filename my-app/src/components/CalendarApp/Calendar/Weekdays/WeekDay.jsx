import React from 'react';
import "./WeekDay.css"
const WeekDay = ({weekDayArr}) => {
    return (
        <div className="weekdays">
            {weekDayArr.map((day) => <span key={day}>{day}</span>)}
        </div>
    );
};

export default WeekDay;
import React from 'react';
import weekDays from "../../../utils/weekDays";

const WeekDay = () => {
    const weekDayArr = weekDays;
    return (
        <div className="weekdays">
            {weekDayArr.map((day) => <span key={day}>{day}</span>)}
        </div>
    );
};

export default WeekDay;
import React from 'react';
import { useSelector } from "react-redux";
import { selectDaysInMonth, selectFirstDayOfMonth } from "../../../../store/calendarSlice";

const DayGridController = ({ handleDayClick }) => {
    const { currentYear, currentMonth } = useSelector((state) => state.calendar);
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const currentDate = new Date();


    const daysInMonth = useSelector(selectDaysInMonth);
    const firstDayOfMonth = useSelector(selectFirstDayOfMonth);

    return (
        <div className="days">

            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                <span key={`prev-${index}`} className={"no_active"}>
                    {prevMonthDays - firstDayOfMonth + index + 1}
                </span>
            ))}

            {[...Array(daysInMonth).keys()].map((day) => (
                <span
                    key={day + 1}
                    className={
                        day + 1 === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                            ? 'current-day'
                            : ''
                    }
                    onClick={() => handleDayClick(day + 1)}
                >
                    {day + 1}
                </span>
            ))}
        </div>
    );
};

export default DayGridController;

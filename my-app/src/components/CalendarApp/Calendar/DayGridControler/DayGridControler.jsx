import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    setEditingEvent,
    setEventText,
    setEventTime,
    setSelectedDate,
    setShowEventPopup,
} from "../../../../store/eventsSlice";
import { selectDaysInMonth, selectFirstDayOfMonth } from "../../../../store/calendarSlice";

const DayGridController = () => {
    const dispatch = useDispatch();
    const { currentYear, currentMonth } = useSelector((state) => state.calendar);
    const daysInMonth = useSelector(selectDaysInMonth);
    const firstDayOfMonth = useSelector(selectFirstDayOfMonth);
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const currentDate = new Date();

    const handleDayClick = useCallback((day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            dispatch(setSelectedDate(clickedDate));
            dispatch(setShowEventPopup(true));
            dispatch(setEventTime({ hours: '00', minutes: '00' }));
            dispatch(setEventText(''));
            dispatch(setEditingEvent(null));
        }
    }, [dispatch, currentYear, currentMonth]);

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

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

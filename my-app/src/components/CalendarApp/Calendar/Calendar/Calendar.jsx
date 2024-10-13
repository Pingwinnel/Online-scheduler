import React, {useState} from 'react';
import "../../Calendar.css"
import Header from "../Header/Header";
import Controls from "../Controls/Controls";
import DayGridControler from "../DayGridControler/DayGridControler";
import WeekDay from "../Weekdays/WeekDay";


const Calendar = ({
                      currentDate,
                      nextMonthHandler,
                      prevMonthHandler,
                      currentYear, currentMonth,
                      firstDayOfMonth,
                      daysInMonth,
                      handleDayClick,
                  }) => {
    const weekDayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


    return (
        <div className="calendar">
            <Header CurrentMonth={currentMonth} CurrentYear={currentYear} nextMonthHandler={nextMonthHandler} prevMonthHandler={prevMonthHandler}></Header>
            <WeekDay weekDayArr={weekDayArr}></WeekDay>
            <DayGridControler currentYear={currentYear}
                              currentMonth={currentMonth}
                              currentDate={currentDate}
                              firstDayOfMonth={firstDayOfMonth}
                              daysInMonth={daysInMonth}
                              handleDayClick={handleDayClick}
            ></DayGridControler>
        </div>
    );
};

export default Calendar;
import React, {useState} from 'react';
import Calendar from "./Calendar/Calendar/Calendar";
import EventsApp from "./EventSideBar/EventsApp";

const CalendarApp = () => {
    const [today, setToday] = useState();
    const monthsOfYear=["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
const currentDate = new Date();
const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
const daysInMonth=new Date(currentYear,currentMonth+1,0).getDate();
const FirstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
const [selectedDate, setSelectedDate] = useState(currentDate);
const [showEventPopup, setShowEventPopup] = useState(false);


const handleDayClick = (day) => {
    const clikedDate=new Date(currentYear,currentMonth,day);
    const today = new Date();

    if(clikedDate>=today){
        setSelectedDate(clikedDate);
        setShowEventPopup(true);
    }
}



    const prevMonthHandler=()=>{
        setCurrentMonth(prevMonth=>(prevMonth===0 ? 11 :prevMonth-1));
        setCurrentYear(prevYear=>(currentMonth===0 ? prevYear-1:prevYear));
    }
    const nextMonthHandler=()=>{
        setCurrentMonth(prevMonth=>(prevMonth===11 ? 0 :prevMonth+1));
        setCurrentYear(prevYear=>(currentMonth===11 ? prevYear+1:prevYear));
    }


    return (
        <div className={"calendar-app"}>
            <Calendar currentDate={currentDate}
                      nextMonthHandler={nextMonthHandler}
                      prevMonthHandler={prevMonthHandler}
                      currentYear={currentYear}
                      currentMonth={currentMonth+1}
                      firstDayOfMonth={FirstDayOfMonth}
                      daysInMonth={daysInMonth}
                      handleDayClick={handleDayClick}
            ></Calendar>
            <EventsApp showEventPopup={showEventPopup}></EventsApp>
        </div>
    );
};

export default CalendarApp;

import "../../CalendarApp.css"
import Header from "../Header/Header";
import DayGridControler from "../DayGridControler/DayGridControler";
import WeekDay from "../Weekdays/WeekDay";
import weekDays from "../../../utils/weekDays";


const Calendar = ({
                      currentDate,
                      nextMonthHandler,
                      prevMonthHandler,
                      currentYear, currentMonth,
                      firstDayOfMonth,
                      daysInMonth,
                      handleDayClick,
                  }) => {

    const weekDayArr = weekDays;


    return (
        <div className="calendar">
            <Header CurrentMonth={currentMonth}
                    CurrentYear={currentYear}
                    nextMonthHandler={nextMonthHandler}
                    prevMonthHandler={prevMonthHandler}
            ></Header>
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
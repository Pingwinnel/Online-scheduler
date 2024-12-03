
import "../../CalendarApp.css"
import Header from "../Header/Header";
import DayGridControler from "../DayGridControler/DayGridControler";
import WeekDay from "../Weekdays/WeekDay";


const Calendar = () => {


    return (
        <div className="calendar">
            <Header></Header>
            <WeekDay ></WeekDay>
            <DayGridControler></DayGridControler>
        </div>
    );
};

export default Calendar;
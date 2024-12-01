
import "../../CalendarApp.css"
import Header from "../Header/Header";
import DayGridControler from "../DayGridControler/DayGridControler";
import WeekDay from "../Weekdays/WeekDay";
import weekDays from "../../../utils/weekDays";
import {useDispatch} from "react-redux";


const Calendar = ({handleDayClick,}) => {


    return (
        <div className="calendar">
            <Header></Header>
            <WeekDay ></WeekDay>
            <DayGridControler handleDayClick={handleDayClick}></DayGridControler>
        </div>
    );
};

export default Calendar;
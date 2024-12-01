
import Calendar from "./Calendar/Calendar/Calendar";
import EventsApp from "./EventSideBar/EventsApp";
import Login from "../../pages/Login/login";


const CalendarApp = ({handleBackButton}) => {


    const token = localStorage.getItem('token');

    return <>{token ? (
        <><div className={"calendar-app-wrapper"}>
            <div className={"calendar-app"}>
                <Calendar></Calendar>
                <EventsApp></EventsApp>
            </div>
        </div>
        </>
    ) : (
        <Login handleBackButton={handleBackButton} ></Login>
    )}
    </>

};

export default CalendarApp;
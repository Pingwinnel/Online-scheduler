
import Calendar from "./Calendar/Calendar/Calendar";
import EventsApp from "./EventSideBar/EventsApp";
import Login from "../../pages/Login/login";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {fetchCurrentUser} from "../../store/authSlice";



const CalendarApp = ({handleBackButton}) => {


    const token = localStorage.getItem('token');
    const dispatch = useDispatch();


    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(fetchCurrentUser(token));
        }
    }, [dispatch]);



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
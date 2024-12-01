import React, {useCallback, useMemo, useState} from 'react';
import Calendar from "./Calendar/Calendar/Calendar";
import EventsApp from "./EventSideBar/EventsApp";
import monthOfYear from "../utils/monthOfYear";
import {useNavigate} from "react-router-dom";
import Login from "../../pages/Login/login";
import {useDispatch, useSelector} from "react-redux";

const CalendarApp = ({handleBackButton}) => {
    const { currentMonth, currentYear} = useSelector((state) => state.calendar);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventTime, setEventTime] = useState({hours: '00', minutes: '00'});
    const [eventText, setEventText] = useState("");
    const [editingEvent, setEditingEvent] = useState(null);



    const handleDayClick = useCallback((day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();
    
        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate);
            setShowEventPopup(true);
            setEventTime({ hours: '00', minutes: '00' });
            setEventText('');
            setEditingEvent(null);
        }
    }, [currentYear, currentMonth]);
    
    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        )
    }

    const handleEventSubmit = useCallback(() => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
            text: eventText,
        };
    
        let updatedEvents = [...events];
        if (editingEvent) {
            updatedEvents = updatedEvents.map(event =>
                event.id === editingEvent.id ? newEvent : event
            );
        } else {
            updatedEvents.push(newEvent);
        }
    
        setEvents(updatedEvents);
        setEventText("");
        setEventTime({ hours: '00', minutes: '00' });
        setShowEventPopup(false);
        setEditingEvent(null);
    }, [editingEvent, selectedDate, eventTime, eventText, events]);
    
    const handleEditEvent = useCallback((event) => {
        setSelectedDate(new Date(event.date));
        setEventTime({
            hours: event.time.split(':')[0].trim(),
            minutes: event.time.split(':')[1].trim(),
        });
        setEventText(event.text);
        setEditingEvent(event);
        setShowEventPopup(true);
    }, []);
    

    const handleDeleteEvent = useCallback((eventId) => {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
    }, [events]);
    
    const handleTimeChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEventTime((prevTime) => ({...prevTime, [name]: value.padStart(2, '0')}));
    }

    const token = localStorage.getItem('token');

    return <>{token ? (
        <><div className={"calendar-app-wrapper"}>
            <div className={"calendar-app"}>
                <Calendar handleDayClick={handleDayClick}></Calendar>
                <EventsApp eventTime={eventTime}
                           eventText={eventText}
                           setEventText={setEventText}
                           setEventTime={setEventTime}
                           showEventPopup={showEventPopup}
                           setShowEventPopup={setShowEventPopup}
                           handleEventSubmit={handleEventSubmit}
                           events={events}
                           handleEditEvent={handleEditEvent}
                           editingEvent={editingEvent}
                           handleDeleteEvent={handleDeleteEvent}
                           handleTimeChange={handleTimeChange}
                ></EventsApp>
            </div>
        </div>
        </>
    ) : (
        <Login handleBackButton={handleBackButton} ></Login>
    )}
    </>

};

export default CalendarApp;
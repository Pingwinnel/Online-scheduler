import React, {useMemo, useState} from 'react';
import Calendar from "./Calendar/Calendar/Calendar";
import EventsApp from "./EventSideBar/EventsApp";
import monthOfYear from "../utils/monthOfYear";

const CalendarApp = () => {
    const [today, setToday] = useState();
    const monthsOfYear = monthOfYear
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventTime, setEventTime] = useState({hours: '00', minutes: '00'});
    const [eventText, setEventText] = useState("");
    const [editingEvent, setEditingEvent] = useState(null);




    const daysInMonth = useMemo(() => {
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    }, [currentYear, currentMonth])

    const FirstDayOfMonth = useMemo(() => {
        return (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7
    }, [currentYear, currentMonth]);


    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [events]);

    const handleDayClick = (day) => {
        const clikedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if (clikedDate >= today
            ||
            isSameDay(clikedDate, today)) {
            setSelectedDate(clikedDate);
            setShowEventPopup(true);
            setEventTime({hours: '00', minutes: '00'});
            setEventText('')
            setEditingEvent(null)
        }
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        )
    }

    const handleEventSubmit = () => {
        const newEvent = {
            id: editingEvent ?
                editingEvent.id
                :
                Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, '0')}:
            ${eventTime.minutes.padStart(2, '0')}`,
            text: eventText,
        }

        let updatedEvents = [...events]

        if (editingEvent) {
            updatedEvents = updatedEvents.map((event) =>
                event.id === editingEvent.id ? newEvent : event
            )

        } else {
            updatedEvents.push(newEvent)
        }

        setEvents(updatedEvents);
        setEventText("")
        setEventTime({hours: '00', minutes: '00'});
        setShowEventPopup(false)
        setEditingEvent(null)
    }


    const handleEditEvent = (event) => {
        setSelectedDate(new Date(event.date))
        setEventTime({
            hours: event.time.split(':').map(part => part.trim())[0],
            minutes: event.time.split(':').map(part => part.trim())[1],
        });
        setEventText(event.text);
        setEditingEvent(event)
        setShowEventPopup(true)
    }


    const prevMonthHandler = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ?
            11
            :
            prevMonth - 1));
        setCurrentYear(prevYear => (currentMonth === 0 ?
            prevYear - 1
            :
            prevYear));
    }
    const nextMonthHandler = () => {
        setCurrentMonth(prevMonth => (prevMonth === 11 ?
            0
            :
            prevMonth + 1));
        setCurrentYear(prevYear => (currentMonth === 11 ?
            prevYear + 1
            :
            prevYear));
    }

    const handleDeleteEvent = (eventId) => {
        const updateEvents = events.filter(event => event.id !== eventId);
        setEvents(updateEvents);
    }

    const handleTimeChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEventTime((prevTime) => ({...prevTime, [name]: value.padStart(2, '0')}));
    }


    return (
        <div className={"calendar-app"}>
            <Calendar currentDate={currentDate}
                      nextMonthHandler={nextMonthHandler}
                      prevMonthHandler={prevMonthHandler}
                      currentYear={currentYear}
                      currentMonth={currentMonth + 1}
                      firstDayOfMonth={FirstDayOfMonth}
                      daysInMonth={daysInMonth}
                      handleDayClick={handleDayClick}
            ></Calendar>
            <EventsApp eventTime={eventTime}
                       eventText={eventText}
                       setEventText={setEventText}
                       setEventTime={setEventTime}
                       showEventPopup={showEventPopup}
                       setShowEventPopup={setShowEventPopup}
                       handleEventSubmit={handleEventSubmit}
                       events={events}
                       monthsOfYear={monthsOfYear}
                       handleEditEvent={handleEditEvent}
                       editingEvent={editingEvent}
                       handleDeleteEvent={handleDeleteEvent}
                       handleTimeChange={handleTimeChange}
            ></EventsApp>
        </div>
    );
};

export default CalendarApp;
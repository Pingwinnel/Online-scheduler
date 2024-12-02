import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    setEditingEvent,
    setEvents,
    setEventText,
    setEventTime,
    setShowEventPopup
} from "../../../../store/eventsSlice";

const EventPopup = () => {
    const dispatch = useDispatch();
    const { selectedDate, eventTime, editingEvent, eventText, events } = useSelector(state => state.events);

    const handleTimeChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        dispatch(setEventTime({ ...eventTime, [name]: value.padStart(2, '0') }));
    };

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

        dispatch(setEvents(updatedEvents));
        dispatch(setEventText(""));
        dispatch(setEventTime({ hours: '00', minutes: '00' }));
        dispatch(setShowEventPopup(false));
        dispatch(setEditingEvent(null));
    }, [dispatch, editingEvent, selectedDate, eventTime, eventText, events]);

    return (
        <div className="event-popup">
            <div className="time-input">
                <div className="event-popup-time">Time</div>
                <input
                    type="number"
                    name="hours"
                    min={0}
                    max={24}
                    className="hours"
                    value={eventTime.hours}
                    onChange={handleTimeChange}
                />
                <input
                    type="number"
                    name="minutes"
                    min={0}
                    max={60}
                    className="minutes"
                    value={eventTime.minutes}
                    onChange={handleTimeChange}
                />
            </div>
            <textarea
                placeholder="Enter Event Text (Maximum 60 Characters)"
                value={eventText}
                onChange={(e) => {
                    if (e.target.value.length <= 60) {
                        dispatch(setEventText(e.target.value));
                    }
                }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
                {editingEvent ? "Update Event" : "Add Event"}
            </button>
            <button
                className="close-event-popup"
                onClick={() => dispatch(setShowEventPopup(false))}
            >
                <i className="bx bx-x"></i>
            </button>
        </div>
    );
};

export default EventPopup;

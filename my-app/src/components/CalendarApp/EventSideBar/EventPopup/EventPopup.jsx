import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    addEventToDB, fetchUserEvents,
    setEditingEvent,
    setEventText,
    setEventTime,
    setShowEventPopup, updateEventInDB
} from "../../../../store/eventsSlice";

const EventPopup = () => {
    const dispatch = useDispatch();
    const { selectedDate, eventTime, editingEvent, eventText } = useSelector(state => state.events);

    const handleTimeChange = (e) => {
        const { name, value } = e.target;

        let intValue = parseInt(value, 10);

        if (name === "hours") {
            intValue = Math.max(0, Math.min(23, intValue));
        } else if (name === "minutes") {
            intValue = Math.max(0, Math.min(59, intValue));
        }

        dispatch(setEventTime({
            ...eventTime,
            [name]: intValue.toString().padStart(2, '0'),
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!value) {
            dispatch(setEventTime({
                ...eventTime,
                [name]: "00",
            }));
        }
    };

    const currentUser = useSelector((state) => state.auth.currentUser);

    const handleEventSubmit = useCallback(() => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : uuidv4(),
            userId: currentUser.id,
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
            text: eventText,
            events: []
        };

        if (editingEvent) {
            dispatch(updateEventInDB(newEvent));
        } else {
            dispatch(addEventToDB(newEvent))
        }

        dispatch(setShowEventPopup(false));
    }, [dispatch, currentUser, selectedDate, eventTime, eventText, editingEvent]);


    return (
        <div className="event-popup">
            <div className="time-input">
                <div className="event-popup-time">Time</div>
                <input
                    type="number"
                    name="hours"
                    min={0}
                    max={23}
                    maxLength={2}
                    step={1}
                    className="hours"
                    value={eventTime.hours}
                    onChange={handleTimeChange}
                    onBlur={handleBlur}
                />
                <input
                    type="number"
                    name="minutes"
                    min={0}
                    max={59}
                    maxLength={2}
                    step={1}
                    className="minutes"
                    value={eventTime.minutes}
                    onChange={handleTimeChange}
                    onBlur={handleBlur}
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

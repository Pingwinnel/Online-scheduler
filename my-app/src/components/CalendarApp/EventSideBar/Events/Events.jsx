import React from 'react';
import monthOfYear from "../../../utils/monthOfYear";
import {useDispatch, useSelector} from "react-redux";
import {DeleteEvent, handleEditEvent} from "../../../../store/eventsSlice";

const Events = () => {

    const monthsOfYear = monthOfYear
    const dispatch = useDispatch();
    const events=useSelector((state) => state.events.events);

    return (
        <>
            {
                events.map((event, index) => (
                    <div className="event" key={index}>
                        <div className="event-date-wrapper">
                            <div className="event-date">{`
                                ${monthsOfYear[event.date.getMonth()]}
                                ${event.date.getDate()},
                                ${event.date.getFullYear()}`}
                            </div>
                            <div className="event-time">{event.time}</div>
                        </div>
                        <div className={`event-text`}>{event.text}</div>
                        <div className="event-buttons">
                            <i className="bx bx-edit-alt"
                               onClick={() => dispatch(handleEditEvent(event))}></i>
                            <i className="bx bx-message-alt-x"
                               onClick={() => dispatch(DeleteEvent(event.id))}></i>
                        </div>
                    </div>
                ))
            }
        </>)
};

export default Events;
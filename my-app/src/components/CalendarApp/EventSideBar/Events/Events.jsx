import React from 'react';

const Events = ({
                    events,
                    monthsOfYear,
                    handleEditEvent,
                    handleDeleteEvent
                }) => {
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
                               onClick={() => handleEditEvent(event)}></i>
                            <i className="bx bx-message-alt-x"
                               onClick={() => handleDeleteEvent(event.id)}></i>
                        </div>
                    </div>
                ))
            }
        </>)
};

export default Events;
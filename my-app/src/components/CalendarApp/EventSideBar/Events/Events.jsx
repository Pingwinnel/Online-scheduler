import React from 'react';

const Events = () => {
    return (
        <div className="event">
            <div className="event-date-wrapper">
                <div className="event-date">May 15,2024</div>
                <div className="event-time">10:00</div>
            </div>
            <div className="event-text">Meeting with Friends</div>
            <div className="event-buttons">
                <i className="bx bx-edit-alt"></i>
                <i className="bx bx-message-alt-x"></i>
            </div>
        </div>
    );
};

export default Events;
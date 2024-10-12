import React from 'react';

const EventPopup = () => {
    return (
        <div className="event-popup">
            <div className="time-input">
                <div className="event-popup-time">Time</div>
                <input type={'number'} name={'hours'} min={0} max={24} className={'hours'}/>
                <input type={'number'} name={'hours'} min={0} max={60} className={'minutes'}/>
            </div>
            <textarea placeholder={"Enter Event Text (Maximum 60 Characters"}></textarea>
            <button className={'event-popup-btn'}>Add Event</button>
            <button className="close-event-popup"><i className="bx bx-x"></i></button>
        </div>
    );
};

export default EventPopup;
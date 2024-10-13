import React from 'react';

const EventPopup = ({
                        setShowEventPopup,
                        eventTime,
                        setEventTime,
                        eventText,
                        setEventText,
                        handleEventSubmit,
                        editingEvent,
                    }) => {
    return (
        <div className="event-popup">
            <div className="time-input">
                <div className="event-popup-time">Time</div>
                <input type={'number'}
                       name={'hours'}
                       min={0}
                       max={24}
                       className={'hours'}
                       value={eventTime.hours}
                       onChange={(e) =>
                           setEventTime({
                               ...eventTime,
                               hours: e.target.value
                           })}
                />
                <input type={'number'}
                       name={'minutes'}
                       min={0}
                       max={60}
                       className={'minutes'}
                       value={eventTime.minutes}
                       onChange={(e) =>
                           setEventTime({
                               ...eventTime,
                               minutes: e.target.value
                           })}
                />
            </div>
            <textarea placeholder={"Enter Event Text (Maximum 60 Characters"}
                      value={eventText}
                      onChange={(e) => {
                          setEventText(e.target.value)
                      }
                      }></textarea>
            <button className={'event-popup-btn'} onClick={handleEventSubmit}>
                {editingEvent ? "Update Event" : "Add Event"}
            </button>
            <button className="close-event-popup"
                    onClick={() => setShowEventPopup(false)}>
                <i className="bx bx-x"></i>
            </button>
        </div>
    );
};

export default EventPopup;
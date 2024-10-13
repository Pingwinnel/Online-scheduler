import React from 'react';
import EventPopup from "./EventPopup/EventPopup";
import Events from "./Events/Events";

const EventsApp = ({
                       showEventPopup,
                       setShowEventPopup,
                       eventTime,
                       setEventTime,
                       eventText,
                       setEventText,
                       handleEventSubmit,
                       events,
                       handleEditEvent,
                       editingEvent,
                       handleDeleteEvent,
                       monthsOfYear,
                   }) => {
    return (
        <div className="events">
            {showEventPopup && <EventPopup eventText={eventText}
                                           setEventText={setEventText}
                                           setEventTime={setEventTime}
                                           eventTime={eventTime}
                                           setShowEventPopup={setShowEventPopup}
                                           handleEventSubmit={handleEventSubmit}
                                           editingEvent={editingEvent}
            ></EventPopup>}
            <Events events={events} monthsOfYear={monthsOfYear} handleEditEvent={handleEditEvent}
                    handleDeleteEvent={handleDeleteEvent}></Events>

        </div>
    );
};

export default EventsApp;
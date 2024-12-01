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
                       handleTimeChange,
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
                                           handleTimeChange={handleTimeChange}
            ></EventPopup>}
            <Events events={events}
                    handleEditEvent={handleEditEvent}
                    handleDeleteEvent={handleDeleteEvent}
                    setEventText={setEventText}
            ></Events>

        </div>
    );
};

export default EventsApp;
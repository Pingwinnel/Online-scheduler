import React from 'react';
import EventPopup from "./EventPopup/EventPopup";
import Events from "./Events/Events";

const EventsApp = ({showEventPopup}) => {
    return (
        <div className="events">
            {showEventPopup && <EventPopup></EventPopup>}
                <Events></Events>

        </div>
    );
};

export default EventsApp;
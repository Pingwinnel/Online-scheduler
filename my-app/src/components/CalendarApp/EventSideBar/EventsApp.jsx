import React, {useState} from 'react';
import EventPopup from "./EventPopup/EventPopup";
import Events from "./Events/Events";
import {useSelector} from "react-redux";

const EventsApp = () => {
    const {showEventPopup}=useSelector(state => state.events);
    return (
        <div className="events">
            {showEventPopup && <EventPopup></EventPopup>}
            <Events></Events>

        </div>
    );
};

export default EventsApp;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents, deleteEventFromDB, updateEventInDB } from "../../../../store/eventsSlice";
import { handleEditEvent } from "../../../../store/eventsSlice";
import monthsOfYear from "../../../utils/monthOfYear";
import FriendsList from "../../../../pages/FriendsList/FriendList";

const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.events || []);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [showModal, setShowModal] = useState(false);  // Control modal visibility

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUserEvents(currentUser.id));
        }
    }, [dispatch, currentUser]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    if (!events.length) return <div className="no-event__message">No events available</div>;

    return (
        <> {showModal && (<div className={"modal"}>
            <FriendsList event={events[0]} showModal={showModal} closeModal={closeModal} /></div>
        )}
            {events.map((event) => {
                if (!event || !event.date) return null;

                const eventDate = new Date(event.date);

                return (
                    <div className="event" key={event.id}>
                        <div className="event-date-wrapper">
                            <div className="event-date">
                                {`${monthsOfYear[eventDate.getMonth()]} ${eventDate.getDate()}, ${eventDate.getFullYear()}`}
                            </div>
                            <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-text">{event.text}</div>
                        <div className="event-buttons">
                            <i className="bx bx-edit-alt" onClick={() => dispatch(handleEditEvent(event))}></i>
                            <i className="bx bx-message-alt-x" onClick={() => dispatch(deleteEventFromDB(event))}></i>
                            <button onClick={openModal} className="friendlist__button">
                                Add to Friends
                            </button>
                        </div>
                    </div>
                );
            })}

        </>
    );
};

export default Events;

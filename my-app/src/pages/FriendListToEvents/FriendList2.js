import React, { useState, useEffect } from 'react';
import './FriendList.css';

const FriendsList = ({ event, handleBackButton, showModal, closeModal }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            const loggedInUser = data.find(user => user.token === token);
            setCurrentUser(loggedInUser);
        };
        fetchCurrentUser();
    }, [token]);

    const handleAddEventToFriend = async () => {
        if (currentUser && selectedFriend) {
            const friendEvents = selectedFriend.events || [];
            const eventExists = friendEvents.some((e) => e.id === event.id);
            if (eventExists) {
                alert("This event is already added to this friend's events.");
                return;
            }

            const updatedFriend = {
                ...selectedFriend,
                events: [...friendEvents, event]
            };

            const response = await fetch(`http://localhost:5000/users/${selectedFriend.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ events: updatedFriend.events }),
            });

            if (response.ok) {
                const updatedCurrentUser = {
                    ...currentUser,
                    friends: currentUser.friends.map((friend) =>
                        friend.id === selectedFriend.id ? updatedFriend : friend
                    ),
                };
                setCurrentUser(updatedCurrentUser);
                alert(`Event added to ${selectedFriend.username}'s events`);
            } else {
                alert("Error updating the friend's events");
            }
        }
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        // Modal Container (backdrop)
        showModal && (
            <div className="modal-background" onClick={closeModal}>
                <div className="cont__friendlist" onClick={(e) => e.stopPropagation()}>
                    <h2 className="friendlist__title">Your Friends</h2>
                    <ul className="friendlist__list">
                        {currentUser.friends.length === 0 ? (
                            <li className="friendlist__listItem">No friends yet</li>
                        ) : (
                            currentUser.friends.map((friend) => (
                                <li className="friendlist__listItem" key={friend.id}>
                                    {friend.username}
                                    <input
                                        type="radio"
                                        name="friend"
                                        value={friend.id}
                                        onChange={() => setSelectedFriend(friend)}
                                    />
                                </li>
                            ))
                        )}
                    </ul>
                    <button className="friendlist__button" onClick={handleBackButton}>Назад</button>
                    {selectedFriend && (
                        <button className="friendlist__button" onClick={handleAddEventToFriend}>
                            Add Event to {selectedFriend.username}
                        </button>
                    )}
                </div>
            </div>
        )
    );
};

export default FriendsList;

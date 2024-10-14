import React, { useState, useEffect } from 'react';

const UsersList = ({handleBackButton}) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            const loggedInUser = data.find(user => user.token === token);
            setCurrentUser(loggedInUser);
            setUsers(data.filter(user => user.id !== loggedInUser.id));
        };

        fetchUsers();
    }, [token]);

    const handleAddFriend = async (friend) => {
        if (currentUser) {
            const updatedFriends = [...currentUser.friends, { id: friend.id, username: friend.username }];
            await fetch(`http://localhost:5000/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friends: updatedFriends }),
            });

            const friendUpdatedFriends = [...friend.friends, { id: currentUser.id, username: currentUser.username }];

            await fetch(`http://localhost:5000/users/${friend.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friends: friendUpdatedFriends }),
            });

            setCurrentUser({ ...currentUser, friends: updatedFriends });
        }
    };


    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        {currentUser && currentUser.friends.some(friend => friend.id === user.id) ? (
                            <span> (Добавлен)</span>
                        ) : (
                            <button onClick={() => handleAddFriend(user)}>Add Friend</button>
                        )}
                    </li>
                ))}
                <button className={"back_button"} onClick={handleBackButton}>Назад</button>
            </ul>
        </div>
    );
};

export default UsersList;
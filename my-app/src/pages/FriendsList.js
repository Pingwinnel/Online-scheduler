import React, { useState, useEffect } from 'react';

const FriendsList = () => {
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleRemoveFriend = async (friendId) => {
    if (currentUser) {
      const updatedFriends = currentUser.friends.filter(friend => friend.id !== friendId);
  
      await fetch(`http://localhost:5000/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friends: updatedFriends }),
      });
  
      const response = await fetch(`http://localhost:5000/users/${friendId}`);
      const friend = await response.json();
  
      const friendUpdatedFriends = friend.friends.filter(friend => friend.id !== currentUser.id);
  
      await fetch(`http://localhost:5000/users/${friendId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friends: friendUpdatedFriends }),
      });
  
      setCurrentUser({ ...currentUser, friends: updatedFriends });
    }
  };
  

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {currentUser.friends.length === 0 ? (
          <li>No friends yet</li>
        ) : (
          currentUser.friends.map(friend => (
            <li key={friend.id}>
              {friend.username}
              <button onClick={() => handleRemoveFriend(friend.id)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FriendsList;

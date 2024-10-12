import React, { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      const loggedInUser = data.find(user => user.token === token);
      
      // Устанавливаем текущего пользователя и фильтруем его из списка
      setCurrentUser(loggedInUser);
      setUsers(data.filter(user => user.id !== loggedInUser.id));
    };

    fetchUsers();
  }, [token]);

  const handleAddFriend = async (friend) => {
    if (currentUser) {
      const updatedFriends = [...currentUser.friends, { id: friend.id, username: friend.username }];
  
      // Обновляем список друзей текущего пользователя
      await fetch(`http://localhost:5000/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friends: updatedFriends }),
      });
  
      // Обновляем список друзей для другого пользователя (делаем дружбу взаимной)
      const friendUpdatedFriends = [...friend.friends, { id: currentUser.id, username: currentUser.username }];
  
      await fetch(`http://localhost:5000/users/${friend.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friends: friendUpdatedFriends }),
      });
  
      // Обновляем состояние текущего пользователя
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
              <span> (Добавлен)</span> // Если друг уже добавлен, показываем "Добавлен"
            ) : (
              <button onClick={() => handleAddFriend(user)}>Add Friend</button> // Иначе кнопка "Add Friend"
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

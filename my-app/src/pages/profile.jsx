import React from 'react';

const Profile = ({ user }) => {
   

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;

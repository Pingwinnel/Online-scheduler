import React from 'react';

const Notifications = ({ notifications, onAccept, onDecline }) => {
  return (
    <div>
      <h2>Уведомления</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            Запрос от пользователя с ID: {notification.from}
            <button onClick={() => onAccept(notification.from)}>Принять</button>
            <button onClick={() => onDecline(notification.from)}>Отклонить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

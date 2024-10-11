const mockLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'testuser' && password === 'password123') {
          resolve({ success: true, token: 'mockToken' });
        } else {
          reject({ success: false, message: 'Неверные данные' });
        }
      }, 1000);
    });
  };
  
  export default mockLogin;
  
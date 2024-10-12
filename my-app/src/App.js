import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from '././pages/login';
import UsersList from './pages/UsersList'
import ProtectedRoute from './service/ProtectedRoute';
import Home from './pages/Home';
import FriendsList from './pages/FriendsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        } />
         <Route path="/friends" element={
          <ProtectedRoute>
            <FriendsList />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
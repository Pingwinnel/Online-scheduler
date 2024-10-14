import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from '././pages/Login/login';
import UsersList from './pages/UserList'
import ProtectedRoute from './service/ProtectedRoute';
import Home from './pages/Home/Home';
import FriendsList from './pages/FriendList';
import CalendarApp from "./components/CalendarApp/Calendar_App";
import Calendar_App from "./components/CalendarApp/Calendar_App";


const handleBackButton = () => {
    window.history.back();
}


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Calendar_App handleBackButton={handleBackButton}/>}/>
                <Route path="/register" element={<Register handleBackButton={handleBackButton}/>}/>
                <Route path="/login" element={<Login handleBackButton={handleBackButton}/>}/>
                <Route path="/users" element={
                    <ProtectedRoute>
                        <UsersList handleBackButton={handleBackButton}/>
                    </ProtectedRoute>
                }/>
                <Route path="/friends" element={
                    <ProtectedRoute>
                        <FriendsList handleBackButton={handleBackButton}/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </Router>
    );
}

export default App;

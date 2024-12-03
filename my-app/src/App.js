import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes ,useLocation} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from '././pages/Login/login';
import UsersList from './pages/UserList'
import ProtectedRoute from './service/ProtectedRoute';
import Home from './pages/Home/Home';
import FriendsList from './pages/FriendsList/FriendList';
import CalendarApp from "./components/CalendarApp/CalendarApp";
import Header from './components/Header/Header';
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentUser} from "./store/authSlice";

const handleBackButton = () => {
    window.history.back();
}


const Layout = ({ children }) => {
    const location = useLocation();
    const hideHeaderPaths = ["/login", "/register"];

    return (
        <>
            {!hideHeaderPaths.includes(location.pathname) && <Header />}
            {children}
        </>
    );
};






function App() {
    return (
        <Router>
            <Layout>
            <Routes>
                <Route path="/" element={<Home handleBackButton={handleBackButton}/>}/>
                <Route path="/calendar" element={
                    <CalendarApp handleBackButton={handleBackButton}/>
                    }/>
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
            </Layout>
        </Router>
    );
}

export default App;

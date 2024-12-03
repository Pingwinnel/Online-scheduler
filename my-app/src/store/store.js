import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import eventsReducer from "./eventsSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        events: eventsReducer,
        auth: authReducer,
    },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import eventsReducer from "./eventsSlice";

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        events: eventsReducer,
    },
});

export default store;

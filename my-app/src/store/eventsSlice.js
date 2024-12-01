import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
        eventTime: { hours: '00', minutes: '00' },
        eventText: "",
        showEventPopup: false,
        editingEvent: null,
        selectedDate: new Date(),
    },
    reducers: {
        setEventTime: (state, action) => {
            state.eventTime = action.payload;
        },
        setEventText: (state, action) => {
            state.eventText = action.payload;
        },
        setShowEventPopup: (state, action) => {
            state.showEventPopup = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setEditingEvent: (state, action) => {
            state.editingEvent = action.payload;
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        DeleteEvent: (state, action) => {
            const updatedEvents = state.events.filter(event => event.id !== action.payload);
            state.events = updatedEvents;
        },
        handleEditEvent: (state, action) => {
            const event = action.payload;
            state.selectedDate = new Date(event.date);
            state.eventTime = {
                hours: event.time.split(':')[0].trim(),
                minutes: event.time.split(':')[1].trim(),
            };
            state.eventText = event.text;
            state.editingEvent = event;
            state.showEventPopup = true;
        },
    },
});

export const {
    handleEditEvent,
    DeleteEvent,
    setEvents,
    setEditingEvent,
    setEventText,
    setEventTime,
    setShowEventPopup,
    setSelectedDate,
} = eventSlice.actions;

export default eventSlice.reducer;

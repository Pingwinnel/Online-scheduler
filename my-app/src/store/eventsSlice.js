import {createSlice} from "@reduxjs/toolkit";

const eventSlice=createSlice({
    name: "events",
    initialState: {
        events: [],
        eventTime:{hours: '00', minutes: '00'},
        eventText:"",
        showEventPopup:false,
        editingEvent:null,
    },
    reducers: {
        setEventTime: (state, action) => {
            state.eventTime = action.payload;
        },
        setEventText: (state, action) => {
            state.eventText = action.payload;
        },
        setShowEventPopup: (state, showEventPopup) => {
            state.showEventPopup = showEventPopup;
        },
        



    }
})

export const {} = eventSlice.actions;

export default eventSlice.reducer;
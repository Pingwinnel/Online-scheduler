        import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
        import { v4 as uuidv4 } from 'uuid';

        export const fetchUserEvents = createAsyncThunk(
            "events/fetchUserEvents",
            async (userId) => {
                const response = await fetch(`http://localhost:5000/users/${userId}`);
                const user = await response.json();
                return user.events;  // Return the user's events
            }
        );



        export const addEventToDB = createAsyncThunk(
            "events/addEventToDB",
            async (newEvent) => {
                // Fetch the user from the backend
                const response = await fetch(`http://localhost:5000/users/${newEvent.userId}`);
                const user = await response.json();

                // Append the new event to the user's events array
                const updatedEvents = [...user.events, newEvent];

                // Send the updated events array back to the backend
                const updateResponse = await fetch(`http://localhost:5000/users/${newEvent.userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ events: updatedEvents })  // Update the user's events array
                });

                const updatedUser = await updateResponse.json();
                return updatedUser.events;  // Return the updated events array
            }
        );



        export const updateEventInDB = createAsyncThunk(
            "events/updateEventInDB",
            async (updatedEvent) => {
                // Fetch the user first
                const response = await fetch(`http://localhost:5000/users/${updatedEvent.userId}`);
                const user = await response.json();

                // Update the event in the user's events array
                const updatedEvents = user.events.map(event =>
                    event.id === updatedEvent.id ? updatedEvent : event  // Update the specific event
                );

                // Send the updated events array back to the backend
                const updateResponse = await fetch(`http://localhost:5000/users/${updatedEvent.userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ events: updatedEvents })  // Update the user's events array
                });

                const updatedUser = await updateResponse.json();

                // Return the updated events array, which will be used in the reducer
                return updatedUser.events;  // Return the updated events array
            }
        );





        export const deleteEventFromDB = createAsyncThunk(
            "events/deleteEventFromDB",
            async (event) => {
                const response = await fetch(`http://localhost:5000/users/${event.userId}`);
                const user = await response.json();

                // Remove the event from the user's events array
                const updatedEvents = user.events.filter((e) => e.id !== event.id);

                const updateResponse = await fetch(`http://localhost:5000/users/${event.userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        events: updatedEvents,
                    }),
                });

                const updatedUser = await updateResponse.json();

                // Return the updated events array to be used in the reducer
                return updatedUser.events;
            }
        );



        const eventSlice = createSlice({
            name: "events",
            initialState: {
                events: [],
                eventTime: { hours: '00', minutes: '00' },
                eventText: "",
                showEventPopup: false,
                editingEvent: null,
                selectedDate: new Date(),
                status: "idle",
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
            extraReducers: (builder) => {
                builder
                    .addCase(fetchUserEvents.fulfilled, (state, action) => {
                        state.events = action.payload;  // Update with the fetched user's events
                    })
                    .addCase(addEventToDB.fulfilled, (state, action) => {
                        state.events = action.payload;  // Set the updated events array
                    })
                    .addCase(updateEventInDB.fulfilled, (state, action) => {
                        // Replace the old events list with the updated one
                        state.events = action.payload;  // Set the updated events array
                    })
                    .addCase(deleteEventFromDB.fulfilled, (state, action) => {
                        state.events = action.payload;  // Set the updated events array after deletion
                    });
            },
        });

        export const {
            setEventTime,
            setEventText,
            setShowEventPopup,
            setSelectedDate,
            setEditingEvent,
            handleEditEvent,
        } = eventSlice.actions;

        export default eventSlice.reducer;

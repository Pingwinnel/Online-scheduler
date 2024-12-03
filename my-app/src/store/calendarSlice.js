import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        prevMonthHandler: (state) => {
            if (state.currentMonth === 0) {
                state.currentMonth = 11;
                state.currentYear -= 1;
            } else {
                state.currentMonth -= 1;
            }
        },
        nextMonthHandler: (state) => {
            if (state.currentMonth === 11) {
                state.currentMonth = 0;
                state.currentYear += 1;
            } else {
                state.currentMonth += 1;
            }
        },
    },
});

export const { prevMonthHandler, nextMonthHandler } = calendarSlice.actions;


export const selectDaysInMonth = (state) => {
    const { currentYear, currentMonth } = state.calendar;
    return new Date(currentYear, currentMonth + 1, 0).getDate();
};

export const selectFirstDayOfMonth = (state) => {
    const { currentYear, currentMonth } = state.calendar;
    return (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
};

export default calendarSlice.reducer;

import eventsReducer, { setEventText, setShowEventPopup } from "../store/eventsSlice";

describe("eventsSlice Reducer", () => {
    const expectedSelectedDate = new Date();

    const initialState = {
        events: [],
        eventTime: { hours: "00", minutes: "00" },
        eventText: "",
        showEventPopup: false,
        editingEvent: null,
        selectedDate: expectedSelectedDate,
    };

    test("should return the initial state", () => {
        const result = eventsReducer(undefined, {});

        // Compare the result's selectedDate within a larger time range (1 second)
        const timeDifference = Math.abs(result.selectedDate - expectedSelectedDate);
        const allowedRange = 1000; // 1 minute range

        expect(timeDifference).toBeLessThanOrEqual(allowedRange);
        expect(result.eventTime).toEqual(initialState.eventTime);
        expect(result.eventText).toEqual(initialState.eventText);
    });

    test("should handle setEventText", () => {
        const action = setEventText("Test Event");
        const state = eventsReducer(initialState, action);
        expect(state.eventText).toEqual("Test Event");
    });

    test("should handle setShowEventPopup", () => {
        const action = setShowEventPopup(true);
        const state = eventsReducer(initialState, action);
        expect(state.showEventPopup).toBe(true);
    });
});

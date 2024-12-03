import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EventPopup from "../components/CalendarApp/EventSideBar/EventPopup/EventPopup";

const mockStore = configureStore([]);

describe("EventPopup Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            events: {
                selectedDate: new Date("2024-12-01"),
                eventTime: { hours: "12", minutes: "30" },
                editingEvent: null,
                eventText: "",
                events: [],
                showEventPopup: true,
            },
        });
        store.dispatch = jest.fn();
    });

    test("renders popup elements correctly", () => {
        render(
            <Provider store={store}>
                <EventPopup />
            </Provider>
        );

        expect(screen.getByPlaceholderText(/Enter Event Text/i)).toBeInTheDocument();
        expect(screen.getByText(/Time/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Event/i)).toBeInTheDocument();
    });

    test("updates event text input", () => {
        render(
            <Provider store={store}>
                <EventPopup />
            </Provider>
        );

        const input = screen.getByPlaceholderText(/Enter Event Text/i);
        fireEvent.change(input, { target: { value: "New Event" } });

        expect(store.dispatch).toHaveBeenCalledWith({ type: "events/setEventText", payload: "New Event" });
    });

    test("closes popup on close button click", () => {
        render(
            <Provider store={store}>
                <EventPopup />
            </Provider>
        );

        const closeButton = screen.getByRole("button", { name: "" });
        fireEvent.click(closeButton);

        expect(store.dispatch).toHaveBeenCalledWith({ type: "events/setShowEventPopup", payload: false });
    });
});

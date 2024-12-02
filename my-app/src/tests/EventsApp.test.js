import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EventsApp from "../components/CalendarApp/EventSideBar/EventsApp";

const mockStore = configureStore([]);

describe("EventsApp Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            events: {
                showEventPopup: false,
                events: [],
                eventTime: { hours: "00", minutes: "00" }, // Add this to mock state
                eventText: "",
                selectedDate: new Date(),
            },
        });
    });

    test("renders without EventPopup initially", () => {
        render(
            <Provider store={store}>
                <EventsApp />
            </Provider>
        );

        expect(screen.queryByText(/Add Event/i)).not.toBeInTheDocument();
    });

    test("renders EventPopup when showEventPopup is true", () => {
        store = mockStore({
            events: {
                showEventPopup: true,
                events: [],
                eventTime: { hours: "00", minutes: "00" },
                eventText: "",
                selectedDate: new Date(),
            },
        });

        render(
            <Provider store={store}>
                <EventsApp />
            </Provider>
        );

        expect(screen.getByText(/Add Event/i)).toBeInTheDocument();
    });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Controls from "../components/CalendarApp/Calendar/Controls/Controls";


const mockStore = configureStore([]);

describe("Controls Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();
    });

    test("dispatches prevMonthHandler on left button click", () => {
        render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        const leftButton = screen.getByRole("button", { name: /previous month/i });
        fireEvent.click(leftButton);

        expect(store.dispatch).toHaveBeenCalledWith({ type: "calendar/prevMonthHandler" });
    });

    test("dispatches nextMonthHandler on right button click", () => {
        render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        const rightButton = screen.getByRole("button", { name: /next month/i });
        fireEvent.click(rightButton);

        expect(store.dispatch).toHaveBeenCalledWith({ type: "calendar/nextMonthHandler" });
    });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Welcome message", () => {
  render(<App />);
  const welcomeMessage = screen.getByText(/Welcome to the Calendar app/i); // Update to match the current DOM
  expect(welcomeMessage).toBeInTheDocument();
});

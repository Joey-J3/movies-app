import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { defaultFormData, initialState } from "@/store/movies";
import { MovieDTO } from "@/types";
import userEvent from "@testing-library/user-event";
import MovieForm from "../MovieForm";
import { renderWithProviders } from "@/store/utils/test-utils";

describe.skip("components/MovieModal/MovieForm", () => {
  // TODO Mock props formData, submitCallback, resetCallback
  // // TODO Test every single controls: Input and Dropdown onchange callback
  let formData: MovieDTO;
  let submitCallback: jest.Mock;
  let resetCallback: jest.Mock;
  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(defaultFormData));
    submitCallback = jest.fn();
    resetCallback = jest.fn();
  });
  it("[form]", async () => {
    renderWithProviders(
      <MovieForm
        formData={formData}
        submitCallback={submitCallback}
        resetCallback={resetCallback}
      />,
      {
        preloadedState: {
          movies: Object.assign({}, initialState, { genres: ["Drama"] }),
        },
      }
    );
    const resetBtn = screen.getByText(/reset/i);
    userEvent.click(resetBtn);
    await waitFor(() => {
      expect(resetCallback).toBeCalledTimes(1);
    });
    userEvent.type(screen.getByLabelText(/TITLE/i), "title");
    userEvent.type(screen.getByLabelText(/RELEASE DATE/i), "2022-07-21");
    userEvent.type(
      screen.getByLabelText(/MOVIE URL/i),
      "https://img.testing.com"
    );
    userEvent.type(screen.getByLabelText(/RATING/i), "7.2");
    userEvent.click(screen.getByTestId("drop-down"));
    // userEvent.click(screen.getByTestId("drop-down-list").children[0]);
    userEvent.click(screen.getByTestId("drop-down"));

    userEvent.type(screen.getByLabelText(/RUNTIME/i), "121");
    userEvent.type(screen.getByLabelText(/OVERVIEW/i), "overview testing");
    const submitBtn = screen.getByText(/submit/i);
    userEvent.click(submitBtn);
    await waitFor(() => {
      expect(submitCallback).toBeCalledTimes(1);
    });
  });
});

import React from "react";
import { screen } from "@testing-library/react";
import { defaultFormData, MovieModalMode } from "@/store/movies";
import { MovieDTO } from "@/types";
import MovieModal from "..";
import { renderWithProviders } from "@/store/utils/test-utils";

describe("components/MovieModal", () => {
  let formData: MovieDTO,
    mode: MovieModalMode = "ADD",
    visible = true;
  const submitCallback = jest.fn();
  const resetCallback = jest.fn();
  const closeCallback = jest.fn();
  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(defaultFormData));
    jest.resetAllMocks();
  });
  it("mode testing", () => {
    mode = "EDIT";
    renderWithProviders(
      <MovieModal
        formData={formData}
        mode={mode}
        visible={visible}
        submitCallback={submitCallback}
        resetCallback={resetCallback}
        closeCallback={closeCallback}
      />
    );
    expect(screen.getByText(/EDIT MOVIE/i).textContent).toEqual("EDIT movie");
  });
  it("visible testing", () => {
    visible = true;
    renderWithProviders(
      <MovieModal
        data-testid={"invisible modal"}
        formData={formData}
        mode={mode}
        visible={visible}
        submitCallback={submitCallback}
        resetCallback={resetCallback}
        closeCallback={closeCallback}
      />
    );
    const ele = screen.queryByTestId("invisible modal");
    expect(ele).toBeFalsy();
  });
  it("callback testing", () => {
    renderWithProviders(
      <MovieModal
        formData={formData}
        mode={mode}
        visible={visible}
        submitCallback={submitCallback}
        resetCallback={resetCallback}
        closeCallback={closeCallback}
      />
    );
    submitCallback();
    expect(submitCallback).toBeCalledTimes(1);
    resetCallback();
    expect(resetCallback);
    closeCallback();
    expect(closeCallback).toBeCalledTimes(1);
  });
});

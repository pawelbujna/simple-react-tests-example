// Testling library is needed for writing unit tests
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Test from "./App";

// Test is a function that takes 2 parameters. 1. is a Name, 2. is a callback with test.
// Name usually should start with 'Should' word and describe what the test should check
test("Should render correctly", () => {
  // Render method is for rendering a component you wrote.
  render(<Test />);

  // Screen method is used for selecting elements on the page
  const heading = screen.getByText(
    "Find your favorite Breaking Bad character!"
  );

  // expect method always checks if everything is allright.
  // its OBLIGATORY at the end of the file
  expect(heading).toBeInTheDocument();
});

// This test proveds a snapshot of the component.
// .toMatchSnapshot creates a new folder with json snapshot files.
// test("Should match a snapshot", () => {
//   // Render method returns meny objects that can be used for finding elements on the page
//   // BUT with the new wersion the 'screen' method is recommended
//   const { container } = render(<Test />);

//   expect(container).toMatchSnapshot();
// });

test('Should return "YEAH" when "dupa" is set as a name', () => {
  render(<Test />);

  const input = screen.getByTestId("input");

  fireEvent.change(input, {
    target: { value: "dupa" },
  });

  const text = screen.getByText("YEAH!");

  expect(text).toBeInTheDocument();
});

test("Should return Value when name is provided and data is retrived", async () => {
  // Here we have a mock for a particular fetch. Usualy such mocks are stored in some JSON files.

  const mock = [
    {
      name: "Walter White",
      birthday: "09-07-1958",
      occupation: ["High School Chemistry Teacher", "Meth King Pin"],
      img:
        "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
      status: "Presumed dead",
      nickname: "Heisenberg",
      appearance: [1, 2, 3, 4, 5],
      portrayed: "Bryan Cranston",
    },
  ];

  // Here we are rmocking fetch method.
  // There are different implementations o fetch mocks.
  // Some mocks require JEST only, other requires external NPM package.
  // Testing library docs says that we should use setServer method from MSW/node npm package
  // but as I said there is a wide range of mocks implementaiton
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve({ json: () => mock }));

  render(<Test />);

  // Filling the input wit some value
  fireEvent.change(screen.getByTestId("input"), {
    target: {
      value: "Walter White",
    },
  });

  // Submitting the form
  fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  await waitFor(() => {
    // Checking if new data is on place
    expect(screen.getByText("Walter White")).toBeInTheDocument();

    expect(screen.getByText("Success")).toBeInTheDocument();
  });
});

// In this test we'are fetching values for Walter white and than changing the name and subbmiting the form again to get different values
test("Should return different responses after chaning the input value", async () => {
  // Mock for first fetch
  const mock1 = [
    {
      name: "Walter White",
      birthday: "09-07-1958",
      occupation: ["High School Chemistry Teacher", "Meth King Pin"],
      img:
        "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
      status: "Presumed dead",
      nickname: "Heisenberg",
      appearance: [1, 2, 3, 4, 5],
      portrayed: "Bryan Cranston",
    },
  ];

  // Mock for secont fetch
  const mock2 = [
    {
      name: "Jesse Pinkman",
      birthday: "09-24-1984",
      occupation: ["Meth Dealer"],
      img:
        "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441",
      status: "Alive",
      nickname: "Cap n' Cook",
      appearance: [1, 2, 3, 4, 5],
      portrayed: "Aaron Paul",
      category: "Breaking Bad",
    },
  ];

  // Mocking fetch for 1 response
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve({ json: () => mock1 }));

  render(<Test />);

  // Filling the input with first value
  fireEvent.change(screen.getByTestId("input"), {
    target: {
      value: "Walter White",
    },
  });

  // Submitting the form
  fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  await waitFor(() => {
    // Checking if data is on place
    expect(screen.getByText("Walter White")).toBeInTheDocument();

    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  // Mocking fetch for 2 response
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve({ json: () => mock2 }));

  // Filling the input wit some other value
  fireEvent.change(screen.getByTestId("input"), {
    target: {
      value: "Pinkman",
    },
  });

  // Submitting the form
  fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  await waitFor(() => {
    // Checking if new data is on place
    expect(screen.getByText("Jesse Pinkman")).toBeInTheDocument();

    expect(screen.getByText("Success")).toBeInTheDocument();
  });
});

// In this test we will check if reseting character button works
test("Should reset values after click", async () => {
  // mocking data
  const mock = [
    {
      name: "Walter White",
      birthday: "09-07-1958",
      occupation: ["High School Chemistry Teacher", "Meth King Pin"],
      img:
        "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
      status: "Presumed dead",
      nickname: "Heisenberg",
      appearance: [1, 2, 3, 4, 5],
      portrayed: "Bryan Cranston",
    },
  ];
  //  mocking fetch
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve({ json: () => mock }));

  render(<Test />);

  // Filling the input wit some value
  fireEvent.change(screen.getByTestId("input"), {
    target: {
      value: "Walter White",
    },
  });

  // Submitting the form
  fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  await waitFor(() => {
    // Checking if data is on place
    expect(screen.getByText("Walter White")).toBeInTheDocument();

    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  // Reseting values
  fireEvent.click(screen.getByRole("button", { name: "Reset character" }));

  // queryAllByText method returns an array of elements. If nothing is found an array is empty, do the values arent on page anymore
  expect(screen.queryAllByText("Walter White")).toEqual([]);
});

// In this test we will be testing error handling.
// We need to check if error will display if promis is rejected
test("Should return Value when name is provided and data is retrived", async () => {
  // We dont need to mock data cos promise will fail and wont return any data

  // Rejecting the promis
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject());

  render(<Test />);

  // Filling the input wit some value
  fireEvent.change(screen.getByTestId("input"), {
    target: {
      value: "Walter White",
    },
  });

  // Submitting the form
  fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  await waitFor(() => {
    // Checking if error text appeared on the page
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});

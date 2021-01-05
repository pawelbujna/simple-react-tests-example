import { sum } from "./sum";

describe("sum", () => {
  it("Should check if sum is correct", () => {
    const expectation = 5;
    const result = sum(2, 3);

    expect(result).toEqual(expectation);
  });

  it("Should check if sum is incorrect", () => {
    const expectation = 7;
    const result = sum(2, 3); // 5

    expect(result).not.toEqual(expectation);
  });
});

// test("check if sum is correct", () => {
//   const expectation = 6;
//   const result = sum(2, 3);

//   expect(result).toEqual(expectation);
// });

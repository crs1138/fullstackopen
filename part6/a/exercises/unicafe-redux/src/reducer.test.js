import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";
import { describe, test, expect } from "vitest";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    deepFreeze(state);
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;
    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;
    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("zeroing all counters", () => {
    const action = {
      type: "ZERO",
    };
    const state = {
      good: 10,
      ok: 5,
      bad: 2,
    };
    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });

  test("should return the initial state when an unknown action type is received", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(state);
  });

  test("should not mutate the original state", () => {
    const state = {
      good: 10,
      ok: 5,
      bad: 2,
    };
    const action = {
      type: "GOOD",
    };
    const originalState = { ...state };

    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 11,
      ok: 5,
      bad: 2,
    });
    expect(state).toEqual(originalState);
  });
});

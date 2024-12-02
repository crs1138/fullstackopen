// @ts-nocheck

import { useAppSelector, useAppDispatch } from "./redux/store";
import { type AppDispatch } from "./redux/store";

export interface Note {
  id: number;
  content: string;
  important: boolean;
}

export const noteReducer = (state?: State = [], action: Object) => {
  if (action.type === "NEW_NOTE") {
    console.log({ payload: action.payload });
    return [...state, action.payload];
  }

  if (action.type === "TOGGLE_IMPORTANCE") {
    const noteToToggle = state.find((note) => note.id === action.payload.id);
    if (noteToToggle) {
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, important: !note.important }
          : note,
      );
    }
  }
  return state;
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => ({
  type: "NEW_NOTE",
  payload: { content, important: false, id: generateId() },
});

export const toggleImportanceOf = (id) => ({
  type: "TOGGLE_IMPORTANCE",
  payload: { id },
});

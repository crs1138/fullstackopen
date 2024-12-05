// @ts-nocheck
import { createSlice, current } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "./redux/store";
import { type AppDispatch } from "./redux/store";

export interface Note {
  id: string;
  content: string;
  important: boolean;
}

const initialState = [];

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((note) => note.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      return [...state, action.payload];
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;

export default noteSlice.reducer;

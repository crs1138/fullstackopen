// @ts-nocheck
import { createSlice, current } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "./redux/store";
import { type AppDispatch } from "./redux/store";

export interface Note {
  id: number;
  content: string;
  important: boolean;
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      state.push({ content, important: false, id: generateId() });
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((note) => note.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      console.log(current(state));
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
  },
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;

export default noteSlice.reducer;

// @ts-nocheck
import { createSlice, current } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "./redux/store";
import { type AppDispatch } from "./redux/store";
import NoteService from "../services/notes";

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

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    try {
      const notes = await NoteService.getAll();
      dispatch(setNotes(notes));
    } catch (err) {
      console.error("Failed to fetch notes", err);
      dispatch(setNotes([]));
    }
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    try {
      const newNote = await NoteService.createNew(content);
      dispatch(appendNote(newNote));
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };
};

export default noteSlice.reducer;

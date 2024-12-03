// @ts-nocheck
import { useAppSelector, useAppDispatch } from "./redux/store";
import { type AppDispatch } from "./redux/store";

export interface Note {
  id: number;
  content: string;
  important: boolean;
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const initialStateNotes = [
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

export const noteReducer = (
  state?: State = initialStateNotes,
  action: Object,
) => {
  if (action.type === "NEW_NOTE") {
    console.log({ action });
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

export const createNote = (content) => ({
  type: "NEW_NOTE",
  payload: { content, important: false, id: generateId() },
});

export const toggleImportanceOf = (id) => ({
  type: "TOGGLE_IMPORTANCE",
  payload: { id },
});

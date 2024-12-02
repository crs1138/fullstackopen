import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { noteReducer, createNote } from "../noteReducer";
import { type Note } from "../noteReducer";
export type State = Note[];

export const store = createStore(noteReducer);
export type AppDispatch = typeof store.dispatch;
store.dispatch(createNote("This is a new note"));
store.dispatch(createNote("State changes are made with actions"));

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<State>();

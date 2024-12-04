import { useDispatch, useSelector } from "react-redux";
import notesReducer, { type Note } from "./noteReducer";
import filterReducer, { type Filter } from "./filterReducer";
import { configureStore } from "@reduxjs/toolkit";
export type State = { notes: Note[]; filter: Filter };

export const store = configureStore({
  reducer: { notes: notesReducer, filter: filterReducer },
});
store.dispatch({ type: "notes/createNote", payload: "Redux is awesome" });
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<State>();

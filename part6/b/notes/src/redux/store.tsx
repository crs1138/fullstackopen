import { createStore, combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { noteReducer, type Note } from "./noteReducer";
import { filterReducer, type Filter } from "./filterReducer";
export type State = { notes: Note[]; filter: Filter };

const reducer = combineReducers({ notes: noteReducer, filter: filterReducer });
export const store = createStore(reducer);
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<State>();

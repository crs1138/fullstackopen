import { createStore } from 'redux'
import { combineReducers } from 'redux'
import {anecdoteReducer} from './anecdoteReducer'
import { filterReducer } from './filterReducer'
const reducers = combineReducers({anecdotes: anecdoteReducer, filter: filterReducer})
export const store = createStore(reducers)
import { combineReducers } from "redux";
import Lists from './Lists/Lists.reducer';

export const rootReducer = combineReducers({
    lists: Lists
})
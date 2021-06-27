import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "../reducers";

const initialState = {
  collections: null,
  currentCollectionName: null,
  currentCollection: null,
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));

export type DispatchType = typeof store.dispatch;

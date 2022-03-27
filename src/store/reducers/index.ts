import { AnyAction } from "redux";

export const reducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case "SET_COLLECTIONS":
      return {
        ...state,
        collections: action.payload.collections,
      };
    case "SET_CURRENTCOLLECTIONNAME":
      return {
        ...state,
        currentCollectionName: action.payload.currentCollectionName,
      };
    case "SET_CURRENTCOLLECTION":
      return {
        ...state,
        currentCollection: action.payload.currentCollection,
      };
    case "SETUP":
      return {
        ...state,
        collections: action.payload.collections,
        currentCollectionName: action.payload.currentCollectionName,
        currentCollection: action.payload.currentCollection,
      };
    case "CHANGECOLLECTION":
      return {
        ...state,
        currentCollectionName: action.payload.currentCollectionName,
        currentCollection: action.payload.currentCollection,
      };
    case "DELETELIST":
      return {
        ...state,
        collections: action.payload.collections,
      };
    case "PERSIST_CHANGE":
      return {
        ...state,
        currentCollection: action.payload.currentCollection,
      };
    default:
      return state;
  }
};

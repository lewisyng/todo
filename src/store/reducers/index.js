export const reducer = (state, action) => {
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
    default:
      return state;
  }
};

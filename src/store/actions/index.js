export const setCollections = (collections) => {
  return {
    type: "SET_COLLECTIONS",
    payload: {
      collections: collections,
    },
  };
};

export const setCurrentCollectionName = (name) => {
  return {
    type: "SET_CURRENTCOLLECTIONNAME",
    payload: {
      currentCollectionName: name,
    },
  };
};

export const setCurrentCollection = (collection) => {
  return {
    type: "SET_CURRENTCOLLECTION",
    payload: {
        currentCollection: collection,
    },
  };
};

export const addNewList = () => {
  
  return {
    type: "ADD_NEWLIST",
    payload: {
      
    }
  }
}
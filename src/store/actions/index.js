import updateDone, {
  addNewList,
  createNewItem,
  createNewSubtask,
  deleteCollection,
  deleteItem,
  deleteList,
  deleteSubtaskItem,
  getCollection,
  getCollections,
  updateSubtaskData,
  updateSubtaskDone,
  updateTaskData,
} from "src/localbaseFunctions";

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

export const setCurrentCollection = (newData) => {
  return {
    type: "SET_CURRENTCOLLECTION",
    payload: {
      currentCollection: newData,
    },
  };
};

export const setUp = () => {
  return async (dispatch) => {
    const collections = await getCollections();
    const currentCollectionName = await getCollections().then((data) => {
      return data[0]?.name;
    });
    const currentCollection = await getCollection(currentCollectionName);
    dispatch({
      type: "SETUP",
      payload: {
        collections: collections,
        currentCollectionName: currentCollectionName,
        currentCollection: currentCollection,
      },
    });
  };
};

export const changeCollection = (collectionName) => {
  return async (dispatch) => {
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "CHANGECOLLECTION",
      payload: {
        currentCollectionName: collectionName,
        currentCollection: currentCollection,
      },
    });
  };
};

export const deleteEntireCollection = (collectionName) => {
  return async (dispatch) => {
    await deleteCollection(collectionName);
    const collections = await getCollections();
    dispatch({
      type: "DELETELIST",
      payload: {
        collections: collections,
      },
    });
  };
};

export const deleteListItem = (collectionName, list, listItem) => {
  return async (dispatch) => {
    await deleteItem(collectionName, list, listItem);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const deleteEntireList = (collectionName, list) => {
  return async dispatch => {
    await deleteList(collectionName, list.id);
    const currentCollection = await getCollection(collectionName)
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection
      }
    })
  }
}

export const deleteSubtask = (collectionName, list, listItem) => {
  return async (dispatch) => {
    await deleteSubtaskItem(collectionName, list, listItem);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const toggleTaskDone = (collectionName, list, listItem) => {
  return async (dispatch) => {
    await updateDone(collectionName, list, listItem, !listItem.done);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const toggleSubtaskDone = (collectionName, list, listItem) => {
  return async (dispatch) => {
    await updateSubtaskDone(collectionName, list, listItem, !listItem.done);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const createList = (collectionName, name) => {
  return async (dispatch) => {
    await addNewList(collectionName, name);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const updateItem = (
  collectionName,
  list,
  item,
  itemSettingsData,
  type
) => {
  return async (dispatch) => {
    if (type === "task") {
      await updateTaskData(collectionName, list, item, itemSettingsData);
    } else {
      await updateSubtaskData(collectionName, list, item, itemSettingsData);
    }
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const createNewTodo = (collectionName, list, item, data, type) => {
  return async dispatch => {
    if (type === "subtask") {
      await createNewSubtask(collectionName, list, item, data);
    } else {
      await createNewItem(collectionName, list, data);
    }
    const currentCollection = await getCollection(collectionName)

    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection
      }
    })
  }
}

export const createNewDetailedTodo = (collectionName, list, data) => {
  return async (dispatch) => {
    await createNewItem(collectionName, list, data);
    const currentCollection = await getCollection(collectionName);

    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};
